import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import AddCategory from './AddCategory'

class CategoryPicker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            showAddCategory: false
        }

        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.newCategory = this.newCategory.bind(this);
    }

    onCategoryChange(option) {
        this.setState({
            selectedCategory: option
        })
        this.props.updateCategory(option.label);
    }

    addCategory(newCategory) {
        this.setState({
            categories: this.state.categories.concat([newCategory]),
            showAddCategory: false
        })
    }

    newCategory() {
        this.setState({
            showAddCategory: true
        })
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
                    <AddCategory addCategory={this.addCategory} /> :
                    <button onClick={this.newCategory}> New Category </button>}
            </div>
        )
    }
}

export default CategoryPicker;