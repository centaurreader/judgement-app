export type Ability = {
  cost?: string;
  id?: string;
  description: string;
  name: string;
};

export type Champion = {
  id: string;
  activeAbilities: Ability[];
  agi: string;
  avatarUrl: string;
  classes: string[];
  combatManoeuvres: Ability[];
  commonInnateAbilities: string[];
  gods: string[];
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

export type God = {
  id: string;
  avatar: {
    name: string;
    url_name: string;
    id?: string;
  };
  champions: {
    name: string;
    url_name: string;
    id?: string;
  }[];
  description: string;
  divineGifts: {
    effigy_power: {
      avatar_bonus: string;
      description: string;
    };
    sacred_artefact: string;
    warband_bonus: string;
  };
  logo: string;
  name: string;
  traits: string;
  urlName: string;
};

export type Level = {
  active_abilities: Ability[];
  combat_manoeuvres: Ability[];
  unique_innate_abilities: Ability[];
};

export type Weapon = {
  cost: string;
  crit: string;
  glance: string;
  name: string;
  reach: string;
  solid: string;
  type: string;
};
