import baseRapid from '../baseRapid';

export const getDictionariesApi = <T>(url: string): Promise<T> =>
  baseRapid.get(url).then((res) => res.data);
