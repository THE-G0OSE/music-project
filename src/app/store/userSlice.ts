import { create } from "zustand";

type User = {
  username: string | null;
  liked: string[];
  playlists: string[];
};

interface IUserSlice {
  user: User;
  setUser: (user: User) => void;
  resetUser: () => void;
  addLiked: (id: string) => void;
  removeLiked: (id: string) => void;
  addPlaylist: (id: string) => void;
  removePlaylist: (id: string) => void;
}

export const userSlice = create<IUserSlice>((set) => ({
  user: {
    username: null,
    liked: [],
    playlists: [],
  },
  setUser: (user) => {
    set(() => ({
      user: {
        username: user.username,
        liked: user.liked,
        playlists: user.playlists,
      },
    }));
  },
  resetUser: () => {
    set({user: {
        username: null,
        liked: [],
        playlists: [],
    }})
  },
  addLiked: (id) => {
    set((state) => ({
      user: { ...state.user, liked: [...state.user.liked, id] },
    }));
  },
  removeLiked: (id) => {
    set((state) => ({
      user: {
        ...state.user,
        liked: state.user.liked.filter((like) => like != id),
      },
    }));
  },
  addPlaylist: (id) => {
    set((state) => ({
        user: {
            ...state.user,
            playlists: [...state.user.playlists, id]
        }
    }))
  },
  removePlaylist: (id) => {
    set((state) => ({
        user: {
            ...state.user,
            playlists: state.user.playlists.filter((list) => list != id)
        }
    }) )
  }
}));
