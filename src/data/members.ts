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
  [4, 9, 40], [10, 15, 34], [16, 26, 34], [27, 35, 36], [36, 42, 34],
  [43, 48, 32], [49, 53, 36], [54, 61, 31], [62, 68, 36, [67]], [69, 77, 35],
  [78, 84, 31], [85, 93, 34]
]);

const weasleysSecondary = plan('La boutique secondaire des Weasley', '/instructions/76422-weasleys/small building', [
  [7, 14, 29], [15, 22, 35, [18]], [23, 29, 32], [30, 37, 31]
]);

const weasleysMain = plan('Weasley, Farces pour sorciers facétieux', '/instructions/76422-weasleys/big building', [
  [39, 44, 30], [45, 50, 28], [51, 55, 29], [56, 61, 29], [62, 68, 37, [64]],
  [69, 75, 28, [73]], [76, 81, 24], [82, 86, 27], [87, 92, 30], [93, 98, 31],
  [99, 104, 31], [105, 110, 31], [111, 115, 26], [116, 121, 24], [122, 127, 30],
  [128, 133, 30], [134, 138, 31], [139, 144, 31], [145, 151, 33, [148]],
  [152, 157, 32], [158, 163, 30], [164, 169, 30, [166]], [170, 175, 28],
  [176, 181, 27]
]);

const owlery = plan('La volière du château de Poudlard', '/instructions/76430-owlery', [
  [5, 19, 29], [20, 27, 29], [28, 37, 30], [38, 47, 30, [44]], [48, 55, 33],
  [56, 65, 31], [66, 72, 35, [68]], [73, 79, 30], [80, 89, 32], [90, 93, 31],
  [94, 96, 28], [97, 102, 26]
]);

const batmobile = plan('La Batmobile : poursuite avec le Pingouin', '/instructions/76181-batmobile', [
  [7, 14, 31], [15, 19, 35], [20, 24, 31], [25, 32, 34], [33, 38, 31], [39, 48, 32],
  [49, 55, 33], [56, 64, 34], [65, 72, 34], [73, 81, 31], [82, 89, 30], [90, 94, 36]
]);

const herbology = plan('Le cours de botanique du château de Poudlard', '/instructions/76445-herbology', [
  [6, 10, 33], [11, 19, 32, [16]], [20, 30, 33], [31, 35, 32], [36, 48, 32],
  [49, 60, 32, [52]], [61, 67, 31], [68, 76, 33], [77, 90, 32, [88, 89]],
  [91, 96, 34], [97, 105, 32], [106, 116, 34]
]);

const iceCream = plan('Le glacier de Florean Fortescue', '/instructions/76452-ice-cream', [
  [8, 12, 32], [13, 16, 36], [17, 21, 32], [22, 26, 29], [27, 30, 30],
  [31, 36, 33], [37, 42, 33, [40]], [43, 46, 33], [47, 54, 29],
  [55, 62, 31, [56]], [63, 69, 32], [70, 76, 32]
]);

const lightningMcQueen = plan('Flash McQueen', '/instructions/77255-lightning-mcqueen', [
  [8, 17, 33], [18, 28, 33], [29, 36, 33], [37, 50, 34],
  [51, 66, 35], [67, 77, 34], [78, 89, 34], [90, 100, 34]
]);

export const MEMBERS: AdventMember[] = [
  {
    id: 'diego',
    name: 'Diego',
    setName: 'Le glacier, boutique des Weasley & Flash McQueen',
    totalPieces: 779,
    days: combinePlans(iceCream, weasleysSecondary, lightningMcQueen)
  },
  {
    id: 'vasco',
    name: 'Vasco',
    setName: 'Quidditch & la volière',
    totalPieces: 777,
    days: combinePlans(quidditch, owlery)
  },
  {
    id: 'celine',
    name: 'Céline',
    setName: 'Weasley, Farces pour sorciers facétieux',
    totalPieces: 707,
    days: weasleysMain
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
