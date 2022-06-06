import React, {useContext, useEffect, useState} from "react";
import "./index.css";
import { GlobalStateContext } from '../services/GlobalState';
import Toggle from "../components/toggle";

const letters = "abcdefghijklmnopqrstuvwxyz"

const TreeNode = ({ node, children, numberNameprop, isLastChildren }) => {
  const [state, dispatch] = useContext(GlobalStateContext);
  const [toggle, setToggle] = useState(false)
  let numberName = numberNameprop ? numberNameprop : !toggle ? '1' : letters['0']
  let nodeRender = `${node.substring(0,1)}${numberName.replace(/\d/g,'')}${node.substring(1,node.length)}`
  const inputName =  `name${numberNameprop}`

  const registerInData = (e) => {
    if(e.code === "Enter" && e.target.value.length > 3){
      dispatch({
        type: 'CREATE_NODE',
        payload: {
          text: e.target.value, 
          nested:numberName
        }
      })
      e.target.value = ""
    }
  }

  const registerInNestedData = (e) => {
    if(e.code === "Enter" && e.target.value.length > 3){
      console.log('codigo')
      console.log(`${numberName}.0`)
      dispatch({
        type: 'CREATE_NODE',
        payload: {
          text: e.target.value, 
          nested:`${numberName}.0`
        }
      })
      e.target.value = ""
    }
  }

  const deleteNode = (e) => {
    dispatch({
      type: 'DELETE_NODE',
      payload: {
        nested:numberName
      }
    })
  }

  const handleToggle = (event) => {
    setTimeout(()=>{
      setToggle(!toggle)
      event.stopPropagation();
    },600)
    
  }


  
  return (
    <div className="node">
      {!numberNameprop && (<div onClick={handleToggle}><Toggle/></div>)}
      <div className="nodeText">{`${numberName}  ${nodeRender}`} {numberNameprop && (<div onClick={deleteNode} className="delete"> ❌</div>)} </div>
      {isLastChildren && <input type="text" name={`name${numberName}1`} style={{width:"8rem"}} onKeyPress={registerInData}/>}
      {isLastChildren && <input type="text" name={`name${numberName}2`} style={{width:"8rem", marginLeft:"3rem"}} onKeyPress={registerInNestedData}/>}
      {children &&
        children.map((node, index) => {
          node.numberNameprop = `${numberName}.${!toggle ? index+1 : letters[index]}`
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
