import { atom } from 'recoil';

export const wordsIDState = atom<string[]>({
  key: 'wordsIDState',
  default: [],
});
