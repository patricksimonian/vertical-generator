import React from 'react';
import classes from './Website.css';
import Checkouts from '../../Controls/Checkouts/Checkouts';
import Palette from '../../PalettePicker/Palette/Palette';
import PalettePicker from '../../PalettePicker/PalettePicker';
class Website extends React.Component  {
    state = {
        viewingPalettePicker: false
    }

    componentDidUpdate() {
        // if(this.state.viewingPalettePicker) {
        //     this.setState({viewingPalettePicker: false});
        // }
    }

    paletteChanged = (id) => {
        this.setState({viewingPalettePicker: false}, () => {
            this.props.onPaletteChangedHandler(id);
        });
    }

    togglePalettePicker = (e) => {
        e.stopPropagation();
        this.setState({viewingPalettePicker: !this.state.viewingPalettePicker});
    }

    render() {
        const palettePicker = this.state.viewingPalettePicker ? 
            <PalettePicker paletteChanged={this.paletteChanged} selectedPalette={this.props.palette.id}/> :
            null;

        return ( 
            <div className={classes.Website}>
                <h1>{this.props.title}</h1>
                {palettePicker}
                <button onClick={this.props.onDeleteHandler} className={classes.Delete}>X</button>
                <button onClick={this.togglePalettePicker} className={classes.PaletteToggle}>{this.state.viewingPalettePicker ? 'close' : 'palettes'}</button>
                <Palette colors={this.props.palette.colors} name={this.props.palette.name} />
                <Checkouts 
                    selectedCheckout={this.props.selectedCheckout} 
                    onCheckoutChangedHandler={this.props.checkoutChanged}/>
            </div>
        );
    }
}
 

export default Website;