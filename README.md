# react-erm-editor

## Overview

`react-erm-editor` is a React-based editor designed specifically for editing Entity Relationship Diagrams (ERDs). This editor is built on top of the `react-flow` library and leverages `react-flow`'s JSON documentation to read and write the ERD models.

## Features

- **User-Friendly Interface**: Intuitive UI for creating and editing entity relationships.
- **React Flow Integration**: Utilizes `react-flow` for rendering and managing the diagram.
- **JSON Support**: Reads and writes ERD models in JSON format for ease of integration and storage.
- **Customizable**: Easily extendable and customizable to fit various use cases and requirements.

## Installation

To install `react-erm-editor`, you can use npm or yarn:

```bash
npm install react-erm-editor

```

or

```bash
yarn add react-erm-editor

```

## Usage

Here is a basic example of how to use `react-erm-editor` in your React application:

```tsx
import React from 'react';
import { ReactERDEditor } from 'react-erm-editor';

const App = () => {
  const initialData = {
    nodes: [],
    edges: []
  };

  const onDiagramUpdate = (diagram) => {
    console.log('ERD Model:', JSON.stringify(diagram));
  };
  
  const onNodeChanged = (nodes) => {
    console.log('Nodes:', nodes);
  };
  
  const onEdgeChanged = (edges) => {
    console.log('Edges:', edges);
  };

  return (
      <Editor nodes={diagram.nodes} edges={diagram.edges}
              onNodesChanged={(nodes: any[]) => onNodeChanged(nodes)}
              onEdgesChanged={(edges: any[]) => onEdgeChanged(edges)}
              onDiagramUpdate={(diagram: { nodes: any[], edges: any[] }) => onDiagramUpdate(diagram)} />
  );
};

export default App;

```

## Data Structure

The data structure for the ERD model is as follows:

```json
{
  "nodes": [
    {
      "id": "1",
      "type": "table",
      "data": {
        "columns": [
          {
            "name": "id",
            "type": "integer",
            "pk": true
          },
          {
            "name": "name",
            "type": "string"
          }
        ]
      },
      "position": {
        "x": 100,
        "y": 100
      }
    }
  ],
  "edges": [
    {
      "id": "order_order_items",
      "source": "order",
      "sourceHandle": "id",
      "target": "order_items",
      "targetHandle": "order_id"
    }
  ]
}
```


## Props

- `nodes`: The nodes (the tables) in the ERD editor.
- `edges`: The edges (Foreign Key relationships) in the ERD editor.
- `onDiagramUpdate`: A callback function that is called when the diagram is updated.
  - You get all the nodes and edges in the diagram.
- `onNodesChanged`: You receive the updated nodes when the nodes are changed.
- `onEdgesChanged`: You receive the updated edges when the edges are changed.

## Contributing

If you would like to contribute to `react-erm-editor`, please follow these steps:

## License

This project is licensed under the MIT License. See the [LICENSE](https://www.notion.so/LICENSE) file for details.

## Acknowledgements

- [React Flow](https://reactflow.dev/) - The library that powers the diagram rendering and management.
