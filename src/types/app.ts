export interface PlayerConfig extends Record<string, any> {
  godId: string | null;
  championIds: string[];
}

export interface Game extends Record<string, any> {
  name?: string;
  championCount: number | null;
  player1: PlayerConfig;
  player2: PlayerConfig;
}
