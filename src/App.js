import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'

// TODOs
// Implement router
// Add search page
// Implement shelf changer component
// Look into form serializer for state changes on books
// Handle searches with API

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
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
    this.state.books.forEach((book) => {
      if (book.id === changedBook.id) {
        book.shelf = shelf;
      }
      copy.push(book);
    });
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
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
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
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
