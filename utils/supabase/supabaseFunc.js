"use server"
import {createClient} from "./client"
const supabase = createClient();
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