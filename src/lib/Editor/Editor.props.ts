import { ReactNode } from 'react'

interface IEditorProps extends Partial<Omit<HTMLButtonElement, 'children'>> {
  children?: ReactNode
  nodes: [],
  edges: [],
  onNodesChanged?: (nodes: any) => boolean
  onEdgesChanged?: (edges: any) => boolean
  onNodeSelected?: (node: any) => void
  onEdgeSelected?: (edge: any) => void
  onNodeDeselected?: (node: any) => boolean
  onEdgeDeselected?: (edge: any) => boolean
  onNodeContextMenu?: (event: any, node: any) => boolean
  disabled?: boolean,
  loading?: boolean,
  onAddNode?: (node: any) => boolean
  onAddEdge?: (edge: any) => boolean

  onDiagramUpdate?: (param: { nodes: any[]; edges: any[] }) => void;
}

export default IEditorProps
