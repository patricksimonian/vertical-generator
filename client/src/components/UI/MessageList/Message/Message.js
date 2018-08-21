import React from 'react';
import classes from './Message.css';

const Message = (props) => (<li className={classes.Message}>{props.children}</li>);

export default Message;
