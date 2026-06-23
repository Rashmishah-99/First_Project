// create todolist using material ui and use state hook in react js
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

import { TextField, Button, List, ListItem, ListItemText, Icon } from '@mui/material';

const TodoList1 = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
      };
    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, newTask]);
            setNewTask('');
        }
    };
    return (
        <div>
            <h1>Todo List</h1>
            <TextField
                label="New Task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal" 
            />
            <Button variant="contained" color="primary" onClick={handleAddTask}>
                Add Task    
            </Button>
            <IconButton color="error" aria-label="Delete" onClick={() => setTasks([])}>
                <DeleteIcon />
            </IconButton>
 

            <List>
<Checkbox
  checked={checked}
  onChange={handleChange}
  slotProps={{
    input: { 'aria-label': 'controlled' },
    
  }}
  
/>
                {tasks.map((task, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={task} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
export default TodoList1;