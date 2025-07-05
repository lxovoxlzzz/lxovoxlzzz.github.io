export type LangType = "ja" | "en";

export type PokemonType = {
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
