import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import sortBy from 'sort-by'

class Shelf extends Component {
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
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
  shelfName: PropTypes.string.isRequired,
  shelfType: PropTypes.string.isRequired,
  booksAndShelves: PropTypes.object,
  onShelfChange: PropTypes.func.isRequired,
};

export default Shelf