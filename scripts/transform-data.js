const fs = require('fs');
const path = require('path');
const { v4 } = require('uuid');
// eslint-disable-next-line import/no-extraneous-dependencies
const JsonToTS = require('json-to-ts');
const previousData = require('../src/data/output.json');
const championData = require('./judgement-fixture-champions.json');
const commonInnateAbilityData = require('./judgement-fixture-common-innate-abilities.json');
const godData = require('./judgement-fixture-gods.json');

function transformChampion(
  champion,
  commonInnateAbilities,
  gods,
) {
  return {
    ...champion,
    id: champion.id,
    activeAbilities: champion.activeAbilities.map((ability) => ({
      cost: ability.cost,
      description: ability.description,
      name: ability.name,
    })),
    agi: champion.agi,
    avatarUrl: champion.avatarUrl,
    classes: champion.classes,
    combatManoeuvres: champion.combatManoeuvres.map((cm) => ({
      cost: cm.cost,
      description: cm.description,
      name: cm.name,
    })),
    commonInnateAbilities: champion.commonInnateAbilities.map((nameString) => {
      let abilityName = nameString;
      if (/\([0-9]\)/.test(abilityName)) {
        abilityName = abilityName.replace(/\([0-9]\)/, ' (X)');
      }
      let ability = commonInnateAbilities.find((cia) => cia.name === abilityName);
      if (!ability) {
        const previousChampion = previousData.champions.find((c) => c.id === champion.id);
        const previousCia = previousChampion
          .commonInnateAbilities.find((cia) => cia.name === nameString);
        ability = {
          name: abilityName,
          id: previousCia ? previousCia.id : v4(),
          description: 'No description available',
        };
      }
      return {
        ...ability,
        name: nameString,
      };
    }),
    gods: champion.gods.map((godName) => {
      const godObject = gods.find((god) => god.name === godName);
      if (!godObject) {
        throw new Error(`Could not find god: ${godName}`);
      }
      return godObject.id;
    }),
  };
}

function transformGod(god, champions) {
  const championForAvatar = champions.find((champion) => champion.name === god.avatar.name);
  if (!championForAvatar) {
    throw new Error(`Could not find avatar: ${god.avatar.name}`);
  }
  return {
    ...god,
    avatar: championForAvatar.id,
    champions: god.champions.map((champion) => {
      const championObject = champions.find((c) => c.name === champion.name);
      if (!championObject) {
        throw new Error(`Could not find champion: ${champion.name}`);
      }
      return championObject.id;
    }),
  };
}

function transform(
  champions,
  commonInnateAbilities,
  gods,
) {
  return {
    champions: champions.map((champion) => transformChampion(
      champion,
      commonInnateAbilities,
      gods,
    )),
    gods: gods.map((god) => transformGod(
      god,
      champions,
    )),
  };
}

function writeJsonOutput(data) {
  fs.writeFileSync(
    path.resolve(__dirname, '..', 'src', 'data', 'output.json'),
    Buffer.from(JSON.stringify(data, undefined, 2)),
  );
}

function writeTypescriptOutput(json) {
  fs.writeFileSync(
    path.resolve(__dirname, '..', 'src', 'types', 'judgement.generated.ts'),
    Buffer.from(''),
  );
  JsonToTS(json).slice(1).forEach((typeInterface, i) => {
    fs.appendFileSync(
      path.resolve(__dirname, '..', 'src', 'types', 'judgement.generated.ts'),
      Buffer.from(`${i === 0 ? '' : '\n'}export ${typeInterface}\n`),
    );
  });
}

function runTransformations() {
  console.log('Transforming data...');
  const transformedData = transform(championData, commonInnateAbilityData, godData);
  console.log(`Transformed ${transformedData.champions.length} Champions and ${transformedData.gods.length} Gods`);
  console.log('====');
  console.log('Writing files...');
  writeJsonOutput(transformedData);
  console.log('====');
  console.log('Generating Types...');
  writeTypescriptOutput(transformedData);
  console.log('====');
  console.log('Transformations complete!');
}

module.exports = {
  transform,
  transformWithData: () => transform(championData, commonInnateAbilityData, godData),
  run: runTransformations,
};
