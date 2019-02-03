import React from 'react';

import { formatPrice } from '../helpers'

class Fish extends React.Component {
    render() {
        const  { image, name, price, desc, status } = this.props.details
        const isAvailable = status === 'available';


        return (
            <li className="menu-fish">
                <img src={image} alt={name}/>
                <h3 className="name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button 
                    onClick={() => this.props.addToOrder(this.props.index)} 
                    disabled={!isAvailable}>{isAvailable ? 'Add To Cart' : 'Sold Out'}
                </button>
            </li>
        )
    }
}

export default Fish;