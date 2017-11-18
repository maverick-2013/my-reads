import React from 'react';
import {Link} from 'react-router-dom';

import Shelf from '../components/Shelf';

const splitBooksByShelf = (books = []) => books.reduce((array, book) => {
    array[book.shelf] = array[book.shelf] || [];
    array[book.shelf].push(book);
    return array;
}, {});

const MainPage = ({books, refreshShelf}) => {
    const splittedBooks = splitBooksByShelf(books);

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {Object
                        .keys(splittedBooks)
                        .map((key) => <Shelf
                            key={key}
                            title={key}
                            books={splittedBooks[key]}
                            refreshShelf={refreshShelf}/>)}
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
};

export default MainPage;