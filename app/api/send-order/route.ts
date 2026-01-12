import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import type { CartItem } from "@/store/cartSlice";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, items, totalPrice } = body as {
      phone: string;
      items: CartItem[];
      totalPrice: number;
    };

    if (!phone) {
      return NextResponse.json(
        { error: "Введите телефон" },
        { status: 400 }
      );
    }

    // Формируем текст письма
    const itemsText = items
      .map(
        (item) =>
          `${item.title} — ${item.age} - ${item.quantity} шт. × ${item.price} руб. = ${
            item.quantity * item.price
          } руб.`
      )
      .join("\n");

    const messageText = `
Новый заказ с сайта:

Товары:
${itemsText}

ИТОГО: ${totalPrice} руб.

Телефон клиента: ${phone}
`;

    const transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true,
      auth: {
        user: "zzhmenka@yandex.ru",
        pass: process.env.YANDEX_SMTP_PASSWORD as string,
      },
    });

    await transporter.sendMail({
      from: "zzhmenka@yandex.ru",
      to: "zzhmenka@yandex.ru",
      subject: "Новый заказ с сайта",
      text: messageText,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mail error:", error);
    return NextResponse.json(
      { error: "Ошибка на сервере" },
      { status: 500 }
    );
  }
}
