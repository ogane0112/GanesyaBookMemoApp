"use client"
import { useState,useEffect } from "react";
import { saveSearch ,getSession} from "@/utils/supabase/supabaseFunc"
import Modal from "@/app/components/Modal"
interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks?: {
      thumbnail: string;
    };
  };
}

const BookSearch = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
 

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleSearch = async () => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
    );
    const data = await response.json();
    console.log(data.items)
    setBooks(data.items || []);
  };

  const handleSave = async (props:any) => {
    await saveSearch(props.book, props.query)
    toggleModal();
  }
 
  const getNowSession = async()=>{
    const session:any  = await getSession()
    return session;
  }

  useEffect(()=>{
  //sesiionを取得する!
  
  const fetchSession = async () => {
    const session = await getNowSession();
    console.log(session);
  };

  fetchSession();

  },[]
  )

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books..."
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.volumeInfo.imageLinks && (
              <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
            )}
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors?.join(", ")}</p>

            <Modal 
            book={book} 
            query={query} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookSearch;