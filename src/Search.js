import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'
import Shelf from './Shelf';

class Search extends Component {

  state = {
    query: '',
    searchText: '',
    searchResults: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.updateQuery('');
  }

  searchForBooks = (query) => {
    BooksAPI.search(query)
      .then((books) => {
        console.log(books);
        if (!books.error) {
          books.sort(sortBy('title'));
          this.setState({ searchResults : books });
        }
        else {
          this.setState({ searchText : 'No results found'});
        }
      })
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log(this.state.query);
      this.searchForBooks(this.state.query);
    }
  }

  render() {
    const { onShelfChange } = this.props;
    const { query, searchText, searchResults } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
            <input 
              type="text"
              placeholder="Search by title or author" 
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
              onKeyPress={(event) => this._handleKeyPress(event)}
            />

          </div>
        </div>
        <div className="search-books-results">
          {/* <ol className="books-grid"></ol> */}
          {searchResults.length > 0 ? (
            <Shelf books={searchResults} shelfName={'Search Results'} shelfType={'move'} onShelfChange={onShelfChange}/>
          ) : (
            <div>{searchText}</div>
          )}
          
        </div>
      </div>
    )
  }
}

export default Search