"use client"
import { useEffect, useRef } from 'react'

export default function App() {
  const inputRef = useRef(null)    // 1. useRefの初期化
  console.log(inputRef)

  useEffect(() => {
    inputRef.current.focus()    // 3. 使用する
    console.log(inputRef.current.value)
  },[inputRef])

  return (
    <div className="App">
      <input ref={inputRef} value = {inputRef} />    // 2. ref属性に設定
    </div>
  );
}
