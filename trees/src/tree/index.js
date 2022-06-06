import React, {useState} from 'react'
import "./index.css";
import TreeNode from './TreeNode';


export default function Tree() {
  const [data] = useState({
    node: 'root',
    children: [{
      node: 'ant'
    },{
      node: 'bear',
      children: [{
        node: 'cat'
      },{
        node: 'dog',
        children: [{
          node: 'elephant'
        }]
      }]
    },{
      node: 'frog'
    }]
  })
  return (
    <div className="tree">
      <TreeNode {...data}/>
    </div>
  );
}