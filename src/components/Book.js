import React, {Component} from 'react';

class Book extends Component {

    onShelfChanged(book, shelf) {
        this.props.refreshShelf(book, shelf);
    }

    render() {
        const {
            book,
            book: {
                title,
                description,
                authors = [],
                imageLinks = {},
                shelf
            }
        } = this.props;

        return (
            <div className="book" title={description}>
                <div className="book-inner">
                    <div
                        className="book-image"
                        style={{backgroundImage: `url("${imageLinks.thumbnail}")`}}></div>
                    <div className="book-shelf-selector">
                        <select
                            value={shelf || null}
                            onChange={({
                                           target: {
                                               value
                                           }
                                       }) => this.onShelfChanged(book, value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                        </select>
                    </div>
                </div>
                <div className="book-title-container">{title}</div>
                <div className="authors-container">{authors.join(', ')}</div>
            </div>
        );
    }
}

export default Book;