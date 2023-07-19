import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Game } from '../types/app';

const SAVE_KEY = 'dgi-judgement_data';

export type GamesStore = {
  games: Record<string, Game>;
  getGame: (id?: string) => Game | null;
  setGame: (id: string, game: Game) => void;
};

const initState = () => {
  const savedGames = localStorage.getItem(SAVE_KEY);
  if (!savedGames) { return {} as GamesStore; }
  return JSON.parse(savedGames) as GamesStore;
};

const GamesContext = createContext({} as GamesStore);

const useProvideGamesState = () => {
  const [games, setGames] = useState<Record<string, Game>>(initState().games ?? {});

  const getGame = (id?: string) => games[id ?? ''] ?? null;

  const setGame = (id: string, game: Game) => {
    setGames((state) => ({
      ...state,
      [id]: game,
    }));
  };

  useEffect(() => {
    const savedGames = localStorage.getItem(SAVE_KEY);
    if (JSON.stringify(games) === '{}') { return; }
    if (JSON.stringify(games) === savedGames) { return; }
    localStorage.setItem(SAVE_KEY, JSON.stringify({ games }));
  }, [games]);

  return {
    games,
    getGame,
    setGame,
  };
};

export function GamesProvider({ children }: React.PropsWithChildren) {
  const value = useProvideGamesState();
  return (
    <GamesContext.Provider value={value}>
      {children}
    </GamesContext.Provider>
  );
}

export function useGames() {
  return useContext(GamesContext);
}
