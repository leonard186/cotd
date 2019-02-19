import React from 'react';

class Login extends React.Component {
    state = {
        emailAuth: false
    };

    render() {
        return (
            <nav className="login">
                <h2>Inventory Login</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="github" onClick={() => this.props.authenticate('Github')}>Login with Github</button>
                <button className="facebook" onClick={() => this.props.authenticate('Facebook')}>Login with Facebook
                </button>
                <button className="twitter" onClick={() => this.props.authenticate('Twitter')}>Login with Twitter</button>
            </nav>
        )
    }
}

export default Login;