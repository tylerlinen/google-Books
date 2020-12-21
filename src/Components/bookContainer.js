import React, { useState } from "react";
import axios from "axios";

function BookContainer() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState(
    "AIzaSyBUSt-pAfV59egTuzz7n0GlgB3x3ghSX9k"
  );

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
  const likeBook = () => {
    console.log("clicked");
  };

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
          <button onClick={likeBook}>Click to Save</button>
          <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
        </div>
      ))}
    </div>
  );
}

export default BookContainer;
