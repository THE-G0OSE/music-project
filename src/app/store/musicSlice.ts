import { create } from "zustand";
import { IMusic } from "../../shared/mocks/musicMock";
import { api } from "../../shared/configs/apiPath";

interface IMusicSlice {
  localMusic: IMusic[];
  setLocalMusic: (music: IMusic[]) => void;
  addLocalMusic: (music: IMusic) => void;
  removeLocalMusic: (id: string) => void;
  fetchMusic: (username: string) => void;
  fetchOneMusic: (id: string) => Promise<IMusic | undefined>;
}

export const musicSlice = create<IMusicSlice>((set) => ({
  localMusic: [],
  setLocalMusic: (music) => {
    set({ localMusic: music });
  },
  addLocalMusic: (music) => {
    set((state) => ({
      localMusic: [...state.localMusic, music],
    }));
  },
  removeLocalMusic: (id) => {
    set((state) => ({
      localMusic: state.localMusic.filter((music) => music.ID != id),
    }));
  },
  fetchMusic: async (username) => {
    const res = await fetch(api + "users/getMusic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    });
    if (!res.ok) {
      alert("failed to fetch music");
    } else {
      const { music } = await res.json();
      set({ localMusic: music });
    }
  },
  fetchOneMusic: async (id) => {
    const res = await fetch(api + "media/get/" + id);
    const body = await res.json();
    if (!res.ok || !body) {
      alert("something went wrong");
    } else {
      console.log(body.music);
      const music = {
        ID: body.music.ID,
        path: body.music.path,
        title: body.music.title,
        author: body.music.author,
        cover_image: body.music.cover_image,
        username: body.music.username,
      };
      return music as IMusic;
    }
  },
}));
