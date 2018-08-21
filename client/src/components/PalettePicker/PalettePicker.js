import React from 'react';
import {connect} from 'react-redux';
import Palette from './Palette/Palette';
import classes from './PalettePicker.css';
import Input from '../UI/Input/Input';
class PalettePicker extends React.Component {
    state = {
        paletteKeywords: '',
        palettes: [],
        filteredPalettes: []
    }

    componentDidMount() {
        const palettes = this.props.palettes.map(p => ({
            ...p, 
            colors: p.colors.map(color => ({...color})), 
            primary: {...p.primary},
            secondary: {...p.secondary},
            tertiary: {...p.tertiary},
            compliment: {...p.compliment}
        }));

        this.setState({palettes, filteredPalettes: palettes});
    }

    paletteKeywordsChanged = e => {
        const keywords = e.target.value.trim();
        const re = new RegExp(keywords, 'i');
        //filter palettes
        let filteredPalettes = [];
        if(keywords === '') {
            filteredPalettes = this.state.palettes;
        } else {
            filteredPalettes = this.state.palettes.filter(p => re.test(p.name));
        }
        this.setState({keywords, filteredPalettes});
    }
    
    render() {
        const palettes = this.state.filteredPalettes.map(p => (
            <li className={p.id === this.props.selectedPalette ? classes.Active : ''} onClick={() => this.props.paletteChanged(p.id)} 
                key={p.id}>
                <Palette  colors={p.colors} name={p.name}/>
            </li>
        ));

        return (
            <div className={classes.PalettePicker}>
                <Input changed={this.paletteKeywordsChanged} elementConfig={{placeholder: 'search palettes'}}/>
                <ul>
                    {palettes}
                </ul>
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        palettes: state.palettes
    }
}

export default connect(mapStateToProps)(PalettePicker);