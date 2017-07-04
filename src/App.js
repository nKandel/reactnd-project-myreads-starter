import React from 'react'
import {Route} from 'react-router-dom';

import AddBook from './AddBook'
import * as BookAPI from './BooksAPI'
import ListBooks from './ListBooks'
import './App.css'

class App extends React.Component {
    state = {
        books: []
    };

    componentWillMount() {
        BookAPI.getAll().then((books) => {
                this.setState({books});
            },
            (error) => {
                console.log("Error on retrieving all books: ", error)
            })
    }

    onChangeState = (book, shelf) => {
        BookAPI.update(book, shelf).then(() => {
            const book_updated = {...book, shelf: shelf};
            const books = [...this.state.books.filter((bk) => bk.id !== book.id), book_updated];
            this.setState({books});
        });

    };

    render() {
        return (
                <div className="app">
                    <Route exact path="/" render={() => (
                        <ListBooks
                            books={this.state.books}
                            onChangeState={this.onChangeState}/>
                    )}/>
                    <Route path="/search" render={() => (
                        <AddBook
                            onChangeState={this.onChangeState}/>
                    )}/>
                </div>
        )
    }
}

export default App
