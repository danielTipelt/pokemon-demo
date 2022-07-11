export function toggleItemInArray(array: any[], item: any) {
  const index = array.indexOf(item);
  const newArray = [...array];

  if (index === -1) {
    newArray.push(item);
  } else {
    newArray.splice(index, 1);
  }

  return newArray;
}
