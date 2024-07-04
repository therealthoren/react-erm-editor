import React, {type MouseEvent as ReactMouseEvent, useCallback, useEffect, useRef, useState} from 'react'
import IEditorProps from './Editor.props'
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState, EdgeTypes, OnConnect, updateEdge
} from 'reactflow'
import { PositionLoggerNode } from './nodes/PositionLoggerNode'

import type { NodeTypes } from 'reactflow'

import './Editor.less'
import './reactflow.less'
import GlobalContextMenu from './components/GlobalContextMenu'
import ContextMenu from "./components/ContextMenu";
import {TableNode} from "./nodes/TableNode";
import EditEdgeModal from "./components/EditEdgeModal";
import EditNodeModal from "./components/EditNodeModal";

export const nodeTypes = {
  'position-logger': PositionLoggerNode,
  table: TableNode
  // Add any of your custom nodes here!
} satisfies NodeTypes

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes

function Editor (props: IEditorProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes as any[])
  const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges)
  const [showEditNodeModal, setShowEditNodeModal] = useState(null)
  const onConnect: OnConnect = useCallback(
    (connection) => {
      if (props.onEdgesChanged && props.onEdgesChanged([{
        ...connection,
        type: "add"
      }]) === false) {
        return;
      }
      setEdges((edges) => addEdge(connection, edges))
    },
    [setEdges]
  )
  const [menu, setMenu] = useState(null)
  const [globalMenu, setGlobalMenu] = useState(null)
const [showEditEdgeModal, setShowEditEdgeModal] = useState(null)


  const ref = useRef(null)

  useEffect(() => {
    if (props.onDiagramUpdate) {
      props.onDiagramUpdate({
        nodes,
        edges
      })
    }
  }, [nodes, edges]);

  const updateNode = (oldNode: any, newNode: any) => {
    if (props.onNodesChanged && props.onNodesChanged([{
      ...oldNode,
      ...newNode
    }]) === false) {
      return false;
    }
    if (newNode.id !== oldNode.id) {
      setNodes((nodes) => nodes.map((n) => n.id === oldNode.id ? {...n, ...newNode} : n))
    }
    else {
      setNodes((nodes) => nodes.map((n) => n.id === oldNode.id ? {...n, ...newNode} : n))
    }

  }

  const showEditEdge = (edge: any) => {
    if (props.onEdgeSelected) {
      props.onEdgeSelected(edge)
    }
    setShowEditEdgeModal(JSON.parse(JSON.stringify(edge)));
  }

  const onNodesChangeBefore = useCallback((nodes: any[]) => {
    if (props.onNodesChanged && props.onNodesChanged(nodes) === false) {
      return false;
    }
    onNodesChange(nodes)
  }, [props.onNodesChanged, onNodesChange]);

  const onEdgesChangeBefore = useCallback((edges: any[]) => {
    if (props.onEdgesChanged && props.onEdgesChanged(edges) === false) {
      return false;
    }
    onEdgesChange(edges)
  }, [props.onEdgesChanged, onEdgesChange]);

  const onNodeContextMenu = useCallback(
    (event: any, node: any) => {
      // Prevent native context menu from showing
      event.preventDefault()
      if (props.onNodeContextMenu)  {
        if (!props.onNodeContextMenu(event, node)) {
          return false;
        }
      }

      setMenu(null)
      setGlobalMenu(null)

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      // @ts-expect-error
      const pane = ref.current.getBoundingClientRect()
      setMenu({
        // @ts-expect-error
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY
      })
    },
    [setMenu]
  )

  const onContextMenu = useCallback(
    (event: any) => {

      // Prevent native context menu from showing
      event.preventDefault()

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      // @ts-expect-error
      const pane = ref.current.getBoundingClientRect()
      setGlobalMenu({
        // @ts-expect-error
        id: 'global',
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY
      })
    },
    [setGlobalMenu]
  )

  const onClickAnywhere = useCallback(() => {
    setMenu(null)
    setGlobalMenu(null)
  }, [setMenu, setGlobalMenu])

  const onNodeClick = useCallback(() => {
    setMenu(null)
    setGlobalMenu(null)
  }, [setMenu, setGlobalMenu])

  const onNodeDoubleClick = useCallback((e: ReactMouseEvent,  node: any) => {
    setMenu(null)
    setGlobalMenu(null)
    setShowEditNodeModal(node);
  }, [setMenu, setGlobalMenu])

  const onSelectionChange = useCallback((data: {nodes: any[], edges: any[]}) => {
    if (data && data.edges.length === 0) {
      setShowEditEdgeModal(null);
    }
    if (data && data.nodes.length === 1 && showEditNodeModal != null) {
      setShowEditNodeModal(data.nodes[0]);
    }
    if (data && data.nodes.length === 0 ) {
      setShowEditNodeModal(null);
    }
    if (data && data.edges.length === 1 && showEditEdgeModal != null) {
      setShowEditEdgeModal(data.edges[0]);
    }

    setMenu(null)
    setGlobalMenu(null)
  }, [setMenu, setGlobalMenu, setShowEditEdgeModal])

  const onEdgeDoubleClick = useCallback((e: ReactMouseEvent, edge: any) => {
    e.preventDefault();
    e.stopPropagation();
    showEditEdge(edge);
    setMenu(null)
    setGlobalMenu(null)
  }, [setMenu, setGlobalMenu])

  const onEdgeContextMenu = useCallback(() => {
    setMenu(null)
    setGlobalMenu(null)
  }, [setMenu, setGlobalMenu])



  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu])


  // The react flow editor
  return (
    <>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChangeBefore}
        onNodeClick={onNodeClick}
        onNodeDoubleClick={onNodeDoubleClick}
        onEdgeDoubleClick={onEdgeDoubleClick}
        onEdgeContextMenu={onEdgeContextMenu}
        onSelectionChange={onSelectionChange}
        edges={edges}
        ref={ref}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChangeBefore}
        onNodeContextMenu={onNodeContextMenu}
        onContextMenu={onContextMenu}
        onClick={onClickAnywhere}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />

        {globalMenu && <GlobalContextMenu onClick={onPaneClick} {...globalMenu as any}  />}

        {menu && <ContextMenu onClick={onPaneClick} {...menu as any} />}
      </ReactFlow>
      {showEditEdgeModal && <EditEdgeModal nodes={nodes} onEdgeChanged={(edge) => setEdges(updateEdge(showEditEdgeModal, edge, edges))} edge={showEditEdgeModal} />}
      {showEditNodeModal && <EditNodeModal node={showEditNodeModal} onNodeChanged={(e, nb) => updateNode(e, nb)} nodes={nodes} />}
    </>
  )
}

export default Editor
