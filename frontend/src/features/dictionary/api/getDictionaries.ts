import baseRapid from '../../../api/baseRapid';

export const getDictionaries = <T>(url: string): Promise<T> =>
  baseRapid.get(url).then((res) => res.data);
