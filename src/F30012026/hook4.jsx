// create a react functional component that will
// accept first name, last name and mobile number
// add a button to submit record
// display first name in list with 2 buttons
// view and delete,  when user click on view
// it will toggle display of last name and mobile number
//  when user click on delete it will remove the record
import React, { useState } from "react";
export default function HookExampl4() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [con_list, setConList] = useState([]);
    const [id1, setId1] = useState("");

  const addContact = () => {
    const newContact = {
      id: Date.now(),
      fname: firstName,
      lname: lastName,
      contact: mobile,
      display: false,
    };
    setConList([...con_list, newContact]);
    setFirstName("");
    setLastName("");
    setMobile("");
  };
  const deleteContact = (id) => {
    setConList(con_list.filter((x) => x.id !== id));
  };
  const toggleDisplay = (id) => {
    setConList(
      con_list.map((y) => (y.id === id ? { ...y, display: !y.display } : y)),
    );
  };

  const setRecord = (id) => {
     setId1(id);
      setFirstName(con_list.find((x) => x.id === id).fname);
      setLastName(con_list.find((x) => x.id === id).lname);
      setMobile(con_list.find((x) => x.id === id).contact);
  }
  const updateRecord = () => {
    setConList(
      con_list.map((x) => (x.id === id1 ? { ...x, fname: firstName, lname: lastName, contact: mobile } : x)),
    );
    setFirstName("");
    setLastName("");
    setMobile("");
    setId1("");
  };
  
  return (
    <>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <br />
      <input
        type="text"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <br />
      <button onClick={() => addContact()}>Add</button>
      <button onClick={() => updateRecord()}>Update</button>
      <ul>
        {con_list.map((x) => (
          <li key={x.id}>
            {x.fname}
            <button onClick={() => toggleDisplay(x.id)}>View</button>
            <button onClick={() => deleteContact(x.id)}>Delete</button>
            <div style={{ display: x.display ? "" : "none " }}>
              {x.lname} {" --> "} {x.contact}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

// contact = [
//   { id: 1, fname: "abc", lname: "xyz", contact: "1234", display: true },
//   { id: 2, fname: "abc1", lname: "xyz1", contact: "12341", display: false },
//   { id: 3, fname: "abc2", lname: "xyz2", contact: "12342", display: false },
// ];
// id: 1, fname: "abc", lname: "xyz", contact: "1234", display: true