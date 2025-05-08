import { create } from 'zustand';

type TabState = {
  activeTab: "home" | "movie-detail" | "community" | "post-detail" | "create-post" | "edit-post" | "login" | "signup";
  isLoggedIn: boolean;
  setActiveTab: (tab: TabState["activeTab"]) => void;
  login: () => void;
  logout: () => void;
};

export const useTabStore = create<TabState>((set) => ({
  activeTab: "home",
  isLoggedIn: false,
  setActiveTab: (tab) => set({ activeTab: tab }),
  login: () => set({ isLoggedIn: true, activeTab: "home" }),
  logout: () => set({ isLoggedIn: false, activeTab: "home" }),
}));