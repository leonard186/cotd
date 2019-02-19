import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import {EditFishForm} from "./EditFishForm";
import Login from './login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {

    state = {
        uid: null,
        owner: null,
    };

    static propTypes = {
        addFish: PropTypes.func,
        loadSamples: PropTypes.func,
        fish: PropTypes.object,
        editFish: PropTypes.func,
        deleteFish: PropTypes.func,
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({user})
            }
        })
    }

    authHandler = async (authData) => {
        //1. look up the current store in the firebase database
        const store = await base.fetch(this.props.storeId, {context: this});
        //2. claim it if there is no owner
        if(!store.owner) {
            //save it as our own
            await base.post(`${this.props.storeId}/owner`, {data: authData.user.uid})
        }
        //3. set state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
    };

    logout = async () => {
        console.log('logging out');
        await firebase.auth().signOut();
        this.setState({uid: null})
    };

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler)
    };

    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>;
        //check if they are logged in
        if(!this.state.uid) {
            return <Login authenticate={this.authenticate} />;
        }
        //2.check if they are not the owner of the store
        if(this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry you are not the owner of this store</p>
                    {logout}
                </div>
            )
        }
        //3. They must be the owner, render the inventory
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
                {Object.keys(this.props.fish).map(fish => <EditFishForm
                    editFish={this.props.editFish}
                    key={fish}
                    fishName={fish}
                    fish={this.props.fish[fish]}
                    deleteFish={this.props.deleteFish}
                />)}
            </div>
        );
    }
}

Login.propTypes = {
    authenticate: PropTypes.func.isRequired,
    //storeId: PropTypes.object.isRequired
};

export default Inventory