import React, {useContext, useEffect, useState} from "react";
import "./index.css";
import { GlobalStateContext } from '../services/GlobalState';
import Toggle from "../components/toggle/index";

const letters = "abcdefghijklmnopqrstuvwxyz"

const TreeNode = ({ node, children, numberNameprop = '1', isLastChildren }) => {
  const [state, dispatch] = useContext(GlobalStateContext);
  let numberNameRender = () => {
    if(!state.toggle){
      return numberNameprop 
    }
      return numberNameprop.split('.').map(el => letters[el-1]).join('.')
  } 
  const [nodeRender, setNodeRender] = useState(node ? `${node.substring(0,1)}${numberNameRender().replace(/[\d\w]/gm,'')}${node.substring(1,node.length)}` : '')

  const registerInData = (e) => {
    if(e.code === "Enter" && e.target.value.length > 2){
      dispatch({
        type: 'CREATE_NODE',
        payload: {
          text: e.target.value, 
          nested:numberNameprop
        }
      })
      e.target.value = ""
    }
  }

  const registerInNestedData = (e) => {
    if(e.code === "Enter" && e.target.value.length > 2){
      dispatch({
        type: 'CREATE_NODE',
        payload: {
          text: e.target.value, 
          nested:`${numberNameprop}.0`
        }
      })
      e.target.value = ""
    }
  }

  const deleteNode = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'DELETE_NODE',
      payload: {
        nested:numberNameprop
      }
    })
  }

  const handleToggle = (e) => {
    e.stopPropagation();
    setTimeout(()=>{
      dispatch({
        type: 'TOGGLE_SWITCH',
        payload: !state.toggle
      })
    },600)     
  }

  useEffect(() => {
    setNodeRender(node ? `${node.substring(0,1)}${numberNameRender().replace(/[\d\w]/gm,'')}${node.substring(1,node.length)}` : '')
  },[JSON.stringify(state)])
  
  
  return (
    <div className="node">
      {numberNameprop === "1" && (<div onClick={handleToggle}><Toggle/></div>)}
      <div className="nodeText"><strong className="classificationid">{`${numberNameRender()} `}</strong>{` ${nodeRender}`} {numberNameprop !== "1" && (<div onClick={deleteNode} className="delete"> ❌</div>)} </div>
      {(isLastChildren || node === "root" && children.length === 0) && <input type="text" name={`name${numberNameprop}1`} style={{width:"8rem"}} onKeyPress={registerInData}/>}
      {(isLastChildren || node === "root" && children.length === 0) && <input type="text" name={`name${numberNameprop}2`} style={{width:"8rem", marginLeft:"3rem"}} onKeyPress={registerInNestedData}/>}
      {children &&
        children.map((node, index) => {
          node.numberNameprop = `${numberNameprop}.${index+1}`
          node.isLastChildren = index === children.length-1
          return(
            <div key={`${node.node}${node.numberNameprop}`} className="ident">
              <TreeNode {...node} />
            </div>
          )
        })}
    </div>
  );
};

export default TreeNode;
