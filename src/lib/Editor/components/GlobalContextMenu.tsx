import React, { useCallback } from 'react'
import { useReactFlow } from 'reactflow'

export default function GlobalContextMenu ({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}: any) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow()
  const duplicateNode = useCallback(() => {
    const node: any = getNode(id)
    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50
    }

    addNodes({
      ...node,
      selected: false,
      dragging: false,
      id: `${node.id}-copy`,
      position
    })
  }, [id, getNode, addNodes])

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id))
    setEdges((edges) => edges.filter((edge) => edge.source !== id))
  }, [id, setNodes, setEdges])

  const createNode = useCallback(() => {
    const position = {
      x: left,
      y: top
    }

    addNodes({
      id: 'new-table-' + Date.now(),
      type: 'table',
      selected: false,
      dragging: false,
      position,
      data: { name: 'new node' }
    })
  }, [id, setNodes, addNodes])

  return (
    <div
      style={{ top, left, right, bottom }}
      className='context-menu'
      {...props}
    >
      <button onClick={createNode}>create</button>
      <button onClick={deleteNode}>delete</button>
    </div>
  )
}
