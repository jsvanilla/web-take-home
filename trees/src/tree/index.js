import React, {useEffect, useContext} from 'react'
import "./index.css";
import TreeNode from './TreeNode';
import { GlobalStateContext } from '../services/GlobalState';

export default function Tree() {
  const [state, dispatch] = useContext(GlobalStateContext);
  
  useEffect(() => {
  }, [state])
  
  return (
      <div className="tree">
        <TreeNode {...state}/>
        <span className="vertical-line"></span>
        <span className="vertical-line" style={{marginLeft:"2.37rem"}}></span>
        <span className="vertical-line" style={{marginLeft:"4.74rem"}}></span>
        <span className="vertical-line" style={{marginLeft:"7.11rem"}}></span>
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