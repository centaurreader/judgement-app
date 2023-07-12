import React from 'react';
import { useGame } from '../hooks/useGame';

function GameRoute() {
  const { gameState } = useGame();
  return (
    <div>
      {JSON.stringify(gameState)}
    </div>
  );
}

export default GameRoute;
