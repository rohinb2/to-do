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
            completedTasks: []
        }

        this.addTask = this.addTask.bind(this)
        this.completeTask = this.completeTask.bind(this)
        this.uncompleteTask = this.uncompleteTask.bind(this)
        this.getIndexOfTask = this.getIndexOfTask.bind(this)
    }

    // Adds the latest task to the end
    addTask(t) {
        this.setState({
            tasks: this.state.tasks.concat([t]),
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
                <AddTask addNew={this.addTask} />
                <h3>Your Tasks</h3>
                <TaskList tasks={this.state.tasks} toggleCheckbox={this.completeTask} isCompleted={false} />
                <h3>Completed Tasks</h3>
                <TaskList tasks={this.state.completedTasks} toggleCheckbox={this.uncompleteTask} isCompleted={true} />
            </div>
        )
    }
}

export default TodoContainer;