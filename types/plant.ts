// types/plants.ts

export type Plant = {
  slug: string;
  title: string;
  photo: Record<AgeKey, string>;
  opisanie: string;
  podrobnoeOpisanie1: string;
  podrobnoeOpisanie2: string;
  cena: Record<AgeKey, string>;
};

export type AgeKey = string;

export type PlantObsh = {
  slug: string;
  title: string;
  photo: Record<AgeKey, string>;
  opisanie: string;
  podrobnoeOpisanie1: string;
  podrobnoeOpisanie2: string;
  cena: Record<AgeKey, string>;
};

export type PlantsMap = Record<string, PlantObsh>;
