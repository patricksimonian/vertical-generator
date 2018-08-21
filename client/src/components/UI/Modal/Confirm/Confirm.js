import React from 'react';
import Modal from '../Modal';
import Button from '../../Button/Button';
const Confirm = (props) => (
  <Modal show modalClosed={props.closeView}>
    <h2>{props.message}</h2>
    <Button
      buttonType="Danger"
      clicked={props.confirmed}>{props.confirmName}</Button>
    <Button
      buttonType="Neutral"
      clicked={props.canceled}>{props.cancelName}</Button>
  </Modal>
);

export default Confirm;
