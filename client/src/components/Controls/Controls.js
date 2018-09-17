import React from 'react';

import * as actions from '../../store/actions/actions';

import classes from './Controls.css';
import Verticals from './Verticals/Verticals';

import Checkouts from './Checkouts/Checkouts';

import Button from '../UI/Button/Button';
import withLoader from '../../hoc/withLoader/withLoader';
import {connect} from 'react-redux';

const Controls = (props) => (
    <div className={classes.Controls}>
        <div className={classes.Tools}>
            <Button buttonType="Neutral" clicked={props.onResetCounts}>Reset</Button>
            <Button buttonType="Danger" clicked={props.deleteWebsites}>Clear Sites</Button>
        </div>
        <div className={classes.Tools}>
            <Button buttonType="Success" clicked={props.generateWebsites}>Preview!</Button>
            <Button clicked={() => {props.incrementVerticals(1)}}buttonType="Success">1</Button>
            <Button clicked={() => {props.incrementVerticals(5)}}buttonType="Success">5</Button>
            <Button clicked={() => {props.decrementVerticals(1)}}buttonType="Danger">1</Button>
            <Button clicked={() => {props.decrementVerticals(5)}}buttonType="Danger">5</Button>
        </div>
        <Verticals
            verticals={props.verticals}
            changeAVertical={props.onVerticalChangedHandler}
            incrementAVertical={props.onIncrementVertical} 
            decrementAVertical={props.onDecrementVertical} />
        <p>Default Checkout</p>
        <Checkouts selectedCheckout={props.defaultCheckout} onCheckoutChangedHandler={props.onCheckoutChangedHandler} />
        <Button buttonType="Success" clicked={props.generateWebsites}>Preview!</Button>
        <Button buttonType="Success" clicked={() => props.downloadWebsites(props.websites, props.globals)} enabled={props.websites.length > 0}>Download!</Button>
    </div>
)

const mapStateToProps = state => {
    return {
        verticals: {
            colon: state.controls.verticals.colon,
            diet: state.controls.verticals.diet,
            muscle: state.controls.verticals.muscle,
            male: state.controls.verticals.male,
            hair: state.controls.verticals.hair
        },
        defaultCheckout: state.controls.defaultCheckout,
        websites: state.websites,
        loading: state.random.palettesLoading,
        globals: state.globals,
    }
}

const mapDispatchToProps = dispatch => ({
    onIncrementVertical: (vertical, count) => dispatch(actions.incrementVertical(vertical, count)),
    onDecrementVertical: (vertical, count) => dispatch(actions.decrementVertical(vertical, count)),
    onVerticalChangedHandler: (vertical, count) => dispatch(actions.setVerticalCount(vertical, count)),
    incrementVerticals: (count) => dispatch(actions.incrementAllVerticals(count)),
    decrementVerticals: (count) => dispatch(actions.decrementAllVerticals(count)),
    onResetCounts: () => dispatch(actions.resetControl()),
    onCheckoutChangedHandler: (checkout) => dispatch(actions.setDefaultCheckout(checkout)),
    generateWebsites: () => dispatch(actions.onGenerateWebsites()),
    downloadWebsites: (websites, globals) => dispatch(actions.downloadWebsites(websites, globals)),
    deleteWebsites: () => dispatch(actions.deleteWebsites())
});

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(Controls, classes.Controls));