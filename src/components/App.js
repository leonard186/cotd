import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state={
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    };

    componentDidMount() {
        //first reinstate local storage
        const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
        if(localStorageRef) {
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate () {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    }

    componentWillUnmount() {
        console.log('unmounted');
        base.removeBinding(this.ref);
    }

    addFish = fish => {
        //1. Take a copy of the existing state
        const fishes = {...this.state.fishes};
        //2. Add our new fish to that fishes variable
         fishes[`fish-${Date.now()}`] = fish;
         //3. Set the new fishes object to state
        this.setState({
            fishes: fishes
        });
    };

    loadSamples = () => {
        this.setState({
            fishes: sampleFishes
        })
    };

    addToOrder = (key) => {
        //1. take a copy of the state
        const order = {...this.state.order};
        //2. Either add to the order, or update the number in our order
        order[key] = order[key] + 1 || 1;
        //3. call setState to update the state object
        this.setState({order});
    };

    editFish = (key, edited) => {
      let fishes = {...this.state.fishes};
      fishes[key] = edited;
      this.setState({fishes})
    };

    deleteFish = (key) => {
        //1. take a copy of the state
        const fishes = {...this.state.fishes};
        //2. update state
        fishes[key] = null;
        this.setState({fishes: fishes})
    };

    deleteOrder = (key) => {
        //1. take a copy of the state
        const order = {...this.state.order};
        //2.update state
        delete order[key];
        this.setState({order: order});
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="FRESH SEAFOOD MARKET" />
                    <ul>
                        {Object.keys(this.state.fishes).map(property => {
                            return <Fish
                                key={property}
                                details={this.state.fishes[property]}
                                addToOrder={this.addToOrder}
                                keyName={property}
                            />
                        })}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} removeOrder={this.deleteOrder}/>
                <Inventory
                    loadSamples={this.loadSamples}
                    addFish={this.addFish}
                    fish={this.state.fishes}
                    editFish={this.editFish}
                    deleteFish={this.deleteFish}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        );
    }
}

export default App;