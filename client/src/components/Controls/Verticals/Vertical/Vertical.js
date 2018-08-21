import React from 'react';
import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import classes from './Vertical.css';
const Vertical = (props) => {
    return ( 
        <div className={classes.Vertical}>
            <Input label={props.vertical} inputClasses={[classes.Input]} elementType="input" type="number" min="0" value={props.count} changed={(e) => {props.changed(e.target.value)}}/>
            <Button buttonType="Neutral" clicked={() => {props.increment(1)}}>1</Button>
            <Button buttonType="Neutral" clicked={() => {props.increment(5)}}>5</Button>
            <Button buttonType="Danger" clicked={() => {props.decrement(1)}}>1</Button>
            <Button buttonType="Danger" clicked={() => {props.decrement(5)}}>5</Button>
        </div>
    );
}

Vertical.propTypes = {

}

export default Vertical;