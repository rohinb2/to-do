import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import CategoryPicker from './CategoryPicker'

require('../static/css/AddTask.css')

/*
Component for adding a new task with a name and a date.
*/
class AddTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: 'A name for your task',
            date: new Date(),
            category: ''
        }

        this.updateName = this.updateName.bind(this)
        this.updateTaskList = this.updateTaskList.bind(this)
        this.updateDate = this.updateDate.bind(this)
        this.updateCategory = this.updateCategory.bind(this)
        this.addTaskRequest = this.addTaskRequest.bind(this)
    }

    updateName(e) {
        this.setState({
            name: e.target.value
        })
    }

    updateCategory(category) {
        this.setState({
            category: category
        })
    }

    updateDate = date => this.setState({ date: date })

    updateTaskList() {
        this.addTaskRequest();
        this.setState(prevState => {
            return {
                name: '',
                date: new Date(),
                category: ''
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

        fetch('/api/createtask/', request).then((response) => {
            this.props.refresh();
        });

    }

    render() {
        return (
            <div className="addTaskBox">
                <input
                    type="text"
                    value={this.state.name}
                    onChange={this.updateName}
                />
                <br/>
                <DateTimePicker
                    value={this.state.date}
                    onChange={this.updateDate}
                />
                <br/>
                <CategoryPicker
                    updateCategory={this.updateCategory}
                />
                <button onClick={this.updateTaskList}> Add Task </button>
            </div>
        )
    }
}

export default AddTask;