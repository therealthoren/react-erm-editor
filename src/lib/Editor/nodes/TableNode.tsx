import type { NodeProps } from 'reactflow'

import React from 'react'
import { Handle, Position } from 'reactflow'

export interface TableNodeProps {
  name?: string
  columns?: Array<{
    name: string
    type: string
  }>
  constraints?: Array<{
    name: string
    id?: string
    type: string
    columns: string[]
  }>

}

export function TableNode ({
  xPos,
  yPos,
  data
}: NodeProps<TableNodeProps>) {
  const constraintType = (column: any) => {
    if (data.constraints != null) {
      for (const constraint of data.constraints) {
        if (constraint.columns.includes(column.name)) {
          return constraint.type === 'primary_key' ? 'primary-key' : 'foreign-key'
        }
      }
    }
    return ''
  }

  const getConstraint = (column: any) => {
    if (data.constraints != null) {
      for (const constraint of data.constraints) {
        if (constraint.columns.includes(column.name)) {
          return constraint
        }
      }
    }
    return null
  }

  const isPrimaryKey = (column: any) => {
    if (data.constraints != null) {
      for (const constraint of data.constraints) {
        if (constraint.columns.includes(column.name)) {
          return constraint.type === 'primary_key'
        }
      }
    }
    if (column.name === 'id' || column.name === 'uuid' || column.name === 'ID' || column.name === 'UUID') {
      return true
    }
    return false
  }

  const isConnectable = (column: any) => {
    if (column.type?.toLowerCase() === 'integer' || column.type?.toLowerCase() === 'string' ||
          column.type?.toLowerCase() === 'text' || column.type?.toLowerCase() === 'uuid' ||
          column.type?.toLowerCase() === 'varchar' || column.type?.toLowerCase() === 'char' ||
          column.type?.toLowerCase() === 'bigint' || column.type?.toLowerCase() === 'smallint' ||
          column.type?.toLowerCase() === 'real' ||
          column.type?.toLowerCase() === 'int64') {
      return true
    }
    return false
  }

  return (

    // We add this class to use the same styles as React Flow's default nodes.
    <div className='inner-container'>
      {data.name && <div className='title'>{data.name}</div>}

      <div className='columns'>
        {data.columns?.map((column) => {
          const constraint = getConstraint(column)
          return (
            <div key={column.name} className='column'>
              {isConnectable(column) && !isPrimaryKey(column) && <Handle
                type='source' style={{
                  position: 'absolute',
                  transform: 'none',
                  top: '50%',
                  marginRight: '10px'

                }} position={Position.Right}
                id={column.name}

                                                                 />}
              {isPrimaryKey(column) && <Handle
                type='target'
                id={column.name}
                style={{
                  position: 'absolute',
                  transform: 'none',
                  top: '40%',
                  marginLeft: '10px'
                }}
                position={Position.Left}
                                       />}
              <div className={'property-name ' + constraintType(column)}>{column.name} <span
                className='col-type'
                                                                                       >({column.type})
                                                                                       </span>
              </div>

            </div>
          )
        })}
      </div>

    </div>
  )
}
