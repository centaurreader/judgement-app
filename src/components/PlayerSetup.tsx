import React from 'react';
import Button from './Button';
import style from './PlayerSetup.css';
import ModalLink from './ModalLink';
import { Champion, God } from '../types/judgement';

function PlayerSetup({
  championCount,
  championIds,
  champions,
  godId,
  gods,
  playerName,
  setGod,
  toggleChampion,
}: {
  championCount: number;
  championIds: string[];
  champions: Champion[];
  godId: string;
  gods: God[];
  playerName: string;
  setGod: (godId: string) => void;
  toggleChampion: (championId: string) => void;
}) {
  const selectedGod = gods?.find(
    (god) => god.id === godId,
  );
  return (
    <>
      <label htmlFor="god">
        God
        {gods.map((god) => (
          <label htmlFor={`${playerName}-${god.id}`} key={`${playerName}-${god.id}`} className={style.god}>
            <input
              type="radio"
              id={`${playerName}-${god.id}`}
              name={`${playerName}-${god.id}`}
              onChange={() => setGod(god.id)}
              value={god.id}
              checked={god.id === godId}
            />
            <p style={{ flex: 1 }}>{god.name}</p>
            <ModalLink to={`god,${god.id}`} replace>
              <Button appearance="outline" type="button" onClick={() => {}}>View</Button>
            </ModalLink>
          </label>
        ))}
      </label>

      <label htmlFor="god">
        Champions
        {godId && championCount && selectedGod ? (
          <>
            <p>God Champions</p>
            {selectedGod ? (
              <label htmlFor={`${playerName}-${selectedGod.avatar.id}`} key={`${playerName}-${selectedGod.avatar.id}`}>
                <input
                  type="checkbox"
                  name={`${playerName}-${selectedGod.avatar.id}`}
                  id={`${playerName}-${selectedGod.avatar.id}`}
                  checked={championIds.includes(selectedGod.avatar.id ?? '') ?? ''}
                  onChange={() => toggleChampion(selectedGod.avatar.id ?? '')}
                  disabled={championIds.length === championCount
                    && !championIds.includes(selectedGod.avatar.id ?? '')}
                />
                {selectedGod.avatar.name}
                {' '}
                (Avatar)
              </label>
            ) : null}
            {selectedGod?.champions.map((champion) => (
              <label htmlFor={`${playerName}-${champion.id}`} key={`${playerName}-${champion.id}`}>
                <input
                  type="checkbox"
                  name={`${playerName}-${champion.id}`}
                  id={`${playerName}-${champion.id}`}
                  checked={championIds.includes(champion.id ?? '') ?? ''}
                  onChange={() => toggleChampion(champion.id ?? '')}
                  disabled={championIds.length === championCount
                    && !championIds.includes(champion.id ?? '')}
                />
                {champion.name}
              </label>
            ))}
            <p>Other Champions</p>
            {champions.filter((champion) => !selectedGod?.champions
              .some((c) => champion.id === c.id)
              && selectedGod.avatar.id !== champion.id).map((champion) => (
                <label htmlFor={`${playerName}-${champion.id}`} key={`${playerName}-${champion.id}`}>
                  <input
                    type="checkbox"
                    name={`${playerName}-${champion.id}`}
                    id={`${playerName}-${champion.id}`}
                    checked={championIds.includes(champion.id ?? '') ?? ''}
                    onChange={() => toggleChampion(champion.id ?? '')}
                    disabled={championIds.length === championCount
                      && !championIds.includes(champion.id ?? '')}
                  />
                  {champion.name}
                </label>
            ))}
          </>
        ) : (
          <p>Select a god and champion count</p>
        )}
      </label>
    </>
  );
}

export default PlayerSetup;
