import React from 'react';
import classes from './Palette.css';
//brain js neural network for picking appropriate text color based on background color
import textPicker from '../../../textColorizer';
import PropTypes from 'prop-types';

const mapRGBStringToObj = (rgbValue) => {
    //comes in as rgb(xx, yy, dd);
    const values = rgbValue.replace(/[^\d,?]/g, '').split(',');
    return {
        r: values[0] / 255,
        g: values[1] / 255,
        b: values[2] / 255
    }
}

const Palette = (props) => {
    const squares = props.colors.map((c, ind) => {
        const textColorResult = textPicker.run(mapRGBStringToObj(c.rgb));
        // text color result holds percentage of color should be black or white
        const textColor = textColorResult.black > textColorResult.white ? "#000" : "#fff";
        return (
            <div key={c.name + ind} style={{
                backgroundColor: c.hex,
                color: textColor
            }}>
                {c.hex}
            </div>
        )
    })
    return (
        <div className={classes.Palette}>
            {props.name}
            <div className={classes.squares}>
                {squares}
            </div>
        </div>
    );
}

Palette.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        hex: PropTypes.string,
        rgb: PropTypes.string
    })).isRequired,
    name: PropTypes.string.isRequired
}
export default Palette;