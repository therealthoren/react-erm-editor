import React, {useCallback, useEffect, useRef, useState} from 'react'
import IEditorProps from '@matthewdowns/react-component-library-boilerplate/lib/Editor/Editor.props'
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState, EdgeTypes, OnConnect
} from 'reactflow'
import { PositionLoggerNode } from './nodes/PositionLoggerNode'

import type { NodeTypes } from 'reactflow'

import './Editor.less'
import './reactflow.less'
import ContextMenu from '@matthewdowns/react-component-library-boilerplate/lib/Editor/components/ContextMenu'
import GlobalContextMenu
  from '@matthewdowns/react-component-library-boilerplate/lib/Editor/components/GlobalContextMenu'
import { TableNode } from '@matthewdowns/react-component-library-boilerplate/lib/Editor/nodes/TableNode'

export const nodeTypes = {
  'position-logger': PositionLoggerNode,
  table: TableNode
  // Add any of your custom nodes here!
} satisfies NodeTypes

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes

function Editor (props: IEditorProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges)
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  )
  const [menu, setMenu] = useState(null)
  const [globalMenu, setGlobalMenu] = useState(null)

  const ref = useRef(null)

  useEffect(() => {
    if (props.onDiagramUpdate) {
      props.onDiagramUpdate({
        nodes,
        edges
      })
    }
  }, [nodes, edges]);

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

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu])

  // The react flow editor
  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChangeBefore}
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
  )
}

export default Editor
