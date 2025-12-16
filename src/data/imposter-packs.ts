export const IMPOSTER_PACK_IDS = ["everyday", "food_party", "classroom", "holiday"] as const;

export type ImposterPackId = (typeof IMPOSTER_PACK_IDS)[number];

export interface ImposterWordPair {
  main: string;
  imposter: string;
}

export interface ImposterPack {
  id: ImposterPackId;
  label: {
    en: string;
    es: string;
  };
  pairs: ImposterWordPair[];
}

export const IMPOSTER_PACKS: Record<ImposterPackId, ImposterPack> = {
  everyday: {
    id: "everyday",
    label: {
      en: "Everyday things",
      es: "Cosas cotidianas",
    },
    pairs: [
      { main: "Apple", imposter: "Tomato" },
      { main: "Cat", imposter: "Tiger" },
      { main: "Bus", imposter: "Train" },
      { main: "Teacher", imposter: "Principal" },
      { main: "Soccer", imposter: "Basketball" },
      { main: "Pillow", imposter: "Couch" },
      { main: "Shower", imposter: "Bath" },
      { main: "Laptop", imposter: "Tablet" },
      { main: "Coffee", imposter: "Tea" },
      { main: "Park", imposter: "Forest" },
    ],
  },
  food_party: {
    id: "food_party",
    label: {
      en: "Party food",
      es: "Comida de fiesta",
    },
    pairs: [
      { main: "Pizza", imposter: "Lasagna" },
      { main: "Burger", imposter: "Sandwich" },
      { main: "Fries", imposter: "Onion rings" },
      { main: "Ice cream", imposter: "Yogurt" },
      { main: "Soda", imposter: "Juice" },
      { main: "Chocolate cake", imposter: "Cheesecake" },
      { main: "Popcorn", imposter: "Chips" },
      { main: "Orange", imposter: "Grapefruit" },
      { main: "Hot dog", imposter: "Sausage" },
      { main: "Milkshake", imposter: "Smoothie" },
    ],
  },
  classroom: {
    id: "classroom",
    label: {
      en: "Classroom & school",
      es: "Aula y escuela",
    },
    pairs: [
      { main: "Science", imposter: "History" },
      { main: "Homework", imposter: "Exam" },
      { main: "Chalk", imposter: "Marker" },
      { main: "Library", imposter: "Laboratory" },
      { main: "Notebook", imposter: "Tablet" },
      { main: "Recess", imposter: "Lunch break" },
      { main: "Backpack", imposter: "Suitcase" },
      { main: "Math", imposter: "Physics" },
      { main: "Teacher", imposter: "Tutor" },
      { main: "Desk", imposter: "Cafeteria table" },
    ],
  },
  holiday: {
    id: "holiday",
    label: {
      en: "Holidays & events",
      es: "Fiestas y eventos",
    },
    pairs: [
      { main: "Snowman", imposter: "Santa" },
      { main: "Concert", imposter: "Theatre" },
      { main: "Birthday", imposter: "Wedding" },
      { main: "Beach", imposter: "Pool" },
      { main: "Fireworks", imposter: "Lanterns" },
      { main: "Pumpkin", imposter: "Watermelon" },
      { main: "Costume", imposter: "Uniform" },
      { main: "Parade", imposter: "Protest" },
      { main: "Picnic", imposter: "Barbecue" },
      { main: "Gift", imposter: "Card" },
    ],
  },
};

export const DEFAULT_IMPOSTER_PACK_ID: ImposterPackId = "everyday";

export function normalizeImposterPackId(raw: unknown): ImposterPackId {
  const value = typeof raw === "string" ? (raw as ImposterPackId) : DEFAULT_IMPOSTER_PACK_ID;
  return IMPOSTER_PACK_IDS.includes(value) ? value : DEFAULT_IMPOSTER_PACK_ID;
}

export function pickPairFromPack(packId: ImposterPackId) {
  const pack = IMPOSTER_PACKS[packId] ?? IMPOSTER_PACKS[DEFAULT_IMPOSTER_PACK_ID];
  const index = Math.floor(Math.random() * pack.pairs.length);
  return pack.pairs[index];
}

