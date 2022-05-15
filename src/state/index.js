import { atom } from 'recoil';

const imagesData = atom({
  key: 'images',
  default: [],
});

const savePath = atom({
  key: 'path',
  default: '',
});

export { imagesData, savePath };
