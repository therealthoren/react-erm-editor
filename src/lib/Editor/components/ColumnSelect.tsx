import React   from "react";
import Select from "react-select";

export default function ColumnSelect({nodes, node, column, onValueChange} : {nodes: any[], node: any, column: any, onValueChange?: (edge: any) => void}) {

  const getOptions = () => {
    return nodes.find(n => n.id === node)?.data?.columns?.map((column: any) => {
      return {
        value: column,
        label: column
      }
    });
  }

  const getValue = (value: any) => {
    return {
      value: value,
      label: value
    }
  }

  return (
      <Select options={getOptions()} isDisabled={true} value={getValue(column)} onChange={(v) => onValueChange && onValueChange(v)} />
  );
}
