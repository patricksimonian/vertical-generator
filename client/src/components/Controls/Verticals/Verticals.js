import React from 'react';
import Vertical from './Vertical/Vertical';
import PropTypes from 'prop-types';

const Verticals = (props) => {
    const verticals = Object.keys(props.verticals).map((v, ind) => (
        <Vertical 
            vertical={v}
            count={props.verticals[v]}
            key={v + `_${ind}`}
            changed={(count) => {props.changeAVertical(v, count)}}
            increment={(count) => {props.incrementAVertical(v, count)}}
            decrement={(count) => {props.decrementAVertical(v, count)}}
        />
    ));
    return verticals;
}

Verticals.propTypes = {
    verticals: PropTypes.objectOf(PropTypes.number)
}

export default Verticals;