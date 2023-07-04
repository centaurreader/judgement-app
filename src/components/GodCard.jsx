import React from 'react';
import PropTypes from 'prop-types';
import ModalLink from './ModalLink';
import style from './GodCard.css';
import Ability from './Ability';

function GodCard({
  avatarName,
  champions,
  effigyPower,
  logo,
  name,
  sacredArtefact,
  traits,
  warbandBonus,
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
          note={effigyPower.avatarBonus}
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
          <li>
            <ModalLink to={`champion,${avatarName.toLowerCase()}`}>
              {avatarName}
            </ModalLink>
            {' '}
            (Avatar)
          </li>
          {champions.map((champion) => (
            <li key={champion.name}>
              <ModalLink to={`champion,${champion.url_name}`}>
                {champion.name}
              </ModalLink>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

GodCard.propTypes = {
  avatarName: PropTypes.string.isRequired,
  champions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url_name: PropTypes.string.isRequired,
  })).isRequired,
  effigyPower: PropTypes.shape({
    avatarBonus: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sacredArtefact: PropTypes.string.isRequired,
  traits: PropTypes.string.isRequired,
  warbandBonus: PropTypes.string.isRequired,
};

export default GodCard;
