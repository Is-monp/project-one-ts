export interface ChampionData {
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  tags: string[];
  partype: string;
  stats: Record<string, number>;
}

export interface ChampionListResponse {
  type: string;
  format: string;
  version: string;
  data: Record<string, ChampionData>;
}

export interface ChampionDetailResponse {
  type: string;
  format: string;
  version: string;
  data: Record<string, ChampionData>;
}

const VERSION = '14.3.1';
const CDN = 'https://ddragon.leagueoflegends.com/cdn';
const BASE_URL = `${CDN}/${VERSION}/data/en_US`;

//Arte vertical de carga (no depende de la versión)
export const urlArteCarga = (id: string) =>
  `${CDN}/img/champion/loading/${id}_0.jpg`;

//Icono cuadrado (sí depende de la versión)
export const urlIcono = (archivo: string) =>
  `${CDN}/${VERSION}/img/champion/${archivo}`;

// Obtener todos los campeones
export async function obtenerCampeones(signal?: AbortSignal): Promise<ChampionListResponse> {
  const res = await fetch(`${BASE_URL}/champion.json`, { signal });
  if (!res.ok) throw new Error('No se pudieron cargar los campeones');
  return res.json();
}

// Obtener un campeón específico por nombre 
export async function obtenerCampeon(
  nombre: string,
  signal?: AbortSignal
): Promise<ChampionData | undefined> {
  const res = await fetch(`${BASE_URL}/champion/${nombre}.json`, { signal });
  if (!res.ok) throw new Error(`No se pudo cargar el campeón ${nombre}`);
  const json: ChampionDetailResponse = await res.json();
  return Object.values(json.data)[0];
}