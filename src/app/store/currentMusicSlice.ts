import { create } from "zustand";
import { IMusic } from "../../shared/mocks/musicMock";

interface ISlice {
  music: IMusic | null;
  setMusic: (music: IMusic) => void;
}

export const currentMusicSlice = create<ISlice>((set) => ({
  music: null,
  setMusic: (music) => {
    set({ music: music });
  },
}));
