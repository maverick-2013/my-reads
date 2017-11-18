import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {search} from '../BooksAPI';
import Shelf from '../components/Shelf';

class SearchPage extends Component {
    state = {
        searchResult: []
    };

    componentWillReceiveProps({books}) {
        if (books !== this.props.books) {
            this.handleSearchResults(books, this.state.searchResult);
        }
    }

    onTextChanged(ev) {
        search(ev.currentTarget.value)
            .then((results) => {
                this.handleSearchResults(this.props.books, results)
            });
    }


    handleSearchResults(books, results) {
        this.setState({
            searchResult: Array.isArray(results)
                ? results.map((book) => {
                    return this.findBookById(books, book.id)
                        ? {
                            ...book,
                            shelf: this.findBookById(books, book.id).shelf
                        }
                        : book
                })
                : []
        });
    }

    findBookById(books, bookId) {
        return books.find((item) => item['id'] === bookId);
    }

    render() {
        const onTextChanged = this
            .onTextChanged
            .bind(this);

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={onTextChanged}/>
                    </div>
                </div>
                <div className="search-results">
                    <Shelf
                        title={'Search results'}
                        books={this.state.searchResult}
                        refreshShelf={this.props.refreshShelf}/>
                </div>
            </div>
        );
    }
}

export default SearchPage;