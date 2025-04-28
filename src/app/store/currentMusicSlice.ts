import { create } from 'zustand'
import { musicMock } from '../../shared/mocks/musicMock';

type music = {
        image: string;
        title: string;
        author: string;
        length: string;
} | null

interface ISlice {
    music: music;
    setMusic: (music: music) => void
}

export const currentMusicSlice = create<ISlice>((set) => ({
    music: musicMock[0],
    setMusic: (music) => {
        set({music: music})
    }
}))