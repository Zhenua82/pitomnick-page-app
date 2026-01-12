"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const YM_ID = 97603974;

export default function YandexMetrika() {
  const pathname = usePathname();

  useEffect(() => {
    if ((window as any).ym) {
      (window as any).ym(YM_ID, "hit", pathname);
    }
  }, [pathname]);

  return (
    <Script
      id="yandex-metrika"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        (function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}
          m[i].l=1*new Date();
          k=e.createElement(t); a=e.getElementsByTagName(t)[0];
          k.async=1; k.src=r; a.parentNode.insertBefore(k,a)
        })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(${YM_ID}, "init", {
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor:true
        });
      `
      }}
    />
  );
}
