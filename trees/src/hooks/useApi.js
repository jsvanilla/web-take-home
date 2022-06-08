import { useEffect, useState } from "react";

const useApi = () => {
  const [tree, setTree] = useState({})

  const readTree = async () => {
    let res = await fetch(`${process.env.REACT_APP_URL}${process.env.REACT_APP_BIN_ID}/latest`,{
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "X-Master-Key": `$2b$10$iz${process.env.REACT_APP_X_MASTER_KEY}`
      },
    })

    let data = await res.json()
    setTree(data.record);
  }

  const editApiTree = async (newData) => {
    let res = await fetch(`${process.env.REACT_APP_URL}${process.env.REACT_APP_BIN_ID}`,{
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "X-Master-Key": `$2b$10$iz${process.env.REACT_APP_X_MASTER_KEY}`
      },
      body: JSON.stringify({...newData})
    })
    let data = await res.json()
  }

  useEffect(() => {
    if(JSON.stringify(tree) === "{}"){
      readTree()
    }
  }, [tree]);
  return {
    tree,
    editApiTree
  }
}

export default useApi