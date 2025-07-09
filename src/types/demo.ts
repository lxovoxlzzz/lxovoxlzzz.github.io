export type NameMappingType = { [japanese: string]: string };

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
