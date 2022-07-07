export type PaginatedResource<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};
