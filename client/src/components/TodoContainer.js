import React, { Component } from 'react';
import AddTask from './AddTask'
import TaskList from './TaskList'

"use strict"
/* 
Container for most of the app - contains the list of tasks and place to add more tasks.
*/
class TodoContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            completedTasks: [],
            showAddTask: false
        }

        this.completeTask = this.completeTask.bind(this);
        this.uncompleteTask = this.uncompleteTask.bind(this);
        this.newTask = this.newTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.getTasks = this.getTasks.bind(this);
        this.getCompletedTasks = this.getCompletedTasks.bind(this);
    }
    
    newTask() {
        this.setState({
            showAddTask: true
        })
    }

    // Deletes task from either completed or uncompleted tasks
    deleteTask = async (t) => {
        const request = {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(t)
        }

        const response = await fetch('/api/deletetask/', request);
    }

    // Finds the task in the array of non-completed tasks, removes it and moves it to completed tasks
    completeTask = async (t) => {
        const request = {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(t)
        }

        const response = await fetch('/api/completetask/', request);

    }

    // Finds the task in the array of completed task and makes it uncomplete
    uncompleteTask = async (t) => {
        const request = {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(t)
        }

        const response = await fetch('/api/uncompletetask/', request);
    }

    componentWillUpdate = async () => {
        var taskArray = await this.getTasks();
        var completedTaskArray = await this.getCompletedTasks();
        this.setState({
            tasks: taskArray,
            completedTasks: completedTaskArray
        })
    }

    getTasks = async () => {
        const request = {
            credentials: 'include',
            method: 'GET',
        }

        const response = await fetch('/api/gettasks/', request);
        const body = await response.json();
        return body;
    }

    getCompletedTasks = async () => {
        const request = {
            credentials: 'include',
            method: 'GET',
        }

        const response = await fetch('/api/getcompletedtasks/', request);
        const body = await response.json();
        return body;
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
                <AddTask /> : 
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