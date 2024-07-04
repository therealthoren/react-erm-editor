import React from 'react'

export default function Textfield({value, onChange, title} : {title: string, value: string, onChange?: (e: any) => void}) {

  if (!value) value = ""

  if (typeof value !== "string") value = JSON.stringify(value)

  return (
    <input type="text" value={value} onChange={(e) => {
      e.preventDefault();
      e.stopPropagation();
      if (onChange) onChange(e.target.value);
    }} placeholder={title} />
  )


}
