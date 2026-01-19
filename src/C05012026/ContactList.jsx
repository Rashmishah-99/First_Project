// Create contactlist.jsx
// Import and use in app.jsx
// add contacts , edit contacts, delete contacts
// observe array state management with objects updates
import React, { Component } from 'react';
import './contactlist.css';

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            nameInput: '',
            phoneInput: '',
            editingId: null,
            editName: '',
            editPhone: '',
        };
    }
    
    addContact = () => {
        if (this.state.nameInput.trim() === '' || this.state.phoneInput.trim() === '') {
            alert('Please enter both name and phone number');
            return;
        }
        const newContact = {id: Date.now(), name: this.state.nameInput, phone: this.state.phoneInput};
        this.setState((prevState) => ({
            contacts: [newContact, ...prevState.contacts],
            nameInput: '',
            phoneInput: '',
        }));
    };

    deleteContact = (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            this.setState((prevState) => ({
                contacts: prevState.contacts.filter(contact => contact.id !== id),
            }));
        }
    };

    handleNameChange = (e) => {
        this.setState({nameInput: e.target.value});         
    };
    handlePhoneChange = (e) => {
        this.setState({phoneInput: e.target.value});         
    };

    // Edit handlers
    startEdit = (contact) => {
        this.setState({editingId: contact.id, editName: contact.name, editPhone: contact.phone});
    };

    handleEditNameChange = (e) => {
        this.setState({editName: e.target.value});
    };

    handleEditPhoneChange = (e) => {
        this.setState({editPhone: e.target.value});
    };

    saveEdit = (id) => {
        const {editName, editPhone} = this.state;
        if (editName.trim() === '' || editPhone.trim() === '') {
            alert('Please enter both name and phone number');
            return;
        }
        this.setState((prevState) => ({
            contacts: prevState.contacts.map(c => c.id === id ? {...c, name: editName, phone: editPhone} : c),
            editingId: null,
            editName: '',
            editPhone: '',
        }));
    };

    cancelEdit = () => {
        this.setState({editingId: null, editName: '', editPhone: ''});
    };

    render() {
        const {contacts, nameInput, phoneInput, editingId, editName, editPhone} = this.state;
        
        return (
            <div className="contact-app">
                {/* Header */}
                <div className="app-header">
                    <h1>📱 Contact Manager</h1>
                    <div className="contact-count">
                        {contacts.length} contact{contacts.length !== 1 ? 's' : ''}
                    </div>
                </div>

                <div className="app-container">
                    {/* Add Contact Form */}
                    <div className="add-contact-section">
                        <h2 className="section-title">➕ Add New Contact</h2>
                        <div className="form-row">
                            <input 
                                className="input-field" 
                                type="text" 
                                placeholder="Enter Name *" 
                                value={nameInput} 
                                onChange={this.handleNameChange} 
                            />
                            <input 
                                className="input-field" 
                                type="tel" 
                                placeholder="Enter Phone *" 
                                value={phoneInput} 
                                onChange={this.handlePhoneChange} 
                            />
                        </div>
                        <button className="add-btn" onClick={this.addContact}>
                            <span className="btn-icon">➕</span> Add Contact
                        </button>
                        
                        {contacts.length > 0 && (
                            <div className="stats-box">
                                <div className="stat-item">
                                    <span className="stat-icon">📊</span>
                                    <span className="stat-text">{contacts.length} contacts</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Contact List */}
                    <div className="contact-list-section">
                        <h2 className="section-title">👥 Contact List</h2>
                        
                        {contacts.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">📞</div>
                                <h3>No contacts yet</h3>
                                <p>Add your first contact using the form</p>
                            </div>
                        ) : (
                            <div className="contacts-grid">
                                {contacts.map((contact) => (
                                    <div key={contact.id} className="contact-card">
                                        <div className="contact-avatar">
                                            {contact.name.charAt(0).toUpperCase()}
                                        </div>
                                        
                                        {editingId === contact.id ? (
                                            <div className="edit-mode">
                                                <div className="edit-inputs">
                                                    <input 
                                                        className="edit-field"
                                                        type="text"
                                                        value={editName}
                                                        onChange={this.handleEditNameChange}
                                                        placeholder="Name"
                                                    />
                                                    <input 
                                                        className="edit-field"
                                                        type="tel"
                                                        value={editPhone}
                                                        onChange={this.handleEditPhoneChange}
                                                        placeholder="Phone"
                                                    />
                                                </div>
                                                <div className="edit-actions">
                                                    <button 
                                                        className="save-btn"
                                                        onClick={() => this.saveEdit(contact.id)}
                                                        title="Save"
                                                    >
                                                        <span className="action-icon">✅</span> Save
                                                    </button>
                                                    <button 
                                                        className="cancel-btn"
                                                        onClick={this.cancelEdit}
                                                        title="Cancel"
                                                    >
                                                        <span className="action-icon">❌</span> Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="contact-info">
                                                    <h3 className="contact-name">{contact.name}</h3>
                                                    <p className="contact-phone">📞 {contact.phone}</p>
                                                </div>
                                                <div className="contact-actions">
                                                    <button 
                                                        className="edit-btn"
                                                        onClick={() => this.startEdit(contact)}
                                                        title="Edit Contact"
                                                    >
                                                        <span className="action-icon">✏️</span> Edit
                                                    </button>
                                                    <button 
                                                        className="delete-btn"
                                                        onClick={() => this.deleteContact(contact.id)}
                                                        title="Delete Contact"
                                                    >
                                                        <span className="action-icon">🗑️</span> Delete
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="app-footer">
                    <p>Contact Manager • {contacts.length} contacts • Made with ❤️</p>
                </div>
            </div>
        );
    }
}
export default ContactList;