// create a react functional component that will 
// accept first name , last name, mobile number 
// add a button to submit record
//  display first name in list with 2 buttons 
// view and delete , when user click on view 
// it will toggle display of last name and mobile number 
// when user click on delete it will remove the record
import React, { useState } from 'react';
export default function ContactLists(){
    const [contacts, setContacts] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [viewIndex, setViewIndex] = useState(null);
    const addContact = () => {
        setContacts([...contacts, { firstName, lastName, mobile }]);
        setFirstName("");
        setLastName("");
        setMobile("");
    };
    const deleteContact = (index) => {
        setContacts(contacts.filter((_, i) => i !== index));
        if(viewIndex === index){
            setViewIndex(null);
        }
    };
    const viewContact = (index) => {
        setViewIndex(index);
    };
    return (
        <>
            <h1>Contacts</h1>
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
            />
            <button onClick={addContact}>Add Contact</button>
            <ul>
                {contacts.map((contact, index) => (
                    <li key={index}>
                        {contact.firstName}
                        <button onClick={() => viewContact(index)}>View</button>
                        <button onClick={() => deleteContact(index)}>Delete</button>
                        {viewIndex === index && (
                            <>
                                <p>{contact.lastName}</p>
                                <p>{contact.mobile}</p>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );

}

