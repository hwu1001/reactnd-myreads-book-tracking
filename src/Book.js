import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  render() {
    const { book, bookStatus, onShelfChange } = this.props;
    const style = {
      width: 128,
      height: 193,
      backgroundImage: `url("${book.imageLinks.thumbnail}")`,
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
                value={bookStatus} 
                onChange={(event) => onShelfChange(event.target.value, book.id)}
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
          {book.authors.map((author) => (
            <div key={author} className="book-authors">{author}</div>
          ))}
        </div>
      </li>
    );
  }
}

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    imageLinks: PropTypes.shape({
      smallThumbnail: PropTypes.string,
      thumbnail: PropTypes.string.isRequired,
    }),
    id: PropTypes.string.isRequired,
  }).isRequired,
  bookStatus: PropTypes.string.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default Book