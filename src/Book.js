import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
* @description Represents a book
*/
class Book extends Component {
  state = {
    shelfType: '',
  }

  /**
  * @description Calls the API with the query string and updates the search page's state
  * @param {string} shelfType - One of the designated shelf types ('read', 'wantToRead', 'currentlyReading')
  * @param {function} onShelfChangeCb - Callback function used to update book's shelf in Book component
  * @param {object} book - The book being updated
  * @returns {undefined}
  */
  _handleShelfChange = (shelfType, onShelfChangeCb, book) => {
    onShelfChangeCb(shelfType, book); // App.updateBook
    this.setState({ shelfType: shelfType });
  }

  /**
  * @description Renders the book component
  * @returns {undefined}
  */
  render() {
    const { book, bookStatus, booksAndShelves, onShelfChange } = this.props;
    const { shelfType } = this.state;
    const style = {
      width: 128,
      height: 193,
      // Just use simple placeholder if we don't have an image
      backgroundImage: (book.imageLinks && book.imageLinks.thumbnail) ? `url("${book.imageLinks.thumbnail}")` : 'https://via.placeholder.com/130x200',
    }

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={style}>
            </div>
            <div className="book-shelf-changer">
              {/* https://reactjs.org/docs/forms.html */}
              <select
                // For the value of select it's either 
                // 1) the book's shelf is already known
                // 2) we're setting it right now with the state, or 
                // 3) it's not set so the shelf tells us what it is
                value={booksAndShelves[book.id] || shelfType || bookStatus}
                onChange={(event) => this._handleShelfChange(event.target.value, onShelfChange, book)}
              >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors && book.authors.map((author) => (
            <div key={author} className="book-authors">{author}</div>
          ))}
        </div>
      </li>
    );
  }
}

Book.propTypes = {
  // Object that represent a book to display
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    authors: PropTypes.array, // this isn't always returned in the API
    imageLinks: PropTypes.shape({
      smallThumbnail: PropTypes.string,
      thumbnail: PropTypes.string,
    }),
    id: PropTypes.string.isRequired,
  }).isRequired,
  // Used as a value to identify which shelf a book goes on (e.g., 'wantToRead')
  bookStatus: PropTypes.string.isRequired,
  // An object where the key is the book identifier and the value is the shelf the book belongs on (e.g., 'read')
  booksAndShelves: PropTypes.object,
  // Callback function used to update book's shelf in Book component
  onShelfChange: PropTypes.func.isRequired,
};

export default Book