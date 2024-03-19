"use client"
import React from 'react'
import Link from "next/link"
import Image from "next/image"
import { deleteSearch ,getSearch} from '@/utils/supabase/supabaseFunc';
import {useState} from "react"

async function deleteBook(data,setData,allDatas,display,setDisplay){

    await deleteSearch(data)
    data = await getSearch()
    setData(data)
    //〇以下の時反転させる
    if (allDatas.length <= 1){
        setDisplay(!display)
    }
    

    console.log("DBからデータが削除されました")
}

function SaveBookList(props) {
//propsからもらってこればよいか
  const {datas,setData,display,setDisplay} = props;

  

 

  return (
    <><div>{
        display ? (
            <>
            <h1>
                No Data
            </h1>
            <p>本のデータがありません</p>
            </>
        ):(
                datas.map((data)=>(
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
                        <li>
                          <Link href = {`/memo/${data.id}`}>MEMO</Link>
                        </li>
                        <button onClick={() => deleteBook(data.id,setData,datas,display,setDisplay)}>DELETE</button>
                        
                       
                   </div>
      
                  ))

            )
        }
        
        
        </div>
    </>
  )
}

export default SaveBookList