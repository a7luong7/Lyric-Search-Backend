/* eslint-disable arrow-body-style */
export const sortBy = (array: Array<any>, field: string, direction: string = 'asc'): Array<any> => {
  return array.sort((a, b) => {
    if (a[field] > b[field]) return (direction === 'asc' ? 1 : -1);
    if (a[field] < b[field]) return (direction === 'asc' ? -1 : 1);
    return 0;
  });
};

export const wait = (milliseconds:number) : Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default {};
