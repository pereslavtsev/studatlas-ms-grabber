import { Source } from '../interfaces/source.interface';

export const FILE_EXT = '.aspx';
export const INDEX_PAGE = `Default${FILE_EXT}`;

export const SOURCES: Source[] = [
  {
    id: 'dictionary',
    path: `/Dek/${INDEX_PAGE}`,
  },
  {
    id: 'books',
    path: `/Ved/ZachBooks${FILE_EXT}`,
  },
  {
    id: 'statistics',
    path: `/Stat/${INDEX_PAGE}`,
  },
];
