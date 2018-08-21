import React from 'react';
import classes from './Website.css';
import Checkouts from '../../Controls/Checkouts/Checkouts';
import Palette from '../../PalettePicker/Palette/Palette';

const Website = (props) => {
    return ( 
        <div className={classes.Website}>
            <h1>{props.title}</h1>
            <button onClick={props.onDeleteHandler} className={classes.Delete}>X</button>
            <Palette colors={props.palette.colors} name={props.palette.name} />
            <Checkouts selectedCheckout={props.selectedCheckout} onCheckoutChangedHandler={props.checkoutChanged}/>
        </div>
    );
}
 

export default Website;