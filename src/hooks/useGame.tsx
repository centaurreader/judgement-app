import React, { createContext, useContext, useState } from 'react';
import { Champion } from '../types/judgement';

export type GameStore = {
  gameState: GameState;
  setHealth: (champion: Champion, health: number) => void;
};

export type GameState = {
  champions: {
    champion: Champion;
    health: number;
    level: number;
  }[] | null;
};

const GameContext = createContext({} as GameStore);

const useProvideGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    champions: null,
  });

  const setHealth = (champion: Champion, health: number) => {
    setGameState((state) => ({
      ...state,
      champions: state.champions?.map((c) => {
        if (c.champion.id !== champion.id) { return c; }
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
  const value = useProvideGameState();
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
