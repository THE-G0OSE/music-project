import { create } from "zustand";

export type User = {
  username: string;
  image: string;
  likes: string[];
  playlists: string[];
  music: string[];
  comments: string[];
  genre: string;
};

interface IUserSlice {
  user: User | null;
  setUser: (user: User | null) => void;
  resetUser: () => void;
  addLiked: (id: string) => void;
  removeLiked: (id: string) => void;
  addPlaylist: (id: string) => void;
  removePlaylist: (id: string) => void;
  addMusic: (id: string) => void;
  removeMusic: (id: string) => void;
  updateImage: (image: string) => void;
  updateGenre: (genre: string) => void;
  addComment: (id: string) => void;
  removeComment: (id: string) => void;
}

export const userSlice = create<IUserSlice>((set) => ({
  user: null,
  setUser: (user) => {
    console.log(user);
    set(() => ({
      user: user,
    }));
  },
  resetUser: () => {
    set({ user: null });
  },
  addLiked: (id) => {
    set((state) => ({
      user: { ...state.user!, likes: [...state.user!.likes, id]},
    }));
  },
  removeLiked: (id) => {
    set((state) => ({
      user: {
        ...state.user!,
        likes: state.user!.likes.filter((like) => like != id)
      }
    }))
  },
  addPlaylist: (id) => {
    set((state) => ({
      user: {
        ...state.user!,
        playlists: [...state.user!.playlists, id],
      },
    }));
  },
  removePlaylist: (id) => {
    set((state) => ({
      user: {
        ...state.user!,
        playlists: state.user!.playlists.filter((list) => list != id),
      },
    }));
  },
  addMusic: (id) => {
    set((state) => ({
      user: {
        ...state.user!,
        music: [...state.user!.music, id],
      },
    }));
  },
  removeMusic: (id) => {
    set((state) => ({
      user: {
        ...state.user!,
        music: state.user!.music.filter((list) => list != id),
      },
    }));
  },
  updateImage: (image) => {
    set((state) => ({ user: { ...state.user!, image: image } }));
  },
  updateGenre: (genre) => {
    set((state) => ({user: {...state.user!, genre: genre}}))
  },
  addComment: (id) => {
    set((state) => ({user: {...state.user!, comments: [...state.user!.comments, id]}}))
  },
  removeComment: (id) => {
    set((state) => ({user: {...state.user!, comments: [...state.user!.comments.filter((comment) => comment !== id)]}}))
  }
}));
