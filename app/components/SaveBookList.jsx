"use client"
import React from 'react'
import Link from "next/link"
import Image from "next/image"

function SaveBookList(props) {
    const {datas} = props

  return (
    <>
        {datas.map((data)=>(
              <div key={data.id} className="flex bg-orange-200 rounded-md mt-2 mb-2 p-2 justify-between">

                  <li><Image 
                  src = {data.image_url}
                  width={128} 
                  height={192}
                  className='w-24 h-auto'
                  alt ="nothing"
                  priority
                  ></Image></li>
                  <li className='font-medium'>{data.title}</li>

                  <li>著者</li>
                    {
                        data.authors
                    }
                  <li><Link 
                  href = {`/memo/${data.id}`}
                  
                  >MEMO</Link></li>
                 
             </div>
            ))}
    </>
  )
}

export default SaveBookList