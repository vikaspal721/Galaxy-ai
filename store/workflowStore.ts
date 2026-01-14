import { create } from "zustand";
import { BaseNode } from "@/types/node";
import { WorkflowEdge } from "@/types/workflow";

interface WorkflowState {
  nodes: BaseNode[];
  edges: WorkflowEdge[];
  name: string;
  viewport: { x: number; y: number; zoom: number };
  setNodes: (nodes: BaseNode[]) => void;
  setEdges: (edges: WorkflowEdge[]) => void;
  setName: (name: string) => void;
  addNode: (node: BaseNode) => void;
  updateNode: (id: string, updates: Partial<BaseNode>) => void;
  deleteNode: (id: string) => void;
  addEdge: (edge: WorkflowEdge) => void;
  deleteEdge: (id: string) => void;
  setViewport: (viewport: { x: number; y: number; zoom: number }) => void;
  reset: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  nodes: [],
  edges: [],
  name: "Untitled Workflow",
  viewport: { x: 0, y: 0, zoom: 1 },
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setName: (name) => set({ name }),
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  updateNode: (id, updates) =>
    set((state) => ({
      nodes: state.nodes.map((node) => (node.id === id ? { ...node, ...updates } : node)),
    })),
  deleteNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id),
      edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id),
    })),
  addEdge: (edge) => set((state) => ({ edges: [...state.edges, edge] })),
  deleteEdge: (id) => set((state) => ({ edges: state.edges.filter((edge) => edge.id !== id) })),
  setViewport: (viewport) => set({ viewport }),
  reset: () => set({ nodes: [], edges: [], name: "Untitled Workflow", viewport: { x: 0, y: 0, zoom: 1 } }),
}));
