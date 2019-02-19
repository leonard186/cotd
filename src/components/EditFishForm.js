import React from 'react';
import PropTypes from 'prop-types';

export class EditFishForm extends React.Component {
    static propTypes = {
        fish: PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.number,
            status: PropTypes.string,
            image: PropTypes.string,
            desc: PropTypes.string
        }),
        fishName: PropTypes.string,
    };

    handleChange = (e) => {
        let currentValue = e.currentTarget.value;
        console.log(currentValue);
        //1 Take a copy of current fish
        const updateFish = {
            ...this.props.fish,
            [e.currentTarget.name]: currentValue
        };
        this.props.editFish(this.props.fishName, updateFish)
    };

    handleClick = () => {
     this.props.deleteFish(this.props.fishName)
    };

    render() {
        return (
            <div className="fish-edit">
                <input type="text" onChange={this.handleChange} name="name" value={this.props.fish.name} />
                <input type="text" onChange={this.handleChange} name="price" value={this.props.fish.price} />
                <select name="status" onChange={this.handleChange} value={this.props.fish.status}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc} />
                <input type="text" onChange={this.handleChange} name="image" value={this.props.fish.image} />
                <button onClick={this.handleClick}>Remove Fish</button>
            </div>
        )
    }
}