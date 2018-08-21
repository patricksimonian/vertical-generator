import React, { Component } from 'react';
import classes from './App.css';
// components
import Controls from '../../components/Controls/Controls';
import Websites from '../../components/Websites/Websites';
import * as actions from '../../store/actions/actions';
import {connect} from 'react-redux';

class App extends Component {
  componentDidMount() {
    //fetch color palettes
    this.props.fetchPalettes();
  }


  render() {
    return (
      <div className={classes.App}>
        <Controls />
        <Websites />
      </div>
    );
  }

}
const mapStateToProps = (state) => {
  return {
    palettes: state.palettes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPalettes: () => dispatch(actions.fetchColorPalettes())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
