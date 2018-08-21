import React from 'react'
// import classes from './Checkouts.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Checkout from './Checkout/Checkout';

const Checkouts = (props) => {
    const checkouts = props.checkouts.map((c, ind) => (
        <Checkout 
            key={c[1]} 
            checkoutLabel={c[0]}
            checkout={c[0]}
            changed={() => {props.onCheckoutChangedHandler(c[0])}}
            selectedCheckout={props.selectedCheckout} />
    ));
    return checkouts;
}

const mapStateToProps = state => {
    return {
        checkouts: state.checkouts
    }
}

Checkouts.propTypes = {
    checkouts: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    selectedCheckout: PropTypes.string.isRequired,
    onCheckoutChangedHandler: PropTypes.func.isRequired
}

export default connect(mapStateToProps, null)(Checkouts);