import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import toastr from 'toastr';

import * as BooksAPI from './BooksAPI';
import BookTemplate from './BookTemplate';


class AddBook extends Component {
    state = {
        books: [],
        query: ''
    };

    static propTypes = {
        onChangeState: PropTypes.func.isRequired
    };

    perform_search = (query) => {
        if (query) {
            BooksAPI.search(query.trim(), 20).then((books) => {
                if (!books.error) {
                    this.setState({books})
                }
            })
        }
    };

    updateQuery = (query) => {
        this.setState({query: query});
        this.perform_search(query)
    };

    addBook = (book, shelf) => {
        this.props.onChangeState(book, shelf);
        this.setState({books: this.state.books.filter((bok) => bok.id !== book.id)});
        toastr.success("Book added to library")
    };

    render() {
        const {books, query} = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map((book, index) => (
                            <BookTemplate
                                index={index}
                                book={book}
                                onChangeState={this.addBook}/>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default AddBook;