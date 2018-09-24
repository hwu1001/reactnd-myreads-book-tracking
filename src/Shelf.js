import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Shelf extends Component {
  render() {
    const { books, shelfName, shelfType, onShelfChange } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <Book book={book} key={book.id} bookStatus={shelfType} onShelfChange={onShelfChange}/>
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
  shelfType: PropTypes.string.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default Shelf