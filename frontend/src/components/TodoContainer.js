import React, { Component } from 'react';
import logo from '../logo.svg';
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
            tasks: []
        }

        this.addTask = this.addTask.bind(this)

    }

    addTask(t) {
        this.setState(
            (state) => ({
                tasks: state.tasks.concat([t]),
            })
        )
        this.state.tasks.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        })
    }

    render() {
        return (
            <div>
                <AddTask addNew={this.addTask} />
                <TaskList tasks={this.state.tasks} />
            </div>
        )
    }
}

export default TodoContainer;