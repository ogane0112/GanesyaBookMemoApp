"use server"

import {createClient} from "./client"
const supabase = createClient();

 //cookieの情報を取得
 
 

//現在ログインしているsession情報を取得する
export async function getSession(){
  // const refreshToken = supabase.auth.getCookie('sb:token')
  // const accessToken = supabase.auth.getCookie('sb:token')

  // if (refreshToken && accessToken) {
  //   await supabase.auth.setSession({
  //     refresh_token: refreshToken,
  //     access_token: accessToken,
  //   })
  // } else {
  //   // make sure you handle this case!
  //   throw new Error('User is not authenticated.')
  // }
  
  // // returns user information
  const  user =  await supabase.auth.getUser()
  
  return user
}

//指定されたIDのデータを消去する。
export async function deleteSearch(id){
  const { error } = await supabase
  .from('books')
  .delete()
  .eq('id', id)

}
//保存した書籍データをbooksテーブルから取得する
//ログイン機能を実装する場合selectの後にeqでIDでソートすることでログイン機能を実装する事ができる！
export async function getSearch() {
  let { data: books, error } = await supabase
  .from('books')
  .select('*')
  return books
}
export async function saveSearch(book,query) {
    
    const plainBook = {
      id: book.id,
      isbn: query,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      image_url: book.volumeInfo.imageLinks?.thumbnail,
    };
  
    const { data, error } = await supabase
      .from("books")
      .insert([plainBook])
      .select();
  
    if (error) {
      console.error("Error saving book:", error);
    } else {
      console.log("Book saved successfully:", data);
    }
  }
