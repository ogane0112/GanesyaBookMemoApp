"use client"
import React from 'react'
import Markdown from "@/app/components/MarkdownRender"

export default function Memo ({params}:
  {
    params:{id:string};
  }
  
  ) {
 
  return (
    <div>
    <Markdown/>
    </div>
  )
}

