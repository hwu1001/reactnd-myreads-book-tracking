import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Search from './Search'

// TODOs
// Handle searches with API
// Handle state between search page and main page (needs to be in sync)
// Change data model for client to hold information for each bucket? (Need to use in search - there's no shelf returned in search API)

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],

  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books });
      })
      .catch(() => {
        console.log('getAll Api request failed');
      });
  }

  updateBook = (shelf, changedBook) => {
    const copy = [];
    let inCurrentBooks = false;
    this.state.books.forEach((book) => {
      if (book.id === changedBook.id) {
        book.shelf = shelf;
        inCurrentBooks = true;
      }
      copy.push(book);
    });
    if (!inCurrentBooks) {
      copy.push(changedBook);
    }
    // Just log the update for now to compare. The API output here is
    // shelfType: [id1, id2, etc.], where shelfType is 'currentlyReading', 'read', 'wantToRead'
    BooksAPI.update(changedBook, shelf)
      .then((books) => {
        console.log(books);
      })
      .catch(() => {
        console.log('update Api call failed');
      })
    this.setState(() => ({ books: copy }));
  }

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
          )} />
          <Route path='/search' render={({ history }) => (
            <Search onShelfChange={this.updateBook} />
          )} />
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
