import React, {useState} from 'react';

export default function HookExample2(){
  const [collection1, setCollection1] = useState([]);
  const [ip1, setIp1] = useState("");
  const [ip2, setIp2] = useState("");
  const handleInputChange = (e) => {
    setIp1(e.target.value);
  };
  const handleInpuChange2 = (e) => {
    setIp2(e.target.value);
  };
  const addItem = () => {
    setCollection1([ip1, ...collection1]);
    setIp1("");
  };
  const deleteItem = () => {
    setCollection1(collection1.filter((item) => item !== ip2));
    setIp2("");
  };
  const updateItem = () => {
    setCollection1(collection1.map((x) => (x === ip2 ? ip1 : x)));
    setIp1("");
    setIp2("");
  };
  return (
    <>
      <input
        type="text"
        placeholder="Item Name"
        value={ip1}
        onChange={handleInputChange}
      />
      <button onClick={addItem}>Add</button>
      <br />
      <input
        type="text"
        placeholder="Item Name"
        value={ip2}
        onChange={handleInpuChange2}
      />
      <button onClick={deleteItem}>Delete</button>
      <button onClick={updateItem}>Update</button>
      <h1>Collection 1</h1>
      <ul>
        {collection1.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
}