import * as actionTypes from './actionTypes';
import axios from '../../axios';
// sync actions
export const incrementVertical = (vertical, count) => {
    return {
        type: actionTypes.INCREMENT_VERTICAL,
        payload: {
            vertical,
            count
        }
    }
}

export const decrementVertical = (vertical, count) => {
    return {
        type: actionTypes.DECREMENT_VERTICAL,
        payload: {
            vertical,
            count
        }
    }
}

export const incrementAllVerticals = (count) => {
    return {
        type: actionTypes.INCREMENT_VERTICALS,
        payload: {
            count
        }
    }
}

export const decrementAllVerticals = (count) => {
    return {
        type: actionTypes.DECREMENT_VERTICALS,
        payload: {
            count
        }
    }
}
export const setVerticalCount = (vertical, count) => {
    return {
        type: actionTypes.SET_VERTICAL_COUNT,
        payload: {
            vertical,
            count
        }
    }
}

export const resetControl = () => {
    return {
        type: actionTypes.RESET_CONTROL
    }
}

export const setDefaultCheckout = (checkout) => {
    return {
        type: actionTypes.SET_DEFAULT_CHECKOUT,
        payload: {
            checkout
        }
    }
}

export const generateWebsites = () => {
    return {
        type: actionTypes.GENERATE_WEBSITES
    }
}

export const changeWebsiteCheckout = (id, checkout) => {
    return {
        type: actionTypes.CHANGE_WEBSITE_CHECKOUT,
        payload: {
            id,
            checkout
        }
    }
}

export const deleteWebsites = () => {
    return {
        type: actionTypes.DELETE_WEBSITES
    }
}

export const deleteWebsite = (id) => {
    return {
        type: actionTypes.DELETE_WEBSITE,
        payload: {
            id
        }
    }
}
// color palettes
export const fetchColorPalettesStart = () => {
    return {
        type: actionTypes.FETCH_COLOR_PALETTES_START
    }
}

export const fetchColorPalettesFailed = () => {
    return {
        type: actionTypes.FETCH_COLOR_PALETTES_FAILED
    }
}

export const fetchColorPalettesSuccess = (palettes) => {
    return {
        type: actionTypes.FETCH_COLOR_PALETTES_SUCCESS,
        payload: {
            palettes
        }
    }
}

// downloading websites
export const downloadWebsitesStart = () => {
    return {
        type: actionTypes.DOWNLOAD_WEBSITES_START
    }
}

export const downloadWebsitesSuccess = () => {
    return {
        type: actionTypes.DOWNLOAD_WEBSITES_SUCCESS
    }
}

export const downloadWebsitesFailed = () => {
    return {
        type: actionTypes.DOWNLOAD_WEBSITES_FAILED
    }
}

export const changeWebsitePalette = (id, paletteId) => {
    return {
        type: actionTypes.CHANGE_WEBSITE_PALETTE,
        payload: {
            id,
            paletteId
        }
    }
}
// async
export const onGenerateWebsites = () => {
    return (dispatch) => {
        dispatch(generateWebsites());
        dispatch(resetControl());
    }
}

export const fetchColorPalettes = () => {
    return (dispatch) => {
        dispatch(fetchColorPalettesStart());
        axios.get('/palettes')
        .then(res => {
            dispatch(fetchColorPalettesSuccess(res.data));
        })
        .catch(err => {
            dispatch(fetchColorPalettesFailed());
        });
    }
}

export const downloadWebsites = (websites) => {
    return (dispatch) => {
        dispatch(downloadWebsitesStart());
        const payload = websites.map(ws => {
            return {
                vertical: ws.vertical,
                palette: ws.palette,
                project_name: ws.name,
                package: ws.selectedCheckout,
                id: ws.id,
                form: ws.formFlavor
            }
        })
        axios.post('/v1/verticals', {
            payload
        })
        .then(res => {
            dispatch(downloadWebsitesSuccess());
        })
        .catch(err => {
            dispatch(downloadWebsitesFailed());
        });
    }
}