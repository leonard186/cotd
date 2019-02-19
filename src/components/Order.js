import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from "../helpers";
import {TransitionGroup, CSSTransition} from 'react-transition-group';

class Order extends React.Component {
    static propTypes = {
        removeOrder: PropTypes.func,
        fishes: PropTypes.object,
        order: PropTypes.object
    };

    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        //make sure the fish is loaded before we continue
        if(!fish) return null;
        //if fish is available show fish
        if(fish.status === 'available') {
            return (
                <CSSTransition classNames="order" key={key} timeout={{enter: 250, exit: 250}}>
                    <li key={key}>
                        <span>
                            <TransitionGroup component="span" className="count">
                                <CSSTransition classNames="count" key={count} timeout={{enter: 250, exit: 250}}>
                                    <span>{count}</span>
                                </CSSTransition>
                            </TransitionGroup>

                            Kg <i>{fish.name}</i> {formatPrice(count * fish.price)}
                            <button onClick={() => this.props.removeOrder(key)}>&times;</button>
                        </span>
                    </li>
                </CSSTransition>
            )
        } else { //if fish is unavailable show no fish message
            return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available</li>
        }
    };

    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, currentValue) => {
            const fish = this.props.fishes[currentValue];
            const count = this.props.order[currentValue];
            const isAvailable = fish && fish.status === 'available';

            if(isAvailable) {
                return prevTotal + (count * fish.price)
            }

            return prevTotal;
        }, 0);

        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div>
                    Total:
                    <strong> {formatPrice(total)}</strong>
                </div>
            </div>
        )
    }
}

export default Order