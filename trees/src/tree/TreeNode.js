import React from "react";
import "./index.css";

const TreeNode = ({ node, children, numberNameprop }) => {
  let numberName = numberNameprop ? numberNameprop : '1'
  let nodeRender = `${node.substring(0,1)}${numberName.replace(/\d/g,'')}${node.substring(1,node.length)}`
  return (
    <div className="node">
      <div>{`${numberName}  ${nodeRender}`}</div>
      {children &&
        children.map((node, index) => {
          node.numberNameprop = `${numberName}.${index+1}`
          return(
            <div key={node.node} className="ident">
              <TreeNode {...node} />
            </div>
          )
        })}
    </div>
  );
};

export default TreeNode;
