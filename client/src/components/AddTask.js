import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import CategoryPicker from './CategoryPicker'
import axios from 'axios';
axios.defaults.withCredentials = true;

require('../static/css/AddTask.css')
"use strict";

/*
Component for adding a new task with a name and a date.
*/
class AddTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newName: 'A name for your task',
            newDate: new Date(),
            newCategory: ''
        }

        this.updateNewName = this.updateNewName.bind(this)
        this.updateTaskList = this.updateTaskList.bind(this)
        this.updateNewDate = this.updateNewDate.bind(this)
        this.updateNewCategory = this.updateNewCategory.bind(this)
        this.addTaskRequest = this.addTaskRequest.bind(this)
    }

    updateNewName(e) {
        this.setState({
            newName: e.target.value
        })
    }

    updateNewCategory(category) {
        this.setState({
            newCategory: category
        })
    }

    updateNewDate = date => this.setState({ newDate: date })

    updateTaskList() {
        this.props.addNew({
            taskId: this.props.taskId,
            name: this.state.newName,
            date: this.state.newDate,
            category: this.state.newCategory
        })

        this.addTaskRequest();

        this.setState(prevState => {
            return {
                newName: '',
                newDate: new Date(),
                newCategory: ''
            }
        })
    }

    addTaskRequest = async () => {
        const request = {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.state)
        }
        const response = await fetch('/api/createtask/', request);

    }

    render() {
        return (
            <div className="addTaskBox">
                <input
                    type="text"
                    value={this.state.newName}
                    onChange={this.updateNewName}
                />
                <br/>
                <DateTimePicker
                    value={this.state.newDate}
                    onChange={this.updateNewDate}
                />
                <br/>
                <CategoryPicker
                    updateCategory={this.updateNewCategory}
                />
                <button onClick={this.updateTaskList}> Add Task </button>
            </div>
        )
    }
}

export default AddTask;