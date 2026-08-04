import { useEffect, useState } from "react";
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook
} from "../firebase/firestore";

export default function AdminDashBoard() {
  const [books,setBooks] = useState([]);

  const [form,setForm] = useState({
    title:"",
    author:"",
    price:"",
    genre:"",
    image:""
  });

  async function loadBooks(){
    const data = await getBooks();
    setBooks(data);
  }

  useEffect(()=>{
    loadBooks();
  },[]);

  async function handleSubmit(e){

    e.preventDefault();

    await addBook(form);

    setForm({
      title:"",
      author:"",
      price:"",
      genre:"",
      image:""
    });

    loadBooks();
  }
  async function remove(id){

    await deleteBook(id);

    loadBooks();
  }
return (
<div className="min-h-screen bg-gray-100 p-10">
<h1 className="
text-4xl font-bold mb-8">
Admin Dashboard
</h1>
<form
onSubmit={handleSubmit}
className="bg-white p-6 rounded-xl shadow space-y-4 max-w-xl">
<input
className="border p-3 w-full"
placeholder="Title"
value={form.title}
onChange={(e)=>setForm({
...form,
title:e.target.value
})}
/>
<input
className="border p-3 w-full"
placeholder="Author"
value={form.author}
onChange={(e)=>setForm({
...form,
author:e.target.value
})}
/>
<input
className="border p-3 w-full"
placeholder="Price"
value={form.price}
onChange={(e)=>setForm({
...form,
price:e.target.value
})}
/>
<input
className="border p-3 w-full"
placeholder="Image URL"
value={form.image}
onChange={(e)=>setForm({
...form,
image:e.target.value
})}
/>
<button
className="bg-yellow-700 text-white px-6 py-3 rounded">
Add Book
</button>
</form>
<div className="
grid md:grid-cols-3 gap-6 mt-10">
{
books.map(book=>(
<div
key={book.id}
className="bg-white p-5 rounded-xlshadow">
<img
src={book.image}
className="h-60w-fullobject-cover"/>
<h2 className="font-bold text-xl mt-3">
{book.title}
</h2>
<p>
{book.author}
</p>
      <button
      onClick={()=>remove(book.id)}
      className=" text-red-600mt-3">Delete</button>
</div>
))
}

</div>
</div>
)
}