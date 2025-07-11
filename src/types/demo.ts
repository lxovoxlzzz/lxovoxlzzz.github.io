export type NameEntry = {
  language: { name: string };
  name: string;
};

export type FlavorTextEntryType = {
  flavor_text: string;
  language: { name: string };
};

export type GenusEntryType = {
  genus: string;
  language: { name: string };
};

export type NameEntryType = {
  name: string;
  language: { name: string };
};

export type SpeciesDataType = {
  flavorText: string;
  pokemonGenre: string;
  pokemonName: string;
};

export type PokemonDataType = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
  cries: {
    latest: string;
    legacy: string;
  };
  sprites: {
    front_default: string;
    back_default: string;
    other: {
      showdown: {
        front_default: string;
      };
    };
  };
  species: {
    url: string;
  };
};

export type NameMappingType = { [japanese: string]: string };
