import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';

class Shelf extends Component {
  render() {
    const { books, shelfName } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <Book book={book} key={book.id} />
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
  shelfName: PropTypes.string.isRequired, // enum for shelf type
};

export default Shelf