//create a class based component
// that will allow user to register with their name(text), email(email) and password confirm password, gender(radio buttons)
// country(dropdown with at least 5 countries) terms and conditions(checkbox) color picker date time , on form submission, VALIDATE andTHE INPUTS AND display
// an alert with the entered information(except password fields)
import React, { Component } from 'react';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      country: '',
      terms: false,
      color: '#3498db',
      date: '',
      time: '',
      errors: {}
    };
  }

  // Handle input changes
  handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
      errors: {
        ...this.state.errors,
        [name]: '' // Clear error for this field when user starts typing
      }
    });
  };

  // Validation function
  validateForm = () => {
    const errors = {};
    const { name, email, password, confirmPassword, gender, country, terms, date, time } = this.state;

    // Name validation
    if (!name.trim()) {
      errors.name = 'Name is required';
    } else if (name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Gender validation
    if (!gender) {
      errors.gender = 'Please select a gender';
    }

    // Country validation
    if (!country) {
      errors.country = 'Please select a country';
    }

    // Terms validation
    if (!terms) {
      errors.terms = 'You must accept the terms and conditions';
    }

    // Date validation
    if (!date) {
      errors.date = 'Date is required';
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.date = 'Date cannot be in the past';
      }
    }

    // Time validation
    if (!time) {
      errors.time = 'Time is required';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  handleSubmit = (event) => {
    event.preventDefault();
    
    if (this.validateForm()) {
      const { password, confirmPassword, errors, ...userData } = this.state;
      
      // Create alert message
      const alertMessage = `
        Registration Successful!
        
        User Details:
        -------------
        Name: ${userData.name}
        Email: ${userData.email}
        Gender: ${userData.gender}
        Country: ${userData.country}
        Selected Color: ${userData.color}
        Date: ${userData.date}
        Time: ${userData.time}
        Terms Accepted: ${userData.terms ? 'Yes' : 'No'}
      `;
      
      alert(alertMessage);
      
      // Reset form after successful submission
      this.setState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        country: '',
        terms: false,
        color: '#3498db',
        date: '',
        time: '',
        errors: {}
      });
    }
  };

  render() {
    const countries = [
      { value: '', label: 'Select a country' },
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'ca', label: 'Canada' },
      { value: 'au', label: 'Australia' },
      { value: 'de', label: 'Germany' },
      { value: 'jp', label: 'Japan' },
      { value: 'in', label: 'India' }
    ];

    // Style for required field asterisk
    const requiredAsterisk = {
      color: 'red',
      marginLeft: '4px'
    };

    return (
      <div className="registration-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h2 style={{ color: '#2c3e50', textAlign: 'center', marginBottom: '30px' }}>
          User Registration
        </h2>
        
        <form onSubmit={this.handleSubmit} style={{ background: '#f9f9f9', padding: '25px', borderRadius: '8px' }}>
          {/* Name Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Full Name <span style={requiredAsterisk}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              placeholder="Enter your full name"
              style={{
                width: '100%',
                padding: '10px',
                border: `1px solid ${this.state.errors.name ? '#e74c3c' : '#ddd'}`,
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
            {this.state.errors.name && (
              <span style={{ color: '#e74c3c', fontSize: '14px', marginTop: '5px', display: 'block' }}>
                {this.state.errors.name}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Email Address <span style={requiredAsterisk}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '10px',
                border: `1px solid ${this.state.errors.email ? '#e74c3c' : '#ddd'}`,
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
            {this.state.errors.email && (
              <span style={{ color: '#e74c3c', fontSize: '14px', marginTop: '5px', display: 'block' }}>
                {this.state.errors.email}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Password <span style={requiredAsterisk}>*</span>
            </label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '10px',
                border: `1px solid ${this.state.errors.password ? '#e74c3c' : '#ddd'}`,
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
            {this.state.errors.password && (
              <span style={{ color: '#e74c3c', fontSize: '14px', marginTop: '5px', display: 'block' }}>
                {this.state.errors.password}
              </span>
            )}
          </div>

          {/* Confirm Password Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Confirm Password <span style={requiredAsterisk}>*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleInputChange}
              placeholder="Confirm your password"
              style={{
                width: '100%',
                padding: '10px',
                border: `1px solid ${this.state.errors.confirmPassword ? '#e74c3c' : '#ddd'}`,
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
            {this.state.errors.confirmPassword && (
              <span style={{ color: '#e74c3c', fontSize: '14px', marginTop: '5px', display: 'block' }}>
                {this.state.errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Gender Field - Now in a single line */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Gender <span style={requiredAsterisk}>*</span>
            </label>
            <div style={{ 
              display: 'flex', 
              gap: '30px', 
              flexWrap: 'nowrap',
              alignItems: 'center'
            }}>
              {['Male', 'Female', 'Other'].map((genderOption) => (
                <label 
                  key={genderOption} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={genderOption}
                    checked={this.state.gender === genderOption}
                    onChange={this.handleInputChange}
                    style={{ marginRight: '8px' }}
                  />
                  {genderOption}
                </label>
              ))}
            </div>
            {this.state.errors.gender && (
              <span style={{ color: '#e74c3c', fontSize: '14px', marginTop: '5px', display: 'block' }}>
                {this.state.errors.gender}
              </span>
            )}
          </div>

          {/* Country Dropdown */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Country <span style={requiredAsterisk}>*</span>
            </label>
            <select
              name="country"
              value={this.state.country}
              onChange={this.handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: `1px solid ${this.state.errors.country ? '#e74c3c' : '#ddd'}`,
                borderRadius: '4px',
                fontSize: '16px',
                backgroundColor: 'white'
              }}
            >
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
            {this.state.errors.country && (
              <span style={{ color: '#e74c3c', fontSize: '14px', marginTop: '5px', display: 'block' }}>
                {this.state.errors.country}
              </span>
            )}
          </div>

          {/* Color Picker */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Favorite Color
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <input
                type="color"
                name="color"
                value={this.state.color}
                onChange={this.handleInputChange}
                style={{
                  width: '60px',
                  height: '40px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
              <span style={{ color: this.state.color, fontWeight: 'bold' }}>
                {this.state.color.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Date Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Select Date <span style={requiredAsterisk}>*</span>
            </label>
            <input
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: `1px solid ${this.state.errors.date ? '#e74c3c' : '#ddd'}`,
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
            {this.state.errors.date && (
              <span style={{ color: '#e74c3c', fontSize: '14px', marginTop: '5px', display: 'block' }}>
                {this.state.errors.date}
              </span>
            )}
          </div>

          {/* Time Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Select Time <span style={requiredAsterisk}>*</span>
            </label>
            <input
              type="time"
              name="time"
              value={this.state.time}
              onChange={this.handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: `1px solid ${this.state.errors.time ? '#e74c3c' : '#ddd'}`,
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
            {this.state.errors.time && (
              <span style={{ color: '#e74c3c', fontSize: '14px', marginTop: '5px', display: 'block' }}>
                {this.state.errors.time}
              </span>
            )}
          </div>

          {/* Terms and Conditions */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="terms"
                checked={this.state.terms}
                onChange={this.handleInputChange}
                style={{ marginRight: '10px' }}
              />
              <span style={{ fontWeight: '500' }}>
                I agree to the Terms and Conditions <span style={requiredAsterisk}>*</span>
              </span>
            </label>
            {this.state.errors.terms && (
              <span style={{ color: '#e74c3c', fontSize: '14px', marginTop: '5px', display: 'block' }}>
                {this.state.errors.terms}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
          >
            Register
          </button>
        </form>

        {/* Form Preview */}
        <div style={{ marginTop: '30px', padding: '15px', background: '#ecf0f1', borderRadius: '8px' }}>
          <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Form Preview:</h4>
          <p><strong>Name:</strong> {this.state.name || 'Not provided'}</p>
          <p><strong>Email:</strong> {this.state.email || 'Not provided'}</p>
          <p><strong>Gender:</strong> {this.state.gender || 'Not selected'}</p>
          <p><strong>Country:</strong> {countries.find(c => c.value === this.state.country)?.label || 'Not selected'}</p>
          <p><strong>Selected Color:</strong> 
            <span style={{ 
              display: 'inline-block', 
              width: '15px', 
              height: '15px', 
              backgroundColor: this.state.color, 
              marginLeft: '10px',
              verticalAlign: 'middle',
              border: '1px solid #ccc'
            }}></span>
            {this.state.color.toUpperCase()}
          </p>
          <p><strong>Date:</strong> {this.state.date || 'Not selected'}</p>
          <p><strong>Time:</strong> {this.state.time || 'Not selected'}</p>
          <p><strong>Terms Accepted:</strong> {this.state.terms ? 'Yes' : 'No'}</p>
        </div>
      </div>
    );
  }
}

export default RegistrationForm;