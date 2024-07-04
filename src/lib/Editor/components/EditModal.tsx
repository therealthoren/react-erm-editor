import React from 'react'

import "./EditModal.less"

export default function EditModal({children, title} : {children?: React.ReactNode, title: string}) {
  return (
    <div className={"edit-modal-container"}>
      <div className={"edit-modal"}>
        <div className={"edit-modal-header"}>
          {title}
        </div>
        <div className={"edit-modal-body"}>
        {children}
        </div>
      </div>
    </div>
  )
}
