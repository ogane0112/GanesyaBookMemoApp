"use client"
import React from 'react'
import {getSearch} from "@/utils/supabase/supabaseFunc"
import {useState,useEffect} from "react"
import SaveBookList from "@/app/components/SaveBookList"
function SaveBook() {
const [datas,setData] = useState([]);

//初回読み込み時にDBからデータを取得
useEffect(()=>{
const getSaveBook = async() =>{
try{
  //DBからデータを取得
  const datas = await getSearch();
  //useStateを用いて変数を更新
  setData(datas)
  console.log(datas)
  console.log(datas[1].authors)

}catch(error){

  //Errorハンドリングをする！
  console.error(error)

}

}

//関数よびだし
getSaveBook()
},[])


  //map関数で回すことでデータを取り出す！
  return (
   <ul>

    <SaveBookList datas = {datas}/>

   </ul>
  )
};

export default SaveBook