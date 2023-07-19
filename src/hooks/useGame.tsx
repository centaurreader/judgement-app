import React, { createContext, useContext, useState } from 'react';
import { useParams } from 'react-router';
import { useGames } from './useGames';
import { Game } from '../types/app';

export type GameStore = {
  gameState: GameState;
  setHealth: (championId: string, health: number) => void;
};

export type GameState = {
  config: Game | null;
  champions: {
    championId: string;
    health: number;
    level: number;
  }[] | null;
};

const GameContext = createContext({} as GameStore);

const useProvideGameState = (game: Game | null) => {
  const [gameState, setGameState] = useState<GameState>({
    config: game,
    champions: null,
  });

  const setHealth = (championId: string, health: number) => {
    setGameState((state) => ({
      ...state,
      champions: state.champions?.map((c) => {
        if (c.championId !== championId) { return c; }
        return {
          ...c,
          health,
        };
      }) ?? null,
    }));
  };

  return {
    gameState,
    setHealth,
  };
};

export function GameProvider({ children }: React.PropsWithChildren) {
  const { id } = useParams();
  const { getGame } = useGames();
  const game = getGame(id);
  const value = useProvideGameState(game);
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
