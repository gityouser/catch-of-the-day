import React from 'react';

class EditFishForm extends React.Component {
    handleChange = (event) => {
        // update that fish
        // 1. Take a copy of the fish
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        };
        this.props.updateFish(this.props.index, updatedFish);
    }
    render() {
        const { fish: {name, price, status, desc, image}, deleteFish, index } = this.props;
        
        return <div className="fish-edit">
            <input 
                type="text" 
                name="name" 
                onChange={this.handleChange} 
                value={name} 
            />
            <input 
                type="text" 
                name="price" onChange={this.handleChange} 
                value={price} 
            />
            <select 
                type="text" 
                name="status" onChange={this.handleChange} 
                value={status} 
            >
                <option 
                    onChange={this.handleChange} 
                    value="available">Fresh!
                </option>
                <option 
                    onChange={this.handleChange} 
                    value="unavailable">Sold Out!
                </option>
            </select>
            <textarea 
                name="desc" 
                onChange={this.handleChange} 
                value={desc} 
            />
            <input 
                type="text" 
                name="image" 
                onChange={this.handleChange} 
                value={image} 
            />
            <button onClick={(e) => deleteFish(index)}>Remove Fish</button>
        </div>
    }
}

export default EditFishForm;