import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles/App.css";
import Header from "./components/Header";
import BookList from "./components/BookList";
import Search from "./components/Search";
import About from "./pages/About";
// import data from "./models/local-books.json";

const App = () => {
  // const [books, setBooks] = useState(data);
  const [books, setBooks] = useState(null);
  const [bookcase, setBookcase] = useState([]);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=jessica`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setBooks(result.items);
      });
  }, []);

  const findBooks = async (value) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${value}&filter=paid-ebooks&print-type=books&projection=lite`;

    const results = await fetch(url).then((res) => res.json()); //res is short for result
    if (!results.error) {
      setBooks(results.items);
      console.log(results.items);
    }
  };

  const addToBookcase = (id) => {
    setBookcase(bookcase.concat(books.filter((book) => book.id === id)));
    setBooks([
      ...books.map((book) => {
        if (book.id === id) {
          book.read = true;
        }
        return book;
      })
    ]);
  };

  const removeFromBookcase = (id) => {
    setBookcase(bookcase.filter((book) => book.id !== id));
    setBooks([
      ...books.map((book) => {
        if (book.id === id) {
          book.read = false;
        }
        return book;
      })
    ]);
  };

  return (
    <Router>
      <div className="container">
        <Route
          exact
          path="/"
          render={() => (
            <Fragment>
              <Header bookLength={bookcase.length} />
              <Search findBooks={findBooks} />
              <BookList
                books={books}
                stored="library"
                addToBookcase={addToBookcase}
                removeFromBookcase={removeFromBookcase}
              />
            </Fragment>
          )}
        />
        <Route
          path="/bookcase"
          render={() => (
            <Fragment>
              <Header bookLength={bookcase.length} />
              <BookList
                books={bookcase}
                stored="bookcase"
                addToBookcase={addToBookcase}
                removeFromBookcase={removeFromBookcase}
              />
            </Fragment>
          )}
        />
        <Route
          path="/about"
          component={() => <About bookLength={bookcase.length} />}
        />
        <Route path="/search " />
      </div>
    </Router>
  );
};

export default App;
