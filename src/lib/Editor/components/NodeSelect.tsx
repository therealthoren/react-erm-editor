import React   from "react";
import Select from "react-select";

export default function NodeSelect({nodes, value, onValueChange} : {nodes: any[], value: any, onValueChange: (edge: any) => void}) {

  const getOptions = () => {
    return nodes.map(node => {
      return {
        value: node.id,
        label: node.id
      }
    })
  }

  const getValue = (value: any) => {
    return {
      value: value,
      label: value
    }
  }

  return (
      <Select options={getOptions()} isDisabled={true} value={getValue(value)} onChange={(v) => onValueChange(v)} />
  );
}
