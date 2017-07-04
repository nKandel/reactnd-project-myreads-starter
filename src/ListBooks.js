import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import BookTemplate from './BookTemplate';


class ListBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onChangeState: PropTypes.func.isRequired
    };

    style = (books, title, shelf) => {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.filter((book) => book.shelf === shelf).map((book) => {
                            return <BookTemplate
                                book={book}
                                onChangeState={this.props.onChangeState}/>
                        })}
                    </ol>
                </div>
            </div>
        )
    };

    render() {
        const {books} = this.props;

        return (<div>
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.style(books, `Currently Reding`, `currentlyReading`)}
                        {this.style(books, `Want to Read`, `wantToRead`)}
                        {this.style(books, `Read`, `read`)}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        </div>)
    }
}

export default ListBooks;