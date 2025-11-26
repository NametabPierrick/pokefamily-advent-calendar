export type AdventMember = {
  id: string;
  name: string;
  setName: string;
  totalPages: number;
  pdfUrl?: string;
  imageDir?: string;
  imagePrefix?: string;
  imagePadLength?: number;
};

export const MEMBERS: AdventMember[] = [
  {
    id: 'diego',
    name: 'Diego',
    setName: 'Guipure',
    totalPages: 67,
    imageDir: '/guipure',
    imagePrefix: 'guipure-cropped_page-',
    imagePadLength: 4
  },
  {
    id: 'vasco',
    name: 'Vasco',
    setName: 'Ollivanders',

    totalPages: 96,
    imageDir: '/olivanders',
    imagePrefix: 'olivanders-cropped_page-',
    imagePadLength: 4
  },
  {
    id: 'celine',
    name: 'Céline',
    setName: 'Les Trois Balais',
    totalPages: 116,
    imageDir: '/trois-balais',
    imagePrefix: 'trois-balais_page-',
    imagePadLength: 4
  },
  {
    id: 'pierrick',
    name: 'Pierrick',
    setName: 'Honeydukes',
    totalPages: 85,
    imageDir: '/honeyduke',
    imagePrefix: 'honeydukes-cropped_page-',
    imagePadLength: 4
  }
];

export const TOTAL_DAYS = 24;
