import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'
import Shelf from './Shelf';

/**
* @description Represents a search page
*/
class Search extends Component {

  state = {
    query: '',
    searchText: '',
    searchResults: []
  }

  /**
  * @description Handles when the query string is updated by the user
  * @param {string} query - The query string input by the user
  * @param {string} author - The author of the book
  * @return {undefined}
  */
  updateQuery = (query) => {
    console.log(query);
    this.setState({ query: query })
    this.searchForBooks(query);
  }

  /**
  * @description Calls the API with the query string and updates the search page's state
  * @param {string} query - The query string input by the user
  * @returns {undefined}
  */
  searchForBooks = (query) => {
    // If there's no query don't call the API and
    // update state to get a repaint to let the user know
    if (!query) {
      this.setState({ searchResults: [] });
      this.setState({ searchText: '' });
      return;
    }
    BooksAPI.search(query)
      .then((books) => {
        if (books && !books.error) {
          books.sort(sortBy('title'));
          this.setState({ searchResults: books });
        }
        else {
          // On error or if the search results in no matches, then reset searchResults
          // and let the user know
          this.setState({ searchResults: [] });
          this.setState({ searchText: 'No results found' });
        }
      })
      .catch(() => {
        this.setState({ searchText: 'Could not return results from the database' });
      })
  }

  /**
  * @description Renders the search page
  * @returns {undefined}
  */
  render() {
    const { booksAndShelves, onShelfChange } = this.props;
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
            />

          </div>
        </div>
        <div className="search-books-results">
          {searchResults.length > 0 ? (
            <Shelf books={searchResults} shelfName={'Search Results'} shelfType={'move'} booksAndShelves={booksAndShelves} onShelfChange={onShelfChange} />
          ) : (
              <div>{searchText}</div>
            )}

        </div>
      </div>
    )
  }
}

Search.propTypes = {
  // An object where the key is the book identifier and the value is the shelf the book belongs on (e.g., 'read')
  booksAndShelves: PropTypes.object,
  // Callback function used to update book's shelf in Book component
  onShelfChange: PropTypes.func.isRequired,
}

export default Search