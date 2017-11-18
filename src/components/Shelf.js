import React from 'react';

import Book from './Book';

const getShelfTitle = (str) => {
    switch (str) {
        case "currentlyReading":
            return "Currently Reading";
        case "wantToRead":
            return "Want To Read";
        case "read":
            return "Read";
        default:
            return "";
    }
};


const Shelf = ({title, books, refreshShelf}) => (
    <div className="shelf">
        <h2 className="shelf-title">{getShelfTitle(title)}</h2>
        <div className="books-container">
            <ol className="books-list">
                {books.map((book) => <li key={book.id}><Book book={book} refreshShelf={refreshShelf}/></li>)}
            </ol>
        </div>
    </div>
);

export default Shelf;