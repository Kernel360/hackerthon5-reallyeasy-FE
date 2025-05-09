import { create } from 'zustand';

type TabType =
  | "home"
  | "movie-detail"
  | "community"
  | "post-detail"
  | "create-post"
  | "edit-post"
  | "login"
  | "logout"
  | "signup";

type TabState = {
  activeTab: TabType;
  previousTab: TabType | null;
  isLoggedIn: boolean;
  setActiveTab: (tab: TabType) => void;
  goBack: () => void;
  login: () => void;
  logout: () => void;
};

export const useTabStore = create<TabState>((set, get) => ({
  activeTab: "home",
  previousTab: null,
  isLoggedIn: false,
  setActiveTab: (tab) =>
    set((state) => ({
      previousTab: state.activeTab,
      activeTab: tab,
    })),
  goBack: () => {
    const prev = get().previousTab || "home";
    set({ activeTab: prev, previousTab: null });
  },
  login: () => set({ isLoggedIn: true, activeTab: "home" }),
  logout: () => set({ isLoggedIn: false, activeTab: "home" }),
}));
