import React from 'react'
import EditModal from "./EditModal";
import Select from "react-select";
import NodeSelect from "./NodeSelect";
import ColumnSelect from "./ColumnSelect";
import Textfield from "./Textfield";
import {TrashIcon} from "@heroicons/react/16/solid";

export type EditNodeModalProps = {
  node: any,
  onNodeChanged: (node: any, newNode: any) => void,
  nodes: any[]
}

export default function EditNodeModal({node, onNodeChanged, nodes} : EditNodeModalProps) {
  const [currentNode, setCurrentNode] = React.useState(node);

  const onDeleteClicked = (index: number) => {
    const newNode = JSON.parse(JSON.stringify(currentNode));
    newNode.data.columns.splice(index, 1);
    setCurrentNode(newNode);

    onNodeChanged(currentNode, newNode);
  }

  const onNameChanged = (name: string) => {
    const newNode = JSON.parse(JSON.stringify(currentNode));
    newNode.id = name;
    newNode.name = name;
    newNode.data.name = name;
    setCurrentNode(newNode);

    onNodeChanged(currentNode, newNode);
  }

  const onAddNewRow = () => {
    const newNode = JSON.parse(JSON.stringify(currentNode));
    newNode.data.columns.push({name: "", type: ""});
    setCurrentNode(newNode);
    onNodeChanged(node, newNode);
  }

  const onColumnChanged = (index: number, column: any, value: string) => {
    const newNode = JSON.parse(JSON.stringify(currentNode));
    newNode.data.columns[index][column] = value;
    onNodeChanged(node, newNode);
    setCurrentNode(newNode);
  }

  return (
    <EditModal title={currentNode.id}>
      <div className={"modal_input_block"}>
        <label>Name of the table</label>
        <Textfield value={currentNode.id} title={"Name"} onChange={(text) => onNameChanged(text)} />
      </div>
      <hr/>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
        </tr>
        </thead>
        <tbody>
        {currentNode.data?.columns.map((column: any, index: number) => {
          return (
            <tr className={""}>
              <td style={{width: "70%"}}>
              <Textfield value={column.name} title={"Name"} onChange={(e) => onColumnChanged(index, "name", e)}/>
              </td>
              <td style={{width: "25%"}}>
              <Textfield title={"type"} value={column.type} onChange={(e) => onColumnChanged(index, "type", e)} />
              </td>
              <td style={{minWidth: "25px !important"}}>
                <TrashIcon className={"trashicon"} onClick={() => onDeleteClicked(index)} />
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>

      <div className={"modal_input_block"}>
        <button onClick={() => {
          onAddNewRow();
        }}>Add column</button>
      </div>


    </EditModal>
  )
}
