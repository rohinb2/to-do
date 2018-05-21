import React, { Component } from 'react';
"use strict";
require("../static/css/TaskList.css")

class TaskList extends Component {

    render() {
        return (
            <div>
                <ul>
                    {this.props.tasks.map((task) => {
                        return (
                            <div className={this.props.isCompleted ? "completed" : "task"}>
                                <p>{'Task: ' + task.name}</p>
                                <p>{'Due:  ' + task.date}</p>
                                <p>{'Category: ' + task.category}</p>
                                <input
                                    type="checkbox"
                                    onChange={() => { this.props.toggleCheckbox(task) }}
                                    checked={this.props.isCompleted}
                                />
                                <div onClick={() => { this.props.deleteTask(task) }}>
                                    <i class="material-icons">delete</i>
                                </div>
                                <hr width="100%" />
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default TaskList;