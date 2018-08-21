import React from 'react';
import Input from '../../../UI/Input/Input';
import PropTypes from 'prop-types';

import classes from './Checkout.css';

const Checkout = (props) => {
    return ( 
        <Input 
            wrapperClasses={[classes.Checkout]} 
            value={props.checkout} 
            elementConfig={{type: 'radio', name: props.checkoutName, checked: props.checkout === props.selectedCheckout}} 
            inputType="input"
            label={props.checkoutLabel}
            changed={() => {props.changed(props.checkout)}}/>
    );
}

Checkout.propTypes = {
    checkout: PropTypes.string.isRequired,
    selectedCheckout: PropTypes.string.isRequired,
    changed: PropTypes.func.isRequired,
    checkoutName: PropTypes.string,
    checkoutLabel: PropTypes.string
}

export default Checkout;