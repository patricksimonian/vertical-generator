import React, { Component } from 'react';
import classes from './App.css';
// components
import Controls from '../../components/Controls/Controls';
import Websites from '../../components/Websites/Websites';
import GlobalSettings from '../../components/GlobalSettings/GlobalSettings';
import * as actions from '../../store/actions/actions';
import {connect} from 'react-redux';
import withLoader from '../../hoc/withLoader/withLoader';

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
        <GlobalSettings />
      </div>
    );
  }

}
const mapStateToProps = (state) => {
  return {
    palettes: state.palettes,
    loading: state.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPalettes: () => dispatch(actions.fetchColorPalettes())
  }
}
const loadingComponent = withLoader(App, null, 'Downloading To Local...');

export default connect(mapStateToProps, mapDispatchToProps)(loadingComponent);