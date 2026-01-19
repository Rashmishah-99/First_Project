import React, { Component } from 'react';

class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      contacts: [], 
      firstname: "", 
      lastname: "", 
      contactno: "",
      email: "",
      isEditing: false,
      editId: null,
      searchTerm: ""
    };
  }

  // Handle input changes
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Add or update contact
  handleSubmit = () => {
    const { firstname, lastname, contactno, email, isEditing, editId, contacts } = this.state;
    
    if (!firstname.trim() || !lastname.trim() || !contactno.trim()) {
      alert("Please fill in all required fields (First Name, Last Name, and Contact Number)");
      return;
    }

    if (isEditing) {
      // Update existing contact
      const updatedContacts = contacts.map(contact =>
        contact.id === editId 
          ? { ...contact, fname: firstname, lname: lastname, contact: contactno, email }
          : contact
      );
      
      this.setState({
        contacts: updatedContacts,
        firstname: "",
        lastname: "",
        contactno: "",
        email: "",
        isEditing: false,
        editId: null
      });
    } else {
      // Add new contact
      const newContact = {
        id: Date.now(),
        fname: firstname,
        lname: lastname,
        contact: contactno,
        email,
        visible: false
      };

      this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts],
        firstname: "",
        lastname: "",
        contactno: "",
        email: ""
      }));
    }
  };

  // Delete contact
  deleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      this.setState(prevState => ({
        contacts: prevState.contacts.filter(contact => contact.id !== id)
      }));
    }
  };

  // Edit contact
  editContact = (contact) => {
    this.setState({
      firstname: contact.fname,
      lastname: contact.lname,
      contactno: contact.contact,
      email: contact.email || "",
      isEditing: true,
      editId: contact.id
    });
  };

  // Toggle contact details visibility
  toggleContactDetails = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.map(contact =>
        contact.id === id ? { ...contact, visible: !contact.visible } : contact
      )
    }));
  };

  // Filter contacts based on search
  getFilteredContacts = () => {
    const { contacts, searchTerm } = this.state;
    if (!searchTerm.trim()) return contacts;

    return contacts.filter(contact =>
      contact.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.contact.includes(searchTerm) ||
      (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  // Clear form
  clearForm = () => {
    this.setState({
      firstname: "",
      lastname: "",
      contactno: "",
      email: "",
      isEditing: false,
      editId: null
    });
  };

  render() {
    const { firstname, lastname, contactno, email, isEditing, searchTerm } = this.state;
    const filteredContacts = this.getFilteredContacts();
    const totalContacts = this.state.contacts.length;

    return (
      <div style={styles.container}>
        {/* Header - Compact */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <h1 style={styles.title}>📱 Contact Book</h1>
            <div style={styles.statsBadge}>
              {totalContacts} contact{totalContacts !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Main Content - Compact Layout */}
        <div style={styles.mainWrapper}>
          {/* Left Side - Form */}
          <div style={styles.leftPanel}>
            <div style={styles.formSection}>
              <h2 style={styles.sectionTitle}>
                {isEditing ? "✏️ Edit Contact" : "➕ Add Contact"}
              </h2>
              
              <div style={styles.inputGroup}>
                <input
                  type="text"
                  name="firstname"
                  value={firstname}
                  onChange={this.handleInputChange}
                  placeholder="First Name *"
                  style={styles.inputField}
                />
              </div>

              <div style={styles.inputGroup}>
                <input
                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={this.handleInputChange}
                  placeholder="Last Name *"
                  style={styles.inputField}
                />
              </div>

              <div style={styles.inputGroup}>
                <input
                  type="tel"
                  name="contactno"
                  value={contactno}
                  onChange={this.handleInputChange}
                  placeholder="Phone Number *"
                  style={styles.inputField}
                />
              </div>

              <div style={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                  placeholder="Email (Optional)"
                  style={styles.inputField}
                />
              </div>

              <div style={styles.buttonContainer}>
                <button
                  onClick={this.handleSubmit}
                  style={isEditing ? styles.updateBtn : styles.addBtn}
                >
                  {isEditing ? "Update" : "Add Contact"}
                </button>
                
                {(isEditing || firstname || lastname || contactno || email) && (
                  <button
                    onClick={this.clearForm}
                    style={styles.secondaryBtn}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div style={styles.statsSection}>
              <h3 style={styles.statsTitle}>📊 Quick Stats</h3>
              <div style={styles.statsRow}>
                <span>Total:</span>
                <span style={styles.statNumber}>{totalContacts}</span>
              </div>
              <div style={styles.statsRow}>
                <span>With Email:</span>
                <span style={styles.statNumber}>
                  {this.state.contacts.filter(c => c.email).length}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Contact List */}
          <div style={styles.rightPanel}>
            {/* Search Bar */}
            <div style={styles.searchSection}>
              <div style={styles.searchBox}>
                <span style={styles.searchIcon}>🔍</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => this.setState({ searchTerm: e.target.value })}
                  placeholder="Search contacts..."
                  style={styles.searchInput}
                />
                {searchTerm && (
                  <button
                    onClick={() => this.setState({ searchTerm: "" })}
                    style={styles.clearBtn}
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
              <div style={styles.searchInfo}>
                Showing {filteredContacts.length} of {totalContacts}
              </div>
            </div>

            {/* Contact List - Compact */}
            <div style={styles.contactsSection}>
              {filteredContacts.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>📞</div>
                  <h3 style={styles.emptyTitle}>
                    {searchTerm ? "No matches found" : "No contacts"}
                  </h3>
                  <p style={styles.emptyText}>
                    {searchTerm 
                      ? "Try a different search" 
                      : "Add your first contact"}
                  </p>
                </div>
              ) : (
                <div style={styles.contactsGrid}>
                  {filteredContacts.map(contact => (
                    <div key={contact.id} style={styles.contactCard}>
                      <div style={styles.contactTop}>
                        <div style={styles.contactAvatar}>
                          {contact.fname.charAt(0).toUpperCase()}
                        </div>
                        <div style={styles.contactMain}>
                          <h4 style={styles.contactName}>
                            {contact.fname} {contact.lname}
                          </h4>
                          <p style={styles.contactPhone}>{contact.contact}</p>
                          {contact.email && (
                            <p style={styles.contactEmail}>{contact.email}</p>
                          )}
                        </div>
                      </div>
                      
                      <div style={styles.contactActions}>
                        <button
                          onClick={() => this.toggleContactDetails(contact.id)}
                          style={styles.actionBtn}
                        >
                          {contact.visible ? "Less" : "More"}
                        </button>
                        <button
                          onClick={() => this.editContact(contact)}
                          style={styles.editBtn}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => this.deleteContact(contact.id)}
                          style={styles.deleteBtn}
                        >
                          Delete
                        </button>
                      </div>

                      {contact.visible && (
                        <div style={styles.contactDetails}>
                          <div style={styles.detailItem}>
                            <strong>ID:</strong> {contact.id}
                          </div>
                          <div style={styles.detailItem}>
                            <strong>Full Name:</strong> {contact.fname} {contact.lname}
                          </div>
                          <div style={styles.detailItem}>
                            <strong>Phone:</strong> {contact.contact}
                          </div>
                          {contact.email && (
                            <div style={styles.detailItem}>
                              <strong>Email:</strong> {contact.email}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer - Minimal */}
        <div style={styles.footer}>
          <p>Contact Book • {totalContacts} contacts</p>
        </div>
      </div>
    );
  }
}

// Compact and Efficient Styles
const styles = {
  container: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: '0',
    margin: '0',
  },
  header: {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '20px 30px',
    boxShadow: '0 2px 10px rgba(79, 70, 229, 0.3)',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '600',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  statsBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '6px 15px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  mainWrapper: {
    maxWidth: '1200px',
    margin: '30px auto',
    padding: '0 20px',
    display: 'flex',
    gap: '30px',
    minHeight: 'calc(100vh - 180px)',
  },
  leftPanel: {
    flex: '1',
    minWidth: '300px',
    maxWidth: '350px',
  },
  rightPanel: {
    flex: '2',
    minWidth: '400px',
  },
  formSection: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    marginBottom: '20px',
    border: '1px solid #e2e8f0',
  },
  sectionTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 20px 0',
    paddingBottom: '15px',
    borderBottom: '2px solid #f1f5f9',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  inputField: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '0.95rem',
    backgroundColor: '#f9fafb',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
  },
  inputFieldFocus: {
    borderColor: '#4f46e5',
    backgroundColor: 'white',
    boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)',
    outline: 'none',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  },
  addBtn: {
    flex: '1',
    padding: '12px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  updateBtn: {
    flex: '1',
    padding: '12px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  secondaryBtn: {
    padding: '12px 20px',
    backgroundColor: 'transparent',
    color: '#64748b',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  statsSection: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
  },
  statsTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 15px 0',
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #f1f5f9',
    fontSize: '0.9rem',
    color: '#475569',
  },
  statNumber: {
    fontWeight: '600',
    color: '#4f46e5',
  },
  searchSection: {
    marginBottom: '20px',
  },
  searchBox: {
    position: 'relative',
    marginBottom: '8px',
  },
  searchIcon: {
    position: 'absolute',
    left: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '1rem',
    color: '#9ca3af',
  },
  searchInput: {
    width: '100%',
    padding: '12px 15px 12px 45px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '0.95rem',
    backgroundColor: 'white',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
  },
  clearBtn: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    fontSize: '1rem',
    color: '#9ca3af',
    cursor: 'pointer',
    padding: '4px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInfo: {
    fontSize: '0.85rem',
    color: '#6b7280',
    textAlign: 'right',
  },
  contactsSection: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
    minHeight: '400px',
    maxHeight: 'calc(100vh - 300px)',
    overflowY: 'auto',
  },
  contactsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '15px',
  },
  contactCard: {
    backgroundColor: '#f9fafb',
    borderRadius: '10px',
    padding: '18px',
    border: '1px solid #e5e7eb',
    transition: 'all 0.2s',
  },
  contactTop: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  contactAvatar: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: '#4f46e5',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: '600',
    marginRight: '15px',
    flexShrink: 0,
  },
  contactMain: {
    flex: '1',
    minWidth: 0, // For text truncation
  },
  contactName: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  contactPhone: {
    fontSize: '0.9rem',
    color: '#4b5563',
    margin: '0 0 2px 0',
  },
  contactEmail: {
    fontSize: '0.85rem',
    color: '#6b7280',
    margin: '0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  contactActions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  actionBtn: {
    padding: '6px 12px',
    backgroundColor: '#f3f4f6',
    color: '#4b5563',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    flex: '1',
  },
  editBtn: {
    padding: '6px 12px',
    backgroundColor: '#eff6ff',
    color: '#3b82f6',
    border: '1px solid #93c5fd',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    flex: '1',
  },
  deleteBtn: {
    padding: '6px 12px',
    backgroundColor: '#fef2f2',
    color: '#ef4444',
    border: '1px solid #fca5a5',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    flex: '1',
  },
  contactDetails: {
    marginTop: '15px',
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '8px',
    borderLeft: '3px solid #4f46e5',
  },
  detailItem: {
    fontSize: '0.85rem',
    color: '#4b5563',
    marginBottom: '8px',
    display: 'flex',
    gap: '5px',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    textAlign: 'center',
    color: '#9ca3af',
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '15px',
    opacity: '0.5',
  },
  emptyTitle: {
    fontSize: '1.2rem',
    color: '#6b7280',
    margin: '0 0 8px 0',
    fontWeight: '600',
  },
  emptyText: {
    fontSize: '0.9rem',
    color: '#9ca3af',
    margin: '0',
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    color: '#6b7280',
    fontSize: '0.85rem',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: 'white',
    marginTop: '20px',
  },
};

// Add hover effects
Object.assign(styles.inputField, {
  ':focus': {
    borderColor: '#4f46e5',
    backgroundColor: 'white',
    boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)',
    outline: 'none',
  }
});

Object.assign(styles.searchInput, {
  ':focus': {
    borderColor: '#4f46e5',
    boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)',
    outline: 'none',
  }
});

Object.assign(styles.addBtn, {
  ':hover': {
    backgroundColor: '#059669',
    transform: 'translateY(-1px)',
  }
});

Object.assign(styles.updateBtn, {
  ':hover': {
    backgroundColor: '#2563eb',
    transform: 'translateY(-1px)',
  }
});

Object.assign(styles.secondaryBtn, {
  ':hover': {
    backgroundColor: '#f3f4f6',
  }
});

Object.assign(styles.actionBtn, {
  ':hover': {
    backgroundColor: '#e5e7eb',
  }
});

Object.assign(styles.editBtn, {
  ':hover': {
    backgroundColor: '#3b82f6',
    color: 'white',
  }
});

Object.assign(styles.deleteBtn, {
  ':hover': {
    backgroundColor: '#ef4444',
    color: 'white',
  }
});

Object.assign(styles.contactCard, {
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    borderColor: '#c7d2fe',
  }
});

Object.assign(styles.clearBtn, {
  ':hover': {
    backgroundColor: '#f3f4f6',
  }
});

export default Contact;