import React from 'react';
import base from '../base';

import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from "../sample-fishes"
import Fish from "./Fish"

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        const { params } = this.props.match
        // first reinstate the localStorage
        const localStorageRef = localStorage.getItem(`${params.storeId}`)
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }
        console.log(localStorageRef);
        console.log(JSON.parse(localStorageRef));
        
        
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate() {
        console.log('%c match.params: ', 'background: darkgreen', this.props.match.params.storeId );
        
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    }

    componentWillUnmount() {
        base.removeBinding(this.ref)
    }


    addFish = (fish) => {
        // 1. Take a copy of the existing state
        const fishes = { ...this.state.fishes };
        // 2. Add our new fish to that fishes variable
        fishes[`${Date.now()}`] = fish;
        // 3. Set the new fishes object to state
        this.setState({ fishes });
    };

    updateFish = (key, updatedFish) => {
        // 1. Take a copy of the current state
        const fishes = {...this.state.fishes}
        // 2 Update that state
        fishes[key] = updatedFish;
        // 3. Set that to state
        this.setState({ fishes });
    }

    deleteFish = (key) => {
        // 1. Take a copy of state
        const fishes = {...this.state.fishes}
        // 2. Update the state
        fishes[key] = null;
        // 3. Update state
        this.setState({ fishes })
    }

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes,
        })
    }

    addToOrder = (key) => {
        // 1. Take a copy of state
        const order = { ...this.state.order }
        // 2. Either add to the order, or update the number in our order
        order[key] = order[key] + 1 || 1
        // 3. Call setState to update state object
        this.setState({ order: order })
    }

    removeFromOrder = (key) => {
                // 1. Take a copy of state
                const order = { ...this.state.order }
                // 2. Remove that item from order
                delete order[key]
                // 3. Call setState to update state object
                this.setState({ order })
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline={"Fresh sea food today!"}/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} 
                            details={this.state.fishes[key]} 
                            addToOrder={this.addToOrder} 
                            index={key}/>)}
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes}
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory 
                    loadSampleFishes={this.loadSampleFishes}
                    addFish={this.addFish} 
                    updateFish={this.updateFish} 
                    fishes={this.state.fishes}
                    deleteFish={this.deleteFish}
                />
            </div>
        )
    }
}

export default App;