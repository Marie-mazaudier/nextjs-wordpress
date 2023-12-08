/**
 * get filtered attribute from attribute name
 * @param attributes [], attribute name
 * @returns | filteredAttribute as {}
 */
export const filterAttribute = (attributes: any, attName: string) => {
  const filteredAttribute = attributes?.find((item: any) => item?.name === attName);
  return filteredAttribute || {};
};
