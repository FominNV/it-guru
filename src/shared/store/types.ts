export type PaginateListType<K extends string, T> = {
  total: number;
  skip: number;
  limit: number;
} & {
  [key in K]: T[];
};
