import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import AddCategory from './AddCategory'
require('../static/css/CategoryPicker.css')

/*
A component for picking a category for your task.
*/
class CategoryPicker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            showAddCategory: false
        }

        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.newCategory = this.newCategory.bind(this);
        this.refreshCategories = this.refreshCategories.bind(this);
    }

    onCategoryChange(option) {
        this.setState({
            selectedCategory: option
        });
        this.props.updateCategory(option.label);
    }

    newCategory() {
        this.setState({
            showAddCategory: true
        })
    }

    refreshCategories = async () => {
        var categoryObjArray = await this.getCategories();
        var categoryArray = [];

        for (var i = 0; i < categoryObjArray.length; i++) {
            categoryArray.push(categoryObjArray[i].category);
        }

        this.setState({
            categories: categoryArray
        });
    }

    componentDidMount = async () => {
        this.refreshCategories();
    }

    getCategories = async () => {
        const request = {
            credentials: 'include',
            method: 'GET',
        }

        const response = await fetch('/api/getcategories/', request);
        const body = await response.json();
        return body;
    }

    render() { 
        return (
            <div>
                <Dropdown
                    options={this.state.categories}
                    onChange={this.onCategoryChange}
                    value={this.state.selectedCategory}
                    placeholder="Click me to select a category for your task."
                />
                {this.state.showAddCategory ?
                    <AddCategory refresh={this.refreshCategories} /> :
                    <button onClick={this.newCategory}> New Category </button>}
            </div>
        )
    }
}

export default CategoryPicker;