import React from "react"
import "./index.css"

export default function Toggle() {
  return (
    <label className="switch">
      <input type="checkbox"/>
      <span className="slider round"></span>
    </label>
  )
}