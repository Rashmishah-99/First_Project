import React, {useState} from 'react';

export default function HookExample1(){
    const [user, setUser] = useState({name:"", age: 0, male: false, email:"", city:""});
    return(<>
    <h1>User Information</h1>
    <h2>Name: {user.name}</h2>
    <h2>Age: {user.age}</h2>
    <h2>City: {user.city}</h2>
    <h2>Email: {user.email}</h2>
    <h2>Gender: {user.male ? "Male" : "Female"}</h2>
    <br/>
    <input type="text" placeholder="Name" onChange={(e) => setUser({...user, name: e.target.value})}/>
    <br/><br/>
    <input type="number" placeholder="Age" onChange={(e) => setUser({...user, age:e.target.value})}/>
    <br/><br/>
    <select onChange={(e) => setUser({...user, city: e.target.value})}>
        <option value="">Select City</option>
        <option value="Jaipur">Jaipur</option>
        <option value="Delhi">Delhi</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Kolkata">Kolkata</option>
        <option value="Chennai">Chennai</option>
        <option value="Hyderabad">Hyderabad</option>
    </select>
    <br/>
    <br/>
     <input type="checkbox" onChange={() => setUser({...user, male: !user.male})}/> Male

    </>
    );
}
