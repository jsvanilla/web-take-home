import React, { useReducer, createContext, useEffect } from 'react'
import useApi from '../hooks/useApi'
import treeData from '../tree/data.json'

export const GlobalStateContext = createContext()

export const GlobalStateContextProvider = props => {
  const {tree, editApiTree} = useApi()
  const reducer = (state, action) => {
    switch (action.type) {
      case 'CREATE_NODE':
        let newNode = {node:action.payload.text, isEditing: false}
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
        editApiTree({...newTree})
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
        editApiTree({...treeReference})
        return {...treeReference}
      case 'TOGGLE_SWITCH':
        let stateCopy = {...state, toggle:action.payload}
        return stateCopy
      case 'SET_STATE':
        editApiTree({...action.payload})
        return {...action.payload}
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, tree)

  useEffect(() => {
    if(JSON.stringify(tree) !== "{}" && JSON.stringify(tree) != JSON.stringify(state)){
      dispatch({
        type:'SET_STATE',
        payload: JSON.stringify(state) === '{}' ? tree : state
      })
    }
  }, [JSON.stringify(tree)])
  
  
  return (
    <GlobalStateContext.Provider value={[state, dispatch]}>
      {tree && props.children}
    </GlobalStateContext.Provider>
  );
};