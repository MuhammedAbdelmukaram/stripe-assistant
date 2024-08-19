import React, { useEffect, useState } from 'react';

const Modal = ({ isOpen, onClose, offer, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        userPercent: 0,
        users: 0,
        purchases: 0,
        amount: 0
    });

    useEffect(() => {
        if (offer) {
            setFormData(offer);
        } else {
            setFormData({
                name: '',
                description: '',
                imageUrl: '',
                userPercent: 0,
                users: 0,
                purchases: 0,
                amount: 0
            });
        }
    }, [offer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const method = offer ? 'PUT' : 'POST';
        const url = '/api/offers';

        const data = { ...formData };
        if (offer) {
            data.id = offer._id;
        }

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                onSave(data);
                onClose();
            })
            .catch(error => {
                console.error("Error:", error);  // Debugging log
            });
    };


    if (!isOpen) return null;

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2 style={titleStyle}>{offer ? 'Edit Offer' : 'Add New Offer'}</h2>

                <label style={labelStyle} htmlFor="name">Name:</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />

                <label style={labelStyle} htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    style={textareaStyle}
                    required
                ></textarea>

                <label style={labelStyle} htmlFor="imageUrl">Image URL:</label>
                <input
                    id="imageUrl"
                    name="imageUrl"
                    type="text"
                    placeholder="Image URL"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />

                <label style={labelStyle} htmlFor="userPercent">user Percent:</label>
                <input
                    id="userPercent"
                    name="userPercent"
                    type="number"
                    placeholder="user Percent"
                    value={formData.userPercent}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />

                <label style={labelStyle} htmlFor="users">Number of Users:</label>
                <input
                    id="users"
                    name="users"
                    type="number"
                    placeholder="Number of Users"
                    value={formData.users}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />

                <label style={labelStyle} htmlFor="purchases">Number of Purchases:</label>
                <input
                    id="purchases"
                    name="purchases"
                    type="number"
                    placeholder="Number of Purchases"
                    value={formData.purchases}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />

                <label style={labelStyle} htmlFor="amount">Total Amount:</label>
                <input
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="Total Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />

                <div style={buttonContainerStyle}>
                    <button onClick={onClose} style={{ ...buttonStyle, backgroundColor: '#444' }}>Cancel</button>
                    <button onClick={handleSubmit} style={buttonStyle}>{offer ? 'Save Changes' : 'Add Offer'}</button>
                </div>
            </div>
        </div>
    );
};

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
};

const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#bbb'
};

const modalStyle = {
    backgroundColor: '#1e1e1e',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxHeight:'92vh',
    overflow:'scroll',
    overflowX:'hidden',
    color: 'white',
    maxWidth: '500px',
    width: '100%'
};

const titleStyle = {
    marginBottom: '20px',
    fontSize: '24px',
    textAlign: 'center'
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #555',
    backgroundColor: '#2e2e2e',
    color: 'white'
};

const textareaStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #555',
    backgroundColor: '#2e2e2e',
    resize:"vertical",
    color: 'white',
    height: '100px'
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px'
};

const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#0a74da',
    color: 'white',
    fontSize: '16px'
};

export default Modal;
