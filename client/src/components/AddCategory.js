import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton'

class AddCategory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newCategory: ''
        }

        this.updateNewCategory = this.updateNewCategory.bind(this);
        this.updateCategoryList = this.updateCategoryList.bind(this);
    }

    updateNewCategory(e) {
        this.setState({
            newCategory: e.target.value
        })
    }

    updateCategoryList() {
        this.props.addCategory(this.state.newCategory);
        this.setState({
            newCategory: ''
        })
    }

    render() {
        return (
            <div>
                <input
                type="text"
                value={this.state.newCategory}
                onChange={this.updateNewCategory}
                />
                <button onClick={this.updateCategoryList}>Add Category</button>
            </div>
        )
    }
}

export default AddCategory;