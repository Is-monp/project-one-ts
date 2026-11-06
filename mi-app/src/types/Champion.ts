export type Campeon = {
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  tags: string[];
};

export const DDRAGON_VERSION = "14.3.1";

export const imgCuadrada = (id: string) =>
  `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${id}.png`;

export const imgSplash = (id: string) =>
  `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`;