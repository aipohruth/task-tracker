import Header from './components/Header';
//import {BrowserRouter as Router, Routes} from 'react-router-dom';
import React from 'react'
import Tasks from './components/Tasks';
import { useState , useEffect} from 'react';
import AddTasks from './components/AddTasks';
import Footer from './components/Footer';


const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
const [tasks, setTasks] = useState([])

useEffect(() =>{
 const getTasks = async () =>{
  const tasksFromServer = await fetchTasks()
  setTasks(tasksFromServer)
 }
 getTasks()
}, [])

//fetch tasks
const fetchTasks = async() =>{
  const res = await fetch ('http://localhost:5000/tasks')
const data = await res.json()
  return data
}

//fetch task
const fetchTask = async() =>{
  const res = await fetch ('http://localhost:5000/tasks')
const data = await res.json()
  return data
}



//Delete Tasks
const deleteTask = async id =>{
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE',
  })
  setTasks(tasks.filter(c => c.id !== id))
}

//toggle reminder
const toggleReminder = async id =>{
const taskTogggle = await fetchTask(id)
const updatedTask = {...taskTogggle, reminder:!taskTogggle.reminder}

const res = await fetch(`http://localhost:5000/tasks/${id}`, {
  method: 'PUT',
  headers: {
    'Content-type' : 'application/json',
  },
  body: JSON.stringify(updatedTask)
})

const data = res.json()


  setTasks(tasks.map((task) => task.id === id ? 
  {...task, reminder: data.reminder } : task))
}

//Add Task
const AddTask = async (task) =>{
  const res = await fetch('http://localhost:5000/tasks', {
    method : 'POST',
    headers : {
      'Content-type' : 'application/json',
    },
       body : JSON.stringify(task),
  })
      const data = await res.json()
      setTasks([...task, data])

/*const id = Math.floor(Math.random() * 1000 + 1) //since no Id from the back end 
const newTask={...task, id}
setTasks([...tasks, newTask])*/
}

  return (
    <div className='container'>
      <Header onAdd={() => setShowAddTask(!showAddTask)}
      showTask={showAddTask} />
      {showAddTask && <AddTasks onAdd={AddTask} />}
      {tasks.length > 0 ?
       (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>)
                    :
       (<p>No Tasks to show</p>)}
       
       < Footer />
    </div>
    
  
  )
}

export default App

