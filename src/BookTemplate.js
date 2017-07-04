import React from 'react'
import PropTypes from 'prop-types';

class BookTemplate extends React.Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onChangeState: PropTypes.func.isRequired
    };

    render() {
        const {book, onChangeState} = this.props;

        return (
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail})`
                        }}>
                        </div>
                        <div className="book-shelf-changer">
                            <select
                                onChange={(event) => onChangeState(book, event.target.value)}
                                value={book.shelf}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        )
    }
}

export default BookTemplate
