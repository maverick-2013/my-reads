import React from 'react';
import {Route} from 'react-router-dom';

import './App.css';
import SearchPage from './pages/SearchPage';
import MainPage from './pages/MainPage';
import {getAll, update} from './BooksAPI';


class App extends React.Component {
    state = {
        books: []
    };

    getShelfContent(books, id, properties) {
        return books.map((item) => item.id !== id ? item : {
            ...item,
            ...properties
        });
    }

    componentWillMount() {
        getAll().then((books) => this.setState({books}));
    }

    refreshShelf = (book, shelf) => {

        this.setState({
            books: this.getShelfContent(this.state.books, book.id, {shelf})
        });
        update(book, shelf).catch(() => this.setState({
            books: this.getShelfContent(this.state.books, book.id, {shelf: book.shelf})
        }));
    };

    render() {
        return (
            <div className="app">
                <Route
                    exact
                    path='/'
                    render={() => <MainPage books={this.state.books} refreshShelf={this.refreshShelf}/>}/>
                <Route
                    path='/search'
                    render={() => <SearchPage books={this.state.books} refreshShelf={this.refreshShelf}/>}/>
            </div>
        )
    }
}

export default App
