import React from 'react'
import { connect } from 'react-redux';
import classes from './GlobalSettings.css';

import formConfig from './formFields.js';
import Input from '../UI/Input/Input';

import * as actions from '../../store/actions/actions';

class GlobalSettings extends React.Component {
    render() {
        console.log(this.props);
        let inputs = [];
        for(let key in formConfig) {
            let field = formConfig[key];
            inputs.push({label: field.label, value: this.props.globals[key] || '', elementType: 'input', changed: (e) => {
                this.props.changeGlobal(key, e.target.value);
            }});
        }

        let inputElements = inputs.map(i => <Input {...i} key={i.label} />);
        //map over inputs in form and produce input components with an appropriate change handler 
        return (<div className={classes.GlobalSettings}> {inputElements}</div>)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeGlobal: (property, value) => dispatch(actions.changeGlobalSetting(property, value))
    }
}

const mapStateToProps = (state) => {
    return {
        globals: state.globals
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GlobalSettings);
