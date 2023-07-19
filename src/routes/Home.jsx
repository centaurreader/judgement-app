import React from 'react';
import { Link } from 'react-router-dom';
import { useGames } from '../hooks/useGames';

function HomeRoute() {
  const { games } = useGames();

  return (
    <div>
      <h1>Judgement App</h1>
      <Link to="/new-game">New Game</Link>

      <h2>Saved Games</h2>
      <ul>
        {Object.entries(games).map(([id, game], i) => (
          <li key={id}>
            <Link to={`/games/${id}`}>
              {game.name || `Game ${i + 1}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeRoute;
