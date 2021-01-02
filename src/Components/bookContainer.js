import React, { useState } from "react";
import axios from "axios";

function BookContainer() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState(
    "AIzaSyBUSt-pAfV59egTuzz7n0GlgB3x3ghSX9k"
  );
  const [likes, setLikes] = useState([]);
  const [likedbook, setlikedbook] = useState("");
  

  function handleLike(event) {
    const title = event.target.parentElement.children[0].innerText;
    const author = event.target.parentElement.children[1].innerText;
    const description = event.target.parentElement.children[2].innerText;
    const likedbook = {
      title: title,
      author: author,
      description: description,
    };


    
    console.log(likedbook);

    setLikes([likedbook]);
    console.log(likes);
  }

  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          "&key=" +
          apiKey +
          "&maxResults=40"
      )
      .then((data) => {
        console.log(data.data.items);
        setResult(data.data.items);
      });
  }

  return (
    <div className="container">
      <h1>Search Books</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            onChange={handleChange}
            className="input-control"
            placeholder="Search for Books"
            autoComplete="off"
          />
        </div>
        <button className="btn-danger" type="submit">
          Search
        </button>
      </form>
      {result.map((book) => (
        <div className="book">
          <h4 className="bookTitle">{book.volumeInfo.title}</h4>
          <h5 className="bookAuthor">{book.volumeInfo.authors}</h5>
          <p className="bookDescription">{book.volumeInfo.description}</p>
          <button>
            <a
              target="_blank"
              rel="noreferrer"
              className="btn-danger"
              href={book.volumeInfo.previewLink}
            >
              {" "}
              Click to View
            </a>
          </button>
          <button className="likeBtn" onClick={handleLike}>
            Click to Save
          </button>
          <img
            className="bookImage"
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.title}
          />
        </div>
      ))}
    </div>
  );
}

export default BookContainer;
