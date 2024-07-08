const getBytesData = (
  delimiter: string,
  bytesData: Buffer,
  returnType: 'string' | 'buffer' = 'buffer'
): string | Buffer | null => {
  const bufferData = Buffer.from(bytesData);
  const stringData = bufferData.toString('utf-8');

  const startIndex = stringData.indexOf(delimiter);

  if (startIndex === -1) {
    return null;
  }

  const endIndex = stringData.indexOf('||', startIndex);

  if (endIndex === -1) {
    return null;
  }

  const value = stringData.substring(startIndex + delimiter.length, endIndex);

  return returnType === 'buffer' ? Buffer.from(value, 'base64') : value;
};

export default getBytesData;
