import React from "react"
import "./toggle.css"

export default function Toggle() {
  return (
    <label className="switch">
      <input type="checkbox"/>
      <span className="slider round"></span>
    </label>
  )
}