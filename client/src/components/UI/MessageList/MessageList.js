import React from 'react';
import classes from './MessageList.css';
import Message from './Message/Message';
const MessageList = (props) => {
  let messages = null;
  if(props.messages) {
    messages = props.messages.map((m, i)=> <Message key={i + m}>{m}</Message>);
  }
  return (
    <ul className={[classes.MessageList].concat(props.messageType).join(' ')} >
      {messages}
    </ul>
  )
};

export default MessageList;
