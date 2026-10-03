import { base } from "../__core/app";

const HOST = "evbb.online";

export type ServerStatus = {
  online: boolean;
  version: string | null;
  motd: string | null;
  players: { online: number; max: number; list: { name: string; uuid: string }[] };
  fetchedAt: number;
};

let cache: ServerStatus | null = null;

async function fetchStatus(): Promise<ServerStatus> {
  if (cache && Date.now() - cache.fetchedAt < 60_000) return cache;
  try {
    const res = await fetch(`https://api.mcsrvstat.us/3/${HOST}`, {
      headers: { "User-Agent": "evbb-site/1.0" },
      signal: AbortSignal.timeout(8000),
    });
    const d = (await res.json()) as {
      online?: boolean;
      version?: string;
      motd?: { clean?: string[] };
      players?: { online?: number; max?: number; list?: { name: string; uuid: string }[] };
    };
    cache = {
      online: !!d.online,
      version: d.version ?? null,
      motd: d.motd?.clean?.join(" ") ?? null,
      players: {
        online: d.players?.online ?? 0,
        max: d.players?.max ?? 0,
        list: d.players?.list ?? [],
      },
      fetchedAt: Date.now(),
    };
    return cache;
  } catch {
    return (
      cache ?? {
        online: false,
        version: null,
        motd: null,
        players: { online: 0, max: 0, list: [] },
        fetchedAt: Date.now(),
      }
    );
  }
}

export const server = {
  status: base.handler(() => fetchStatus()),
};
