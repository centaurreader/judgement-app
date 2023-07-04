import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useJudgementApi } from '../hooks/useJudgementApi';
import Button from '../components/Button';
import style from './NewGame.css';

function NewGameRoute() {
  const { loadHeroes, loadGods, data } = useJudgementApi();
  useEffect(() => {
    loadGods();
    loadHeroes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  if (data.gods === null) { return null; }

  return (
    <form onSubmit={handleSubmit}>
      <h1>New Game</h1>

      <section>
        <h2>Game Info</h2>
        <label htmlFor="name">
          Game Name (optional)
          <input name="name" type="text" />
        </label>

        <label htmlFor="size">
          Game Size
          <label htmlFor="three">
            <input type="radio" name="size" id="three" value="3" />
            3v3
          </label>
          <label htmlFor="five">
            <input type="radio" name="size" id="five" value="5" />
            5v5
          </label>
        </label>
      </section>

      <section>
        <h2>Player Info</h2>
        <label htmlFor="god">
          God
          {data.gods.map((god) => (
            <label htmlFor={god.name} className={style.god} key={god.id}>
              <input type="radio" id={god.name} name="god" />
              <p style={{ flex: 1 }}>{god.name}</p>
              <Link to={`?modals=god,${god.id}`}>
                <Button appearance="outline" type="button" onClick={() => {}}>View</Button>
              </Link>
            </label>
          ))}
        </label>

        <label htmlFor="god">
          Heroes
          <select id="god" name="god" multiple>
            <option value="">Choose one...</option>
            {data.heroes.map((hero) => (
              <option id={hero.id} key={hero.id}>
                {hero.name}
              </option>
            ))}
          </select>
        </label>
      </section>

      <button type="submit">
        Create Game
      </button>
    </form>
  );
}

export default NewGameRoute;
