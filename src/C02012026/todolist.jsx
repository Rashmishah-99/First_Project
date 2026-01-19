import React, { Component } from 'react';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {todos: [], inputvalue: ''};
    }
    addTodoList = () => {
        if (this.state.inputvalue.trim() == '') return; 
        const newentry = {id: Date.now(), text: this.state.inputvalue, completed: false,};
        this.setState((prevState) => ({todos: [newentry, ...prevState.todos], inputvalue: '',}));
    };
oninputchange = (e) => {
        this.setState({inputvalue: e.target.value});
    };

    deleteTodo = (id) => {
        this.setState((prevState) => ({todos: prevState.todos.filter(y => y.id !== id),}));
    };
    updatetask = (id) => {
        this.setState((prevState) => ({
            todos: prevState.todos.map((x) =>
            x.id === id ? {...x, completed: !x.completed}: x),
        }));
    };

    render() {
        const {todos, inputvalue} = this.state;
        return (
            <>
                <input type="text" value={inputvalue} onChange={this.oninputchange} />
                <br/>
                <button onClick={this.addTodoList}>Add</button>
                <br/>
                <ul>
                    {todos.map((x) => (
                        <li key={x.id}>
                            <div style={{color: x.completed ? 'green' : 'red'}}>
                            <input type="checkbox" value={x.completed} onChange={() => this.updatetask(x.id)}/>

                            {x.text}
                            <button onClick={() => this.deleteTodo(x.id)}>Delete</button>
                            </div>
                            </li>
                    ))}
                </ul>
            </>
        );
    }
}
export default TodoList;