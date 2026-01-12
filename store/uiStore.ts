import { create } from "zustand";

interface UIState {
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  setSelectedNodeId: (id: string | null) => void;
  setSelectedEdgeId: (id: string | null) => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedNodeId: null,
  selectedEdgeId: null,
  isModalOpen: false,
  modalContent: null,
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setSelectedEdgeId: (id) => set({ selectedEdgeId: id }),
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
}));
