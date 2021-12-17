const delimiter = 1;

export const explodeChunks = (array: Array<any>): Array<any> => {
  const chunks = [];
  
  for (let index = 0; index < array.length; index += delimiter) {
    chunks.push(array.slice(index, index+delimiter));
  }

  return chunks;
}