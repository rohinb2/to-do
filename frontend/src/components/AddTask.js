import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';

"use strict";

class AddTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
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
            name: this.state.newName,
            date: this.state.newDate
        })
        this.setState({
            newTask: '',
            newDate: new Date()
        })
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.newName}
                    onChange={this.updateNewName}
                />
                <DateTimePicker
                    value={this.state.newDate}
                    onChange={this.updateNewDate}
                />
                <button onClick={this.updateTaskList}> Add Task </button>
            </div>
        )
    }
}

export default AddTask;