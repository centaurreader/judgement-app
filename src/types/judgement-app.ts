import { Ability, Level, Weapon } from './judgement';

export type ChampionApp = {
  id: string;
  activeAbilities: Ability[];
  agi: string;
  avatarUrl: string;
  classes: string[];
  combatManoeuvres: Ability[];
  commonInnateAbilities: { label: string; id: string; }[];
  gods: { id: string; }[];
  health: string[];
  imageUrl: string;
  level2: Level;
  level3: Level;
  mag: string;
  mel: string;
  mov: string;
  name: string;
  quotes: string[];
  race: string;
  res: string;
  rng: string;
  soulHarvest: string;
  title: string;
  uniqueInnateAbilities: Ability[];
  urlName: string;
  weapons: Weapon[];
};

export type GodApp = {
  id: string;
  avatar: {
    name: string;
    url_name: string;
    id?: string;
  };
  champions: {
    name: string;
    url_name: string;
    id: string;
  }[];
  description: string;
  divineGifts: {
    effigy_power: {
      avatar_bonus: string;
      description: string;
      name: string;
    };
    sacred_artefact: string;
    warband_bonus: string;
  };
  logo: string;
  name: string;
  traits: string;
  urlName: string;
};
