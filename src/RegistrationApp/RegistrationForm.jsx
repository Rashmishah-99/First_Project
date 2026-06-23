import React, { useState, useEffect } from 'react';
import './RegistrationForm.css';

const itemsData = [
  { id: '1', name: 'Premium Laptop', price: 1200 },
  { id: '2', name: 'Smartphone Pro', price: 800 },
  { id: '3', name: 'Wireless Headphones', price: 150 },
  { id: '4', name: 'Smart Watch', price: 250 },
  { id: '5', name: 'Mechanical Keyboard', price: 100 }
];

const qtyOptions = Array.from({ length: 10 }, (_, i) => i + 1);
const discountOptions = Array.from({ length: 9 }, (_, i) => i * 10); // 0, 10, 20... 80

const RegistrationForm = () => {
  const [selectedItemId, setSelectedItemId] = useState('');
  const [qty, setQty] = useState(1);
  const [discount, setDiscount] = useState(0); // This represents the percentage
  const [total, setTotal] = useState(0);
  const [submissions, setSubmissions] = useState([]);

  // Calculate total whenever inputs change
  useEffect(() => {
    if (selectedItemId) {
      const item = itemsData.find(i => i.id === selectedItemId);
      if (item) {
        const subtotal = item.price * qty;
        const discountAmount = subtotal * (discount / 100);
        const finalTotal = subtotal - discountAmount;
        setTotal(finalTotal);
      }
    } else {
      setTotal(0);
    }
  }, [selectedItemId, qty, discount]);

  const handleAdd = () => {
    if (!selectedItemId) {
      alert("Please select an item first.");
      return;
    }
    const item = itemsData.find(i => i.id === selectedItemId);
    const newSubmission = {
      id: Date.now(),
      itemName: item.name,
      itemPrice: item.price,
      quantity: qty,
      discountPercentage: discount,
      totalAmount: total
    };

    setSubmissions([...submissions, newSubmission]);

    // Reset form
    setSelectedItemId('');
    setQty(1);
    setDiscount(0);
  };

  return (
    <div className="rf-container">
      <div className="rf-card">
        <h2 className="rf-title">Registration / Order Form</h2>

        <div className="rf-form-group">
          <label className="rf-label">Select Item (Name & Price)</label>
          <select
            className="rf-select"
            value={selectedItemId}
            onChange={(e) => setSelectedItemId(e.target.value)}
          >
            <option value="" disabled>-- Choose an Item --</option>
            {itemsData.map(item => (
              <option key={item.id} value={item.id}>
                {item.name} - ₹{item.price}
              </option>
            ))}
          </select>
        </div>

        <div className="rf-form-group">
          <label className="rf-label">Quantity (up to 10)</label>
          <select
            className="rf-select"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          >
            {qtyOptions.map(q => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
        </div>

        <div className="rf-form-group">
          <label className="rf-label">Discount Percentage (up to 80%)</label>
          <select
            className="rf-select"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
          >
            {discountOptions.map(d => (
              <option key={d} value={d}>{d}%</option>
            ))}
          </select>
        </div>

        <div className="rf-total-box">
          <div className="rf-total-label">Estimated Total</div>
          <div className="rf-total-value">
            ₹{total.toFixed(2)}
          </div>
        </div>

        <button className="rf-add-btn" onClick={handleAdd}>
          Add
        </button>

        <div className="rf-list-container">
          <h3 className="rf-list-title">Recent Submissions</h3>
          {submissions.length === 0 ? (
            <div className="rf-empty-state">No items added yet.</div>
          ) : (
            <ul className="rf-list">
              {submissions.map(sub => (
                <li key={sub.id} className="rf-list-item">
                  <div className="rf-item-details">
                    <span className="rf-item-name">{sub.itemName}</span>
                    <div className="rf-item-meta">
                      <span>Qty: {sub.quantity}</span>
                      <span>Price: ₹{sub.itemPrice}</span>
                      <span>Discount: {sub.discountPercentage}%</span>
                    </div>
                  </div>
                  <div className="rf-item-total">
                    ₹{sub.totalAmount.toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
