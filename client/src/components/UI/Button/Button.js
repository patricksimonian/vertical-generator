import React from 'react';
import classes from './Button.css';

const button = (props) => (
  <button
    disabled={!props.enabled}
    onClick={props.clicked}
    className={[classes.Button, classes[props.buttonType]].join(" ")}>{props.children}</button>
);

button.displayName = '[Component Button]';

button.defaultProps = {
  enabled: true
}
export default button;
