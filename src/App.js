import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Search from './Search'

/**
* @description Represents the entire Book App handler
*/
class BooksApp extends React.Component {
  state = {
    // This is the data structure returned from BooksAPI.getAll()
    // It's an array of objects
    books: [],
    // This is an object where the key is the book ID from the API
    // and the value is the shelf it belongs on - 'currentlyReading',
    // 'wantToRead', or 'read'
    bookIdsAndShelf: {},
  }

  /**
  * @description Handles the initial creation of this.state.bookIdsAndShelf
  * @param {Array} booksArray - The array of book objects returned from the getAll() API
  * @returns {object} - An object where key is book identifier and value is shelf type
  */
  _updateBooksAndShelves(booksArray) {
    let temp = {};
    for (const book of booksArray) {
      temp[book.id] = book.shelf;
    }
    return temp;
  }

  /**
  * @description Handles when the Book App mounts on the page
  * @returns {undefined}
  */
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books });
        this.setState({ bookIdsAndShelf: this._updateBooksAndShelves(books) });
      })
      .catch(() => {
        console.log('getAll Api request failed');
      });
  }

  /**
  * @description Handles the initial creation of this.state.bookIdsAndShelf
  * @param {string} shelf - One of the designated shelf types ('read', 'wantToRead', 'currentlyReading')
  * @param {object} changedBook - The book being updated
  * @returns {undefined}
  */
  updateBook = (shelf, changedBook) => {
    const booksCopy = [];
    const IdsShelfCopy = {};
    let inCurrentBooks = false;
    this.state.books.forEach((book) => {
      if (book.id === changedBook.id) {
        book.shelf = shelf;
        inCurrentBooks = true;
      }
      booksCopy.push(book);
      IdsShelfCopy[book.id] = book.shelf;
    });
    if (!inCurrentBooks) {
      changedBook.shelf = shelf;
      booksCopy.push(changedBook);
      IdsShelfCopy[changedBook.id] = shelf;
    }
    // Just log the update for now to compare. The API output here is
    // shelfType: [id1, id2, etc.], where shelfType is 'currentlyReading', 'read', 'wantToRead'
    BooksAPI.update(changedBook, shelf)
      .then((books) => {
        // console.log(books);
        // Letting the server know the update, but don't need the return data for local storage
      })
      .catch(() => {
        console.log('update Api call failed');
      })
    this.setState({ books: booksCopy });
    this.setState({ bookIdsAndShelf: IdsShelfCopy });
  }

  /**
  * @description Renders the initial Book App component
  * @returns {undefined}
  */
  render() {
    // Ideally these display names would come from the server but we'll hardcode them for now
    const shelves = {
      'currentlyReading': 'Currently Reading',
      'wantToRead': 'Want To Read',
      'read': 'Read',
    };
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path='/' render={() => (
            this.state.books.length > 0 ? (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    {/* https://stackoverflow.com/a/47402440 */}
                    {Object.keys(shelves).map((k) => {
                      return (
                        <Shelf
                          books={this.state.books.filter((b) => b.shelf === k)}
                          shelfName={shelves[k]}
                          shelfType={k}
                          booksAndShelves={this.state.bookIdsAndShelf}
                          onShelfChange={this.updateBook}
                          key={k}
                        />
                      )
                    })}
                  </div>
                </div>
                <div className="open-search">
                  <Link to='/search'>Add a book</Link>
                </div>
              </div>
            ) : (
                <div>No books available or cannot return data from the server.</div>
              )
          )} />
          <Route path='/search' render={({ history }) => (
            <Search booksAndShelves={this.state.bookIdsAndShelf} onShelfChange={this.updateBook} />
          )} />
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
