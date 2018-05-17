import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';

require('../static/css/AddTask.css')
"use strict";

/*
Component for adding a new task with a name and a date.
*/
class AddTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            taskId: 0,
            newName: '',
            newDate: new Date()
        }

        this.updateNewName = this.updateNewName.bind(this)
        this.updateTaskList = this.updateTaskList.bind(this)
        this.updateNewDate = this.updateNewDate.bind(this)
    }

    updateNewName(e) {
        this.setState({
            newName: e.target.value
        })
    }

    updateNewDate = date => this.setState({ newDate: date })

    updateTaskList() {
        this.props.addNew({
            taskId: this.state.taskId,
            name: this.state.newName,
            date: this.state.newDate
        })

        this.setState(prevState => {
            return {
                taskId: prevState.taskId + 1,
                newName: '',
                newDate: new Date()
            }
        })
    }

    render() {
        return (
            <div class="addTaskBox">
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
                <button onClick={this.updateTaskList}> Add Task </button>
            </div>
        )
    }
}

export default AddTask;