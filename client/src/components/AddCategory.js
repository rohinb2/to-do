import React, { Component } from 'react';

/*
A component for adding a category to the current User's list of categories.
*/
class AddCategory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category: ''
        }

        this.updateCategory = this.updateCategory.bind(this);
        this.updateCategoryList = this.updateCategoryList.bind(this);
        this.addCategoryRequest = this.addCategoryRequest.bind(this);
    }

    updateCategory(e) {
        this.setState({
            category: e.target.value
        })
    }

    updateCategoryList() {
        this.addCategoryRequest();
        this.setState({
            category: ''
        })
    }

    addCategoryRequest = async () => {
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
    }

    render() {
        return (
            <div>
                <input
                type="text"
                value={this.state.category}
                onChange={this.updateCategory}
                />
                <button onClick={this.updateCategoryList}>Add Category</button>
            </div>
        )
    }
}

export default AddCategory;