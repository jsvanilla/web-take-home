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
      <span class="vertical-line"></span>
      <span class="vertical-line" style={{marginLeft:"2.37rem"}}></span>
      <span class="vertical-line" style={{marginLeft:"4.74rem"}}></span>
      <span class="vertical-line" style={{marginLeft:"7.11rem"}}></span>
      <ExampleTree/>
    </div>
  );
}



function ExampleTree() {
  return (
    <div  style={{marginTop: "6rem"}}>
      <p>1 root</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;1.1 ant</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;1.2 bear</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.2.1 cat</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.2.2 dog</p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.2.2.1 elephant
      </p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;1.3 frog</p>
    </div>
  );
}