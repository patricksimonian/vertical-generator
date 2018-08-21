import React from 'react';
import classes from './Input.css';
import PropTypes from 'prop-types';

const input = (props) => {
  let inputElement = null;
  let validationMessage= null;
  const inputClasses = [classes.InputElement].concat(props.inputClasses);
  //if input is invalid push invalid class to it so there is a red highlight
  if(props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  //if input should show some type of validation message it will show here
  if(props.showMessage && props.validationMessage && props.invalid && props.touched) {
    validationMessage = <p className={classes.Message}>{props.validationMessage}</p>
  }
  //depending on type return input element
  switch(props.elementType) {
    case ('input'):
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case ('textarea'):
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case ('select'):
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}>
          {props.elementConfig.options.map(option => (
              <option key={option.value} value={option.value}>
                  {option.displayValue}
              </option>
          ))}
        </select>
    );
      break;
    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
  }

  return (
    <div className={[classes.Input].concat(props.wrapperClasses).join(' ')}>
      <label className={classes.Label}>{props.label}</label>
      {validationMessage}
      {inputElement}
    </div>
  );
}

input.defaultProps = {
  inputClasses: [],
  wrapperClasses: []
}

input.propTypes = {
  inputClasses: PropTypes.arrayOf(PropTypes.string),
  wrapperClasses: PropTypes.arrayOf(PropTypes.string)
}

export default input;
