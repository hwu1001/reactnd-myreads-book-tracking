import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import sortBy from 'sort-by'

/**
* @description Represents a book shelf
*/
class Shelf extends Component {
  /**
  * @description Renders the shelf component
  * @returns {undefined}
  */
  render() {
    const { books, shelfName, shelfType, booksAndShelves, onShelfChange } = this.props;
    books.sort(sortBy('title'));
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <Book book={book} key={book.id} bookStatus={shelfType} booksAndShelves={booksAndShelves} onShelfChange={onShelfChange} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

Shelf.propTypes = {
  // Array of objects that represent a book to display
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
  // The name the shelf should display (e.g., 'Read')
  shelfName: PropTypes.string.isRequired,
  // Similar to the shelfName but used as a value to identify a book's status (e.g., 'wantToRead')
  shelfType: PropTypes.string.isRequired,
  // An object where the key is the book identifier and the value is the shelf the book belongs on (e.g., 'read')
  booksAndShelves: PropTypes.object,
  // Callback function used to update book's shelf in Book component
  onShelfChange: PropTypes.func.isRequired,
};

export default Shelf