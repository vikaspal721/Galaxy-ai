"use client";

import { useCallback, useEffect, useRef } from "react";
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
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";

import { useWorkflowStore } from "@/store/workflowStore";
import { useUIStore } from "@/store/uiStore";
import { CustomNode } from "./NodeRenderer";
import { canConnect } from "./EdgeValidator";
import { BaseNode, NodeType, NodeStatus } from "@/types/node";
import { WorkflowEdge } from "@/types/workflow";

interface FlowNodeData {
  nodeType: NodeType;
  label: string;
  status?: NodeStatus;
  [key: string]: unknown;
}

type FlowNode = Node<FlowNodeData>;

const nodeTypes = {
  custom: CustomNode,
};

function convertToFlowNode(baseNode: BaseNode): FlowNode {
  return {
    id: baseNode.id,
    type: "custom",
    position: baseNode.position,
    data: {
      nodeType: baseNode.type,
      label: (baseNode.data.label as string) || baseNode.type,
      status: baseNode.status,
      ...baseNode.data,
    },
  };
}

function convertFromFlowNode(flowNode: FlowNode): BaseNode {
  const { nodeType, label, status, ...restData } = flowNode.data;
  return {
    id: flowNode.id,
    type: nodeType,
    position: flowNode.position,
    data: {
      label,
      ...restData,
    },
    status,
  };
}

export function FlowCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
  const prevStoreNodesRef = useRef<BaseNode[]>([]);
  const prevStoreEdgesRef = useRef<WorkflowEdge[]>([]);
  const isInternalUpdateRef = useRef(false);

  const {
    nodes: storeNodes,
    edges: storeEdges,
    setNodes,
    setEdges,
  } = useWorkflowStore();

  const { setSelectedNodeId, setSelectedEdgeId } = useUIStore();

  const [nodes, setNodesState, onNodesChange] =
    useNodesState<FlowNodeData>(storeNodes.map(convertToFlowNode));

  const [edges, setEdgesState, onEdgesChange] =
    useEdgesState<WorkflowEdge>(storeEdges);

  /* ---------------- store sync ---------------- */

  // Sync from store to React Flow state (only when store changes externally)
  useEffect(() => {
    const storeNodesStr = JSON.stringify(storeNodes);
    const prevStoreNodesStr = JSON.stringify(prevStoreNodesRef.current);
    
    if (storeNodesStr !== prevStoreNodesStr && !isInternalUpdateRef.current) {
      const flowNodes = storeNodes.map(convertToFlowNode);
      setNodesState(flowNodes);
    }
    
    prevStoreNodesRef.current = storeNodes;
  }, [storeNodes, setNodesState]);

  useEffect(() => {
    const storeEdgesStr = JSON.stringify(storeEdges);
    const prevStoreEdgesStr = JSON.stringify(prevStoreEdgesRef.current);
    
    if (storeEdgesStr !== prevStoreEdgesStr && !isInternalUpdateRef.current) {
      setEdgesState(storeEdges);
    }
    
    prevStoreEdgesRef.current = storeEdges;
  }, [storeEdges, setEdgesState]);

  // Sync from React Flow state to store
  useEffect(() => {
    if (isInternalUpdateRef.current) return;
    
    isInternalUpdateRef.current = true;
    setNodes(nodes.map(convertFromFlowNode));
    // Reset flag after state update completes
    setTimeout(() => {
      isInternalUpdateRef.current = false;
    }, 0);
  }, [nodes, setNodes]);

  useEffect(() => {
    if (isInternalUpdateRef.current) return;
    
    isInternalUpdateRef.current = true;
    const workflowEdges: WorkflowEdge[] = edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle || undefined,
      targetHandle: edge.targetHandle || undefined,
    }));
    setEdges(workflowEdges);
    // Reset flag after state update completes
    setTimeout(() => {
      isInternalUpdateRef.current = false;
    }, 0);
  }, [edges, setEdges]);

  /* ---------------- drag & drop ---------------- */

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData("application/reactflow");
      if (!nodeType) return;

      const bounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!bounds || !reactFlowInstance.current) return;

      const position = reactFlowInstance.current.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newNode: FlowNode = {
        id: `${nodeType}-${Date.now()}`,
        type: "custom", // MUST match nodeTypes
        position,
        data: {
          nodeType: nodeType as NodeType, // actual logic type
          label: nodeType,
          status: "idle",
        },
      };

      setNodesState((nds) => nds.concat(newNode));
    },
    [setNodesState]
  );

  /* ---------------- connections ---------------- */

  const onConnect = useCallback(
    (params: Connection) => {
      const source = nodes.find((n) => n.id === params.source);
      const target = nodes.find((n) => n.id === params.target);

      if (source && target) {
        const sourceBaseNode = convertFromFlowNode(source);
        const targetBaseNode = convertFromFlowNode(target);
        const validation = canConnect(sourceBaseNode, targetBaseNode);
        if (!validation.valid) {
          alert(validation.reason);
          return;
        }
      }

      setEdgesState((eds) =>
        addEdge(
          {
            ...params,
            id: `edge-${params.source}-${params.target}`,
          },
          eds
        )
      );
    },
    [nodes, setEdgesState]
  );

  /* ---------------- selection ---------------- */

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: FlowNode) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const onEdgeClick = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      setSelectedEdgeId(edge.id);
    },
    [setSelectedEdgeId]
  );

  /* ---------------- render ---------------- */

  return (
    <div ref={reactFlowWrapper} className="w-full h-screen bg-[#0E0E13]">
      <ReactFlow
        proOptions={{ hideAttribution: true }}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onInit={(instance) => {
          reactFlowInstance.current = instance;
        }}
        fitView
      >
          <Background gap={20} size={1} color="#615D68" />
        <MiniMap pannable zoomable
          style={{
            backgroundColor: "#212126",
            width: 120,
            height: 100,
          }}
        />
      </ReactFlow>
    </div>
  );
}
