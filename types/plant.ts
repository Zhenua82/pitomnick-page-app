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
// export type AgeKey = '1 летннее растение' | '2 летннее растение' | '3 летннее растение' | '4 летннее растение' | '5 летннее растение' | 'взрослое растение';

export type PlantsMap = Record<string, Plant>;
