import React from 'react';
import Website from './Website/Website';
import classes from './Websites.css';
import * as actions from '../../store/actions/actions';

import {connect} from 'react-redux';
const Websites = (props) => {
    const websites = props.websites.map(ws => {
        const paletteInd = props.palettes.findIndex(p => p.id === ws.palette);
        const palette = {...props.palettes[paletteInd]};
        palette.colors = palette.colors.map(c => ({...c}));
        return (
            <Website
                key={ws.id}
                title={ws.name}
                palette={palette}
                form={ws.form}
                vertical={ws.vertical}
                selectedCheckout={ws.selectedCheckout}
                onDeleteHandler={() => {
                    props.removeWebsite(ws.id);
                }}
                onPaletteChangedHandler={(paletteId) => {
                    props.changePaletteForWebsite(ws.id, paletteId);
                }}
                checkoutChanged={(checkout) => {
                    console.log(props);
                    props.websiteCheckoutChanged(ws.id, checkout);
                }}/>
        );

    });
    return (
        <div className={classes.Websites}>
            {websites}
        </div>
    );
}

Websites.propTypes = {

}

const mapStateToProps = (state) => {
    return {
        websites: state.websites,
        palettes: state.palettes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        websiteCheckoutChanged: (id, checkout) => dispatch(actions.changeWebsiteCheckout(id, checkout)),
        removeWebsite: (id) => dispatch(actions.deleteWebsite(id)),
        changePaletteForWebsite: (id, paletteId) => dispatch(actions.changeWebsitePalette(id, paletteId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Websites);