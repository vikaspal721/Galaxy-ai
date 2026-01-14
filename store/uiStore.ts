import { create } from "zustand";

export type SidebarItemId = "search" | "recent" | "folder" | "image" | "video" | "box" | "zap" | null;

interface UIState {
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  isSidebarCollapsed: boolean;
  activeSidebarItem: SidebarItemId;
  setSelectedNodeId: (id: string | null) => void;
  setSelectedEdgeId: (id: string | null) => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  toggleSidebar: () => void;
  setActiveSidebarItem: (id: SidebarItemId) => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedNodeId: null,
  selectedEdgeId: null,
  isModalOpen: false,
  modalContent: null,
  isSidebarCollapsed: false,
  activeSidebarItem: "box",
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setSelectedEdgeId: (id) => set({ selectedEdgeId: id }),
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setActiveSidebarItem: (id) => set({ activeSidebarItem: id }),
}));
