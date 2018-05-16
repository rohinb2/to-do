import React, { Component } from 'react';
"use strict";

class TaskList extends Component {
    render() {
        return (
            <div>
                <h3> Your Tasks </h3>
                <ul>
                    {this.props.tasks.map((task) => {
                        return (
                            <div>
                                <h3> {'Task: ' + task.name}</h3>
                                <p>{'Due Date: ' + task.date}</p>
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default TaskList;