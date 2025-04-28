import { create } from "zustand";
import { userMock } from "../../shared/mocks/userMock";

type User = {
  username: string;
  image: string;
  liked: string[];
  playlists: string[];
  music: string[];
};

interface IUserSlice {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
  addLiked: (id: string) => void;
  removeLiked: (id: string) => void;
  addPlaylist: (id: string) => void;
  removePlaylist: (id: string) => void;
}

export const userSlice = create<IUserSlice>((set) => ({
  user: null,
  setUser: (user) => {
    set(() => ({
      user: user
    }));
  },
  resetUser: () => {
    set({user: null
    })
  },
  addLiked: (id) => {
    set((state) => ({
      user: { ...state.user!, liked: [...state.user!.liked, id] },
    }));
  },
  removeLiked: (id) => {
    set((state) => ({
      user: {
        ...state.user!,
        liked: state.user!.liked.filter((like) => like != id),
      },
    }));
  },
  addPlaylist: (id) => {
    set((state) => ({
        user: {
            ...state.user!,
            playlists: [...state.user!.playlists, id]
        }
    }))
  },
  removePlaylist: (id) => {
    set((state) => ({
        user: {
            ...state.user!,
            playlists: state.user!.playlists.filter((list) => list != id)
        }
    }) )
  }
}));
