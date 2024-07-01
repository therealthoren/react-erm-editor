import { ReactNode } from 'react'

interface IEditorProps extends Partial<Omit<HTMLButtonElement, 'children'>> {
  children?: ReactNode
  nodes: []
  edges: []
}

export default IEditorProps
