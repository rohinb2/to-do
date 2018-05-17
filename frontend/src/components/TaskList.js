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
                                <input
                                    type="checkbox" 
                                    onChange={() => {this.props.toggleCheckbox(task)}} 
                                    checked={this.props.isCompleted}
                                />
                                <p>{'Task: ' + task.name}</p>
                                <p>{'Due:  ' + task.date}</p>
                                <hr width="100%"/>
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default TaskList;