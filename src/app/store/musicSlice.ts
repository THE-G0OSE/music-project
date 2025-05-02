import { create } from "zustand";
import { IMusic } from "../../shared/mocks/musicMock";

interface IMusicSlice {
  localMusic: IMusic[];
  setLocalMusic: (music: IMusic[]) => void;
  addLocalMusic: (music: IMusic) => void;
  removeLocalMusic: (id: string) => void;
  fetchMusic: (username: string) => void;
  fetchOneMusic: (id: string) => Promise<IMusic>
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
    const res = await fetch("http://localhost:3200/users/getMusic", {
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
    const res = await fetch('http://localhost:3200/media/get/' + id)
    if (!res.ok) {
        alert('something went wrong')
    } else {
      const body = await res.json()
      console.log(body.music)
      return {
        ID: body.music.ID,
        path: body.music.path,
        title: body.music.title,
        author: body.music.author,
        cover_image: body.music.cover_image,
        username: body.music.username,
      }
    }
  }
}));
