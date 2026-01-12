"use client";

import { useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { useWorkflowStore } from "@/store/workflowStore";
import { useUIStore } from "@/store/uiStore";
import { CustomNode } from "./NodeRenderer";
import { validateEdge, canConnect } from "./EdgeValidator";
import { BaseNode } from "@/types/node";
import { WorkflowEdge } from "@/types/workflow";

const nodeTypes = {
  custom: CustomNode,
};

export function FlowCanvas() {
  const { nodes: storeNodes, edges: storeEdges, setNodes, setEdges } = useWorkflowStore();
  const { setSelectedNodeId, setSelectedEdgeId } = useUIStore();

  const [nodes, setNodesState, onNodesChange] = useNodesState(storeNodes);
  const [edges, setEdgesState, onEdgesChange] = useEdgesState(storeEdges);

  // Sync store with local state
  useEffect(() => {
    setNodesState(storeNodes);
  }, [storeNodes, setNodesState]);

  useEffect(() => {
    setEdgesState(storeEdges);
  }, [storeEdges, setEdgesState]);

  // Sync local state back to store
  useEffect(() => {
    setNodes(nodes as BaseNode[]);
  }, [nodes, setNodes]);

  useEffect(() => {
    setEdges(edges as WorkflowEdge[]);
  }, [edges, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => {
      const sourceNode = nodes.find((n) => n.id === params.source);
      const targetNode = nodes.find((n) => n.id === params.target);

      if (sourceNode && targetNode) {
        const validation = canConnect(sourceNode as BaseNode, targetNode as BaseNode);
        if (!validation.valid) {
          alert(validation.reason);
          return;
        }
      }

      const newEdge = {
        ...params,
        id: `edge-${params.source}-${params.target}`,
      };
      setEdgesState((eds) => addEdge(newEdge, eds));
    },
    [nodes, setEdgesState]
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const onEdgeClick = useCallback(
    (_event: React.MouseEvent, edge: Edge) => {
      setSelectedEdgeId(edge.id);
    },
    [setSelectedEdgeId]
  );

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
