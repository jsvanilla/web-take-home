import React from "react";
import "./index.css";

const TreeNode = ({ node, children }) => {
  return (
    <div>
      {node}
      {children &&
        children.map((node) => (
          <div key={node.node} className="ident">
            <TreeNode {...node} />
          </div>
        ))}
    </div>
  );
};

export default TreeNode;
