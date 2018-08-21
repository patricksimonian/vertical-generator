import React, {Component} from 'react';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './withLoader.css';

//load styles shuold either be a class name that you want bound to the loading container
//or an object that is a react inline style object
const withLoader = (WrappedComponent, loadStyles = '', customMessage = '') => (props) => {
    if(typeof customMessage !== 'string') throw new Error('Custom Message must be a string');
    const {loading, ...rest} = props;
    let extraClass = typeof loadStyles === 'string' ? loadStyles : '';
    let inlineStyles = typeof loadStyles === 'object' ? loadStyles : {};

    if(loading) {
        return (
            <div className={[classes.WithLoader, extraClass].join(' ')} style={{...inlineStyles}}>
                <Spinner />
                <h1>{customMessage ? customMessage : 'Loading'}</h1>
            </div>
        );
    } else {
        return <WrappedComponent {...rest} />
    }
}

export default withLoader;
