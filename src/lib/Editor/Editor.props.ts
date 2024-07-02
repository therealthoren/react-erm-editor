import { ReactNode } from 'react'

interface IEditorProps extends Partial<Omit<HTMLButtonElement, 'children'>> {
  children?: ReactNode
  nodes: [],
  edges: [],
  onNodesChanged?: (nodes: any) => void
  onEdgesChanged?: (edges: any) => void
  onNodeSelected?: (node: any) => void
  onEdgeSelected?: (edge: any) => void
  onNodeDeselected?: (node: any) => void
  onEdgeDeselected?: (edge: any) => void
  onNodeContextMenu?: (event: any, node: any) => void
  onAddNode?: (node: any) => void
  onAddEdge?: (edge: any) => void
}

export default IEditorProps
