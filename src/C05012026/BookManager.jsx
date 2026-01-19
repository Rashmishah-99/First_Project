import React, { Component } from 'react';
import './bookmanager.css';

class BookManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            title: '',
            author: '',
            isbn: '',
            year: '',
            genre: '',
            editingId: null,
            editTitle: '',
            editAuthor: '',
            editIsbn: '',
            editYear: '',
            editGenre: '',
            searchTerm: '',
            selectedGenre: 'all',
            sortBy: 'title',
            showForm: true
        };
    }

    // Handle input changes for add form
    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    // Handle input changes for edit form
    handleEditInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    // Add new book
    addBook = () => {
        const { title, author, isbn, year, genre } = this.state;
        
        if (!title.trim() || !author.trim() || !isbn.trim()) {
            alert('Please fill in Title, Author, and ISBN fields');
            return;
        }

        const newBook = {
            id: Date.now(),
            title,
            author,
            isbn,
            year: year || 'N/A',
            genre: genre || 'General',
            addedDate: new Date().toLocaleDateString()
        };

        this.setState(prevState => ({
            books: [newBook, ...prevState.books],
            title: '',
            author: '',
            isbn: '',
            year: '',
            genre: ''
        }));
    };

    // Delete book with confirmation
    deleteBook = (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            this.setState(prevState => ({
                books: prevState.books.filter(book => book.id !== id)
            }));
        }
    };

    // Start editing a book
    startEdit = (book) => {
        this.setState({
            editingId: book.id,
            editTitle: book.title,
            editAuthor: book.author,
            editIsbn: book.isbn,
            editYear: book.year,
            editGenre: book.genre,
            showForm: false
        });
    };

    // Save edited book
    saveEdit = () => {
        const { editingId, editTitle, editAuthor, editIsbn, editYear, editGenre } = this.state;
        
        if (!editTitle.trim() || !editAuthor.trim() || !editIsbn.trim()) {
            alert('Please fill in Title, Author, and ISBN fields');
            return;
        }

        this.setState(prevState => ({
            books: prevState.books.map(book =>
                book.id === editingId
                    ? {
                        ...book,
                        title: editTitle,
                        author: editAuthor,
                        isbn: editIsbn,
                        year: editYear || 'N/A',
                        genre: editGenre || 'General'
                    }
                    : book
            ),
            editingId: null,
            editTitle: '',
            editAuthor: '',
            editIsbn: '',
            editYear: '',
            editGenre: '',
            showForm: true
        }));
    };

    // Cancel editing
    cancelEdit = () => {
        this.setState({
            editingId: null,
            editTitle: '',
            editAuthor: '',
            editIsbn: '',
            editYear: '',
            editGenre: '',
            showForm: true
        });
    };

    // Clear all books with confirmation
    clearAllBooks = () => {
        if (window.confirm('Are you sure you want to delete ALL books? This action cannot be undone.')) {
            this.setState({ books: [] });
        }
    };

    // Clear add form
    clearForm = () => {
        this.setState({
            title: '',
            author: '',
            isbn: '',
            year: '',
            genre: ''
        });
    };

    // Toggle form visibility
    toggleForm = () => {
        this.setState(prevState => ({ showForm: !prevState.showForm }));
    };

    // Get filtered and sorted books
    getFilteredBooks = () => {
        const { books, searchTerm, selectedGenre, sortBy } = this.state;
        
        let filtered = books;

        // Filter by search term
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(book =>
                book.title.toLowerCase().includes(term) ||
                book.author.toLowerCase().includes(term) ||
                book.isbn.includes(term) ||
                book.genre.toLowerCase().includes(term)
            );
        }

        // Filter by genre
        if (selectedGenre !== 'all') {
            filtered = filtered.filter(book => book.genre === selectedGenre);
        }

        // Sort books
        switch (sortBy) {
            case 'title':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'author':
                filtered.sort((a, b) => a.author.localeCompare(b.author));
                break;
            case 'year':
                filtered.sort((a, b) => (b.year || '0').localeCompare(a.year || '0'));
                break;
            case 'dateAdded':
                filtered.sort((a, b) => b.id - a.id); // Using ID as proxy for date added
                break;
            default:
                break;
        }

        return filtered;
    };

    // Get all unique genres from books
    getGenres = () => {
        const genres = new Set(this.state.books.map(book => book.genre));
        return ['all', ...Array.from(genres)].sort();
    };

    // Calculate statistics
    getStats = () => {
        const { books } = this.state;
        const genres = {};
        
        books.forEach(book => {
            genres[book.genre] = (genres[book.genre] || 0) + 1;
        });

        const mostCommonGenre = Object.keys(genres).length > 0
            ? Object.keys(genres).reduce((a, b) => genres[a] > genres[b] ? a : b)
            : 'None';

        return {
            total: books.length,
            genres: Object.keys(genres).length,
            mostCommonGenre
        };
    };

    render() {
        const {
            title, author, isbn, year, genre,
            editingId, editTitle, editAuthor, editIsbn, editYear, editGenre,
            searchTerm, selectedGenre, sortBy, showForm
        } = this.state;

        const filteredBooks = this.getFilteredBooks();
        const stats = this.getStats();
        const genres = this.getGenres();

        return (
            <div className="book-manager">
                {/* Header */}
                <header className="book-header">
                    <div className="header-content">
                        <h1 className="app-title">
                            <span className="book-icon">📚</span>
                            Book Manager
                        </h1>
                        <div className="header-stats">
                            <span className="stat-badge">
                                <span className="stat-number">{stats.total}</span>
                                <span className="stat-label">Books</span>
                            </span>
                            <span className="stat-badge">
                                <span className="stat-number">{stats.genres}</span>
                                <span className="stat-label">Genres</span>
                            </span>
                        </div>
                    </div>
                </header>

                <main className="book-main">
                    {/* Left Panel - Form & Stats */}
                    <div className="left-panel">
                        {/* Toggle Button */}
                        <button
                            className="toggle-form-btn"
                            onClick={this.toggleForm}
                        >
                            <span className="toggle-icon">
                                {showForm ? '📖' : '✏️'}
                            </span>
                            {showForm ? 'View Books' : 'Add New Book'}
                        </button>

                        {/* Add/Edit Form */}
                        {showForm ? (
                            <div className="form-card">
                                <h2 className="form-title">
                                    <span className="form-icon">➕</span>
                                    Add New Book
                                </h2>
                                
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">
                                            <span className="required">*</span> Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={title}
                                            onChange={this.handleInputChange}
                                            placeholder="Enter book title"
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            <span className="required">*</span> Author
                                        </label>
                                        <input
                                            type="text"
                                            name="author"
                                            value={author}
                                            onChange={this.handleInputChange}
                                            placeholder="Enter author name"
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            <span className="required">*</span> ISBN
                                        </label>
                                        <input
                                            type="text"
                                            name="isbn"
                                            value={isbn}
                                            onChange={this.handleInputChange}
                                            placeholder="Enter ISBN number"
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Year</label>
                                        <input
                                            type="number"
                                            name="year"
                                            value={year}
                                            onChange={this.handleInputChange}
                                            placeholder="Publication year"
                                            className="form-input"
                                            min="1000"
                                            max="2024"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Genre</label>
                                        <select
                                            name="genre"
                                            value={genre}
                                            onChange={this.handleInputChange}
                                            className="form-select"
                                        >
                                            <option value="">Select Genre</option>
                                            <option value="Fiction">Fiction</option>
                                            <option value="Non-Fiction">Non-Fiction</option>
                                            <option value="Science Fiction">Science Fiction</option>
                                            <option value="Fantasy">Fantasy</option>
                                            <option value="Mystery">Mystery</option>
                                            <option value="Romance">Romance</option>
                                            <option value="Biography">Biography</option>
                                            <option value="History">History</option>
                                            <option value="Self-Help">Self-Help</option>
                                            <option value="Technology">Technology</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button className="primary-btn" onClick={this.addBook}>
                                        <span className="btn-icon">📥</span>
                                        Add Book
                                    </button>
                                    <button className="secondary-btn" onClick={this.clearForm}>
                                        <span className="btn-icon">🗑️</span>
                                        Clear Form
                                    </button>
                                </div>

                                {/* Quick Stats */}
                                <div className="quick-stats">
                                    <h3 className="stats-title">
                                        <span className="stats-icon">📊</span>
                                        Quick Stats
                                    </h3>
                                    <div className="stats-grid">
                                        <div className="stat-card">
                                            <div className="stat-value">{stats.total}</div>
                                            <div className="stat-name">Total Books</div>
                                        </div>
                                        <div className="stat-card">
                                            <div className="stat-value">{stats.genres}</div>
                                            <div className="stat-name">Genres</div>
                                        </div>
                                        <div className="stat-card">
                                            <div className="stat-value">{stats.mostCommonGenre}</div>
                                            <div className="stat-name">Top Genre</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Edit Form */
                            <div className="form-card edit-form-card">
                                <h2 className="form-title">
                                    <span className="form-icon">✏️</span>
                                    Edit Book
                                </h2>
                                
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">
                                            <span className="required">*</span> Title
                                        </label>
                                        <input
                                            type="text"
                                            name="editTitle"
                                            value={editTitle}
                                            onChange={this.handleEditInputChange}
                                            placeholder="Enter book title"
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            <span className="required">*</span> Author
                                        </label>
                                        <input
                                            type="text"
                                            name="editAuthor"
                                            value={editAuthor}
                                            onChange={this.handleEditInputChange}
                                            placeholder="Enter author name"
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            <span className="required">*</span> ISBN
                                        </label>
                                        <input
                                            type="text"
                                            name="editIsbn"
                                            value={editIsbn}
                                            onChange={this.handleEditInputChange}
                                            placeholder="Enter ISBN number"
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Year</label>
                                        <input
                                            type="number"
                                            name="editYear"
                                            value={editYear}
                                            onChange={this.handleEditInputChange}
                                            placeholder="Publication year"
                                            className="form-input"
                                            min="1000"
                                            max="2024"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Genre</label>
                                        <select
                                            name="editGenre"
                                            value={editGenre}
                                            onChange={this.handleEditInputChange}
                                            className="form-select"
                                        >
                                            <option value="">Select Genre</option>
                                            <option value="Fiction">Fiction</option>
                                            <option value="Non-Fiction">Non-Fiction</option>
                                            <option value="Science Fiction">Science Fiction</option>
                                            <option value="Fantasy">Fantasy</option>
                                            <option value="Mystery">Mystery</option>
                                            <option value="Romance">Romance</option>
                                            <option value="Biography">Biography</option>
                                            <option value="History">History</option>
                                            <option value="Self-Help">Self-Help</option>
                                            <option value="Technology">Technology</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button className="save-btn" onClick={this.saveEdit}>
                                        <span className="btn-icon">💾</span>
                                        Save Changes
                                    </button>
                                    <button className="cancel-btn" onClick={this.cancelEdit}>
                                        <span className="btn-icon">❌</span>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Danger Zone */}
                        {this.state.books.length > 0 && (
                            <div className="danger-zone">
                                <h3 className="danger-title">
                                    <span className="danger-icon">⚠️</span>
                                    Danger Zone
                                </h3>
                                <button className="danger-btn" onClick={this.clearAllBooks}>
                                    <span className="btn-icon">🔥</span>
                                    Delete All Books
                                </button>
                                <p className="danger-note">
                                    This will permanently delete all books and cannot be undone.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Panel - Book List */}
                    <div className="right-panel">
                        {/* Controls Bar */}
                        <div className="controls-bar">
                            <div className="search-box">
                                <span className="search-icon">🔍</span>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => this.setState({ searchTerm: e.target.value })}
                                    placeholder="Search books..."
                                    className="search-input"
                                />
                                {searchTerm && (
                                    <button
                                        className="clear-search-btn"
                                        onClick={() => this.setState({ searchTerm: '' })}
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            <div className="filter-controls">
                                <select
                                    value={selectedGenre}
                                    onChange={(e) => this.setState({ selectedGenre: e.target.value })}
                                    className="filter-select"
                                >
                                    <option value="all">All Genres</option>
                                    {genres.filter(g => g !== 'all').map(genre => (
                                        <option key={genre} value={genre}>{genre}</option>
                                    ))}
                                </select>

                                <select
                                    value={sortBy}
                                    onChange={(e) => this.setState({ sortBy: e.target.value })}
                                    className="sort-select"
                                >
                                    <option value="title">Sort by Title</option>
                                    <option value="author">Sort by Author</option>
                                    <option value="year">Sort by Year (Newest)</option>
                                    <option value="dateAdded">Sort by Date Added</option>
                                </select>
                            </div>
                        </div>

                        {/* Books List */}
                        <div className="books-container">
                            <div className="books-header">
                                <h3 className="books-title">
                                    <span className="books-icon">📖</span>
                                    Book Collection ({filteredBooks.length})
                                </h3>
                                <div className="books-info">
                                    Showing {filteredBooks.length} of {this.state.books.length} books
                                </div>
                            </div>

                            {filteredBooks.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">
                                        {searchTerm || selectedGenre !== 'all' ? '🔍' : '📚'}
                                    </div>
                                    <h3 className="empty-title">
                                        {searchTerm || selectedGenre !== 'all' 
                                            ? 'No books found' 
                                            : 'No books in library'
                                        }
                                    </h3>
                                    <p className="empty-message">
                                        {searchTerm || selectedGenre !== 'all'
                                            ? 'Try adjusting your search or filters'
                                            : 'Add your first book using the form'
                                        }
                                    </p>
                                </div>
                            ) : (
                                <div className="books-grid">
                                    {filteredBooks.map(book => (
                                        <div key={book.id} className="book-card">
                                            <div className="book-card-header">
                                                <div className="book-cover">
                                                    {book.title.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="book-basic-info">
                                                    <h4 className="book-title">{book.title}</h4>
                                                    <p className="book-author">by {book.author}</p>
                                                    <div className="book-meta">
                                                        <span className="book-year">📅 {book.year}</span>
                                                        <span className="book-genre" style={{ 
                                                            backgroundColor: this.getGenreColor(book.genre)
                                                        }}>
                                                            {book.genre}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="book-card-body">
                                                <div className="book-details">
                                                    <div className="detail-row">
                                                        <span className="detail-label">ISBN:</span>
                                                        <span className="detail-value">{book.isbn}</span>
                                                    </div>
                                                    <div className="detail-row">
                                                        <span className="detail-label">Added:</span>
                                                        <span className="detail-value">{book.addedDate}</span>
                                                    </div>
                                                </div>

                                                <div className="book-actions">
                                                    <button
                                                        className="edit-book-btn"
                                                        onClick={() => this.startEdit(book)}
                                                        title="Edit Book"
                                                    >
                                                        <span className="action-icon">✏️</span>
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="delete-book-btn"
                                                        onClick={() => this.deleteBook(book.id)}
                                                        title="Delete Book"
                                                    >
                                                        <span className="action-icon">🗑️</span>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="book-footer">
                    <p className="footer-text">
                        Book Manager • {stats.total} books • {stats.genres} genres • Made with ❤️ for book lovers
                    </p>
                </footer>
            </div>
        );
    }

    // Helper function to get genre color
    getGenreColor = (genre) => {
        const colors = {
            'Fiction': '#ff6b6b',
            'Non-Fiction': '#4ecdc4',
            'Science Fiction': '#45b7d1',
            'Fantasy': '#96ceb4',
            'Mystery': '#feca57',
            'Romance': '#ff9ff3',
            'Biography': '#54a0ff',
            'History': '#5f27cd',
            'Self-Help': '#1dd1a1',
            'Technology': '#f368e0',
            'Other': '#8395a7'
        };
        return colors[genre] || '#c8d6e5';
    };
}

export default BookManager;