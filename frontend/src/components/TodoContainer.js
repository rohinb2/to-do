import React, { Component } from 'react';
import AddTask from './AddTask'
import TaskList from './TaskList'

"use strict"
/* 
Container for most of the app - contains the list of tasks and place to add more tasks.
*/
class TodoContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tasks: [],
            taskId: 0,
            completedTasks: [],
            showAddTask: false
        }

        this.addTask = this.addTask.bind(this)
        this.completeTask = this.completeTask.bind(this)
        this.uncompleteTask = this.uncompleteTask.bind(this)
        this.getIndexOfTask = this.getIndexOfTask.bind(this)
        this.newTask = this.newTask.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
    }

    // Adds the latest task to the end
    addTask(t) {
        this.setState(prevState => {
            return {
                tasks: this.state.tasks.concat([t]),
                showAddTask: false,
                taskId: prevState.taskId + 1
            }
        })
    }
    
    newTask() {
        this.setState({
            showAddTask: true
        })
    }

    // Finds the task in the array of non-completed tasks, removes it and moves it to completed tasks
    completeTask(t) {
        var index = this.getIndexOfTask(t, this.state.tasks);

        this.setState({
            completedTasks: this.state.completedTasks.concat([this.state.tasks[index]])
        })

        // Uses a callback to use the previous state to set this state
        this.setState(prevState => {
            let newTasks = prevState.tasks.slice()
            newTasks.splice(index, 1)
            return {tasks : newTasks}
        })

    }

    // Deletes task from either completed or uncompleted tasks
    deleteTask(t) {
        var index = this.getIndexOfTask(t, this.state.tasks);
        if (index != -1) {
            this.setState(prevState => {
                let newTasks = prevState.tasks.slice()
                newTasks.splice(index, 1)
                return { tasks: newTasks }
            })

        } else {
            index = this.getIndexOfTask(t, this.state.completedTasks);
            
            this.setState(prevState => {
                let newCompletedTasks = prevState.completedTasks.slice()
                newCompletedTasks.splice(index, 1)
                return { completedTasks: newCompletedTasks }
            })
        }

    }

    // Loops through the array and finds the object with the right taskId
    getIndexOfTask(t, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].taskId == t.taskId) {
                return i;
            }
        }
        return -1;
    }

    // Finds the task in the array of completed task and makes it uncomplete
    uncompleteTask(t) {
        var index = this.getIndexOfTask(t, this.state.completedTasks);

        this.setState({
            tasks: this.state.tasks.concat([this.state.completedTasks[index]])
        })
        
        this.setState(prevState => {
            let newCompletedTasks = prevState.completedTasks.slice()
            newCompletedTasks.splice(index, 1)
            return { completedTasks: newCompletedTasks }
        })
    }

    render() {

        // Sorts the tasks by their dates, earliest to latest
        this.state.tasks.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        })

        // Sorts the completed tasks from latest to earliest
        this.state.completedTasks.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        })

        return (
            <div>

                {this.state.showAddTask ? 
                <AddTask addNew={this.addTask} taskId={this.state.taskId} /> : 
                <button onClick={this.newTask}> New Task </button>}

                <h3>Your Tasks</h3>
                <TaskList tasks={this.state.tasks} toggleCheckbox={this.completeTask} isCompleted={false} deleteTask={this.deleteTask} />
                <h3>Completed Tasks</h3>
                <TaskList tasks={this.state.completedTasks} toggleCheckbox={this.uncompleteTask} isCompleted={true} deleteTask={this.deleteTask} />
            </div>
        )
    }
}

export default TodoContainer;