export type InstructionRange = {
  buildName: string;
  imageDir: string;
  startPage: number;
  endPage: number;
};

export type AdventDay = {
  day: number;
  pieceCount: number;
  ranges: InstructionRange[];
};

export type AdventMember = {
  id: string;
  name: string;
  setName: string;
  totalPieces: number;
  days: AdventDay[];
};

type Segment = [
  startPage: number,
  endPage: number,
  pieceCount: number,
  excludedPages?: number[]
];

const rangesWithoutExcludedPages = (
  buildName: string,
  imageDir: string,
  startPage: number,
  endPage: number,
  excludedPages: number[] = []
): InstructionRange[] => {
  const excluded = new Set(excludedPages);
  const ranges: InstructionRange[] = [];
  let rangeStart: number | null = null;

  for (let page = startPage; page <= endPage; page += 1) {
    if (excluded.has(page)) {
      if (rangeStart !== null) {
        ranges.push({ buildName, imageDir, startPage: rangeStart, endPage: page - 1 });
        rangeStart = null;
      }
      continue;
    }

    rangeStart ??= page;
  }

  if (rangeStart !== null) {
    ranges.push({ buildName, imageDir, startPage: rangeStart, endPage });
  }

  return ranges;
};

const plan = (buildName: string, imageDir: string, segments: Segment[]): AdventDay[] =>
  segments.map(([startPage, endPage, pieceCount, excludedPages], index) => ({
    day: index + 1,
    pieceCount,
    ranges: rangesWithoutExcludedPages(
      buildName,
      imageDir,
      startPage,
      endPage,
      excludedPages
    )
  }));

const combinePlans = (...plans: AdventDay[][]): AdventDay[] =>
  plans.flat().map((day, index) => ({ ...day, day: index + 1 }));

const quidditch = plan('Quality Quidditch Supplies', '/instructions/76452-quidditch', [
  [3, 9, 40], [10, 15, 34], [16, 26, 34], [27, 35, 36], [36, 42, 34],
  [43, 48, 32], [49, 53, 36], [54, 61, 31], [62, 68, 36], [69, 77, 35],
  [78, 84, 31], [85, 93, 34]
]);

const owlery = plan('La volière du château de Poudlard', '/instructions/76430-owlery', [
  [4, 19, 29], [20, 27, 29], [28, 37, 30], [38, 47, 30], [48, 55, 33],
  [56, 65, 31], [66, 72, 35], [73, 79, 30], [80, 89, 32], [90, 93, 31],
  [94, 96, 28], [97, 102, 26]
]);

const batmobile = plan('La Batmobile : poursuite avec le Pingouin', '/instructions/76181-batmobile', [
  [7, 14, 31], [15, 19, 35], [20, 24, 31], [25, 32, 34], [33, 38, 31], [39, 48, 32],
  [49, 55, 33], [56, 64, 34], [65, 72, 34], [73, 81, 31], [82, 89, 30], [90, 94, 36]
]);

const herbology = plan('Le cours de botanique du château de Poudlard', '/instructions/76445-herbology', [
  [5, 10, 33], [11, 19, 32, [16]], [20, 30, 33], [31, 35, 32], [36, 48, 32],
  [49, 60, 32, [52]], [61, 67, 31], [68, 76, 33], [77, 90, 32, [88]],
  [91, 96, 34], [97, 105, 32], [106, 116, 34]
]);

const iceCream = plan('Le glacier de Florean Fortescue', '/instructions/76452-ice-cream', [
  [7, 12, 30], [13, 17, 30], [18, 22, 30], [23, 27, 30], [28, 32, 30],
  [33, 38, 29], [39, 44, 29], [45, 49, 29], [50, 54, 29],
  [55, 60, 29], [61, 65, 29], [66, 70, 29], [71, 76, 29]
]);

const lightningMcQueen = plan('Flash McQueen', '/instructions/77255-lightning-mcqueen', [
  [8, 17, 30], [18, 28, 30], [29, 39, 30], [40, 50, 30], [51, 61, 30],
  [62, 71, 30], [72, 81, 30], [82, 90, 30], [91, 100, 30]
]);

const mater = plan('Martin', '/instructions/8201-mater', [
  [3, 11, 26], [12, 20, 26]
]);

const charmsClass = plan('Le cours de sortilèges de Poudlard', '/instructions/76385-charms-class', [
  [7, 15, 32], [16, 24, 32], [25, 34, 32], [36, 44, 32],
  [45, 52, 32], [53, 60, 32], [61, 68, 32], [69, 76, 32]
]);

const gingerbreadHouse = plan('La maison en pain d’épices festive', '/instructions/40809-gingerbread-house', [
  [3, 14, 42], [15, 25, 42], [26, 37, 42, [32]], [38, 49, 42, [48]],
  [50, 60, 42], [61, 71, 42], [72, 83, 41, [79]], [84, 94, 41],
  [95, 106, 41, [105]], [107, 117, 41], [118, 129, 41, [125]], [130, 140, 41]
]);

export const MEMBERS: AdventMember[] = [
  {
    id: 'diego',
    name: 'Diego',
    setName: 'Le glacier, Martin & Flash McQueen',
    totalPieces: 704,
    days: combinePlans(iceCream, mater, lightningMcQueen)
  },
  {
    id: 'vasco',
    name: 'Vasco',
    setName: 'Quidditch & le cours de botanique',
    totalPieces: 803,
    days: combinePlans(quidditch, herbology)
  },
  {
    id: 'celine',
    name: 'Céline',
    setName: 'La volière & la maison en pain d’épices',
    totalPieces: 862,
    days: combinePlans(owlery, gingerbreadHouse)
  },
  {
    id: 'pierrick',
    name: 'Pierrick',
    setName: 'Botanique & la Batmobile',
    totalPieces: 782,
    days: combinePlans(herbology, batmobile)
  }
];

export const TOTAL_DAYS = 24;
