"use client"

import React from 'react'
import {getSearch,getSession} from "@/utils/supabase/supabaseFunc"
import {useState,useEffect} from "react"
import SaveBookList from "@/app/components/SaveBookList"



function SaveBook() {
const [datas,setData] = useState([]);

const [display,setDisplay] = useState(false);

//データがない場合に表示させる物を判定するための関数
const countData = (data) => {

  if (data.length > 0){
    setDisplay(false);
  }else{
    setDisplay(true);
  }

}


//初回読み込み時にDBからデータを取得
useEffect(()=>{
const getSaveBook = async() =>{
try{
  //sesiionを取得する!
  const session  = await getSession()
  console.log(session)
  
  //DBからデータを取得
  const datas = await getSearch();

  //useStateを用いて変数を更新
  setData(datas);
  console.log(datas);

  //表示を決定する関数を呼び出す
  countData(datas);


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

    <SaveBookList datas = {datas} setData = {setData} display={display} setDisplay={setDisplay} />

   </ul>
  )
};

export default SaveBook