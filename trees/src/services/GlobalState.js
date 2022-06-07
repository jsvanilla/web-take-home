import React, { useReducer, createContext } from 'react'
import treeData from '../tree/data.json'

export const GlobalStateContext = createContext(treeData)

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_NODE':
      let newNode = {node:action.payload.text}
      let elementsToSearch = action.payload.nested.replace(/(\.\d)$/gm,'').split('.')
      let newTree = {...state}
      const editTree = (node) => {
        if(elementsToSearch.length === 1){
          let valueToReplace = node.children ? [...node.children, newNode] : [newNode]
          node.children = valueToReplace
        } else {
          elementsToSearch.shift()
          let valueToSearch = node.children[(elementsToSearch[0]-1)]
          editTree(valueToSearch)
        }
      }
      let withNewNode = editTree(newTree)
      return {...newTree}
    case 'DELETE_NODE':
      let elementsSearch = action.payload.nested.replace(/^(\d\.)/gm,'').split('.').map(el => parseInt(el)) 
      let treeReference = {...state}
      const deleteNode = (node) => {
        if(elementsSearch.length === 1){
          node.children.splice(elementsSearch[0]-1,1)
        } else {
          let index = elementsSearch.shift()
          deleteNode(node.children[index-1])
        }
      }
      let deletedNode = deleteNode(treeReference)
      return {...treeReference}
    case 'TOGGLE_SWITCH':
      let stateCopy = {...state, toggle:action.payload}
      return stateCopy
    default:
      return state
  }
}

export const GlobalStateContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, treeData)
  
  return (
    <GlobalStateContext.Provider value={[state, dispatch]}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};