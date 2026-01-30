import React, {useState} from 'react';

export default function HookExample(){
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");
    const [selected, setSelected] = useState(false);
    return(
    <>
          <h1>Count: {count}</h1>
          <br/>
          <button onClick={() => setCount(count + 1)}>Increment</button>
          <br/>
          <br/>
          <button onClick={() => setCount(count - 1)}>Decrement</button>
    <br/>
    <br/>
              <h1>Name: {name}</h1>

    <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
    <br/>
    <br/>
    
    {"Selected value"}:{selected ? "True" : "False"}
    <input type="checkbox" checked={selected} onChange={()=> setSelected(!selected)}/>
    </>
    );
}