import React from 'react';
import ModalLink from './ModalLink';
import style from './GodCard.css';
import Ability from './Ability';
import { Champion, Effigypower } from '../types/judgement.generated';

function GodCard({
  avatar,
  champions,
  effigyPower,
  logo,
  name,
  sacredArtefact,
  traits,
  warbandBonus,
}: {
  avatar?: Champion;
  champions: Champion[];
  effigyPower: Effigypower;
  logo: string;
  name: string;
  sacredArtefact: string;
  traits: string;
  warbandBonus: string;
}) {
  return (
    <div>
      <div className={style.header}>
        <img className={style.logo} src={`https://hallofeternalchampions.com/images/${logo}`} alt="" />
        <div>
          <p className={style.name}>{name}</p>
          <p className={style.traits}>{traits}</p>
        </div>
      </div>

      <section style={{ marginTop: '.5rem' }}>
        <p>Divine Gifts</p>

        <Ability
          description={effigyPower.description}
          name={effigyPower.name}
          note={effigyPower.avatar_bonus}
        />

        <div style={{ marginTop: '.5rem' }}>
          <Ability
            name="Sacred Artefact"
            description={sacredArtefact}
          />
        </div>

        <div style={{ marginTop: '.5rem' }}>
          <Ability
            name="Warband Bonus"
            description={warbandBonus}
          />
        </div>
      </section>

      <section style={{ marginTop: '.5rem' }}>
        <p>Champions</p>
        <ul>
          {avatar ? (
            <li>
              <ModalLink to={`champion,${avatar.id}`}>
                {avatar.name}
              </ModalLink>
              {' '}
              (Avatar)
            </li>
          ) : null}
          {champions.map((champion) => (
            <li key={champion.name}>
              <ModalLink to={`champion,${champion.id}`}>
                {champion.name}
              </ModalLink>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default GodCard;
