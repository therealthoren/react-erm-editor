import React from 'react'
import EditModal from "./EditModal";
import Select from "react-select";
import NodeSelect from "./NodeSelect";
import ColumnSelect from "./ColumnSelect";

export type EditEdgeModalProps = {
  edge: any,
  onEdgeChanged: (oldedge: any, newEdge: any) => void,
  nodes: any[]
}

export default function EditEdgeModal({edge, onEdgeChanged, nodes} : EditEdgeModalProps) {
  console.log(edge);
  return (
    <EditModal title={edge.id}>
      <div className={"modal_input_block"}>
        <label>Source</label>
        <NodeSelect nodes={nodes} value={edge.source}
                    onValueChange={(e) => onEdgeChanged(edge, {...edge, source: e.target.value})}/>
      </div>
      <div className={"modal_input_block"}>
        <label>Label</label>
        <ColumnSelect column={edge.sourceHandle} node={edge.source} nodes={nodes}/>
      </div>
      <div className={"modal_input_block"}>
        <label>Target</label>
        <NodeSelect nodes={nodes} value={edge.target}
                    onValueChange={(e) => onEdgeChanged(edge, {...edge, source: e.target.value})}/>
      </div>
      <div className={"modal_input_block"}>
        <label>Label</label>
        <ColumnSelect column={edge.targetHandle} node={edge.target} nodes={nodes}/>
      </div>
    </EditModal>
  )
}
