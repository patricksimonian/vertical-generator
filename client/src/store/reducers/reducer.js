import {updateObject, generateWebsite} from '../utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    controls: {
        verticals: {
            colon: 0,
            male: 0,
            muscle: 0,
            diet: 0,
            hair: 0,
        },
        defaultCheckout: '135CC'
    },
    checkouts: [
        ['135CC', '1+3+5_bottle_continuity_checkout'],
        ['135SC', '1+3+5_bottle_supply_checkout'],
        ['T1C', 'trial_+_1_bottle_checkout'],
        ['T135SSC', 'trial+1+3+5_supply_+_sample_checkout'],
        ['T135SC', 'trial+1+3+5_supply_checkout']
    ],
    random: {
        palettesLoading: false
    },
    globals: {

    },
    palettes: [],
    websites: [],
    loading: false,
    error: false
};

const setGlobals = (state, property, value) => {
    const globals = {...state.globals}
    globals[property] = value;
    return updateObject(state, {globals});
}

const decrementVertical = (state, vertical, count) => {
    const controls = {...state.controls, verticals: {...state.controls.verticals}};
    if(controls.verticals[vertical] !== undefined) {
        controls.verticals[vertical] -= count;
    }
    return updateObject(state, {controls});
}

const incrementVertical = (state, vertical, count) => {
    const controls = {...state.controls, verticals: {...state.controls.verticals}};
    if(controls.verticals[vertical] !== undefined) {
        controls.verticals[vertical] += count;
    }
    return updateObject(state, {controls});
}

const incrementVerticals = (state, count) => {
    const controls = {...state.controls, verticals: {...state.controls.verticals}};
    for(let key in controls.verticals) {
        controls.verticals[key] += count;
    }
    return updateObject(state, {controls});
}

const decrementVerticals = (state, count) => {
    const controls = {...state.controls, verticals: {...state.controls.verticals}};
    for(let key in controls.verticals) {
        controls.verticals[key] -= count;
    }
    return updateObject(state, {controls});
}

const setVerticalCount = (state, vertical, count) => {
    const controls = {...state.controls, verticals: {...state.controls.verticals}};
    if(controls.verticals[vertical] !== undefined) {
        count = count / 1;
        controls.verticals[vertical] = count || controls.verticals[vertical];
    }
    return updateObject(state, {controls});
}

const setDefaultCheckout = (state, checkout) => {
    const controls = {...state.controls};
    controls.defaultCheckout = checkout;
    return updateObject(state, {controls});
}

const resetControls = (state) => {
    const controls = {...initialState.controls}
    return updateObject(state, {controls});
}

const generateWebsites = (state) => {
    //grab num of website to generate from controls 
    const verticals = state.controls.verticals;
    const checkout = state.controls.defaultCheckout;
    let websitesToGen = [];
    for(let key in verticals) {
        if(verticals[key] > 0) {
            const flattenedVerticals = new Array(verticals[key]).fill(key);
            websitesToGen = websitesToGen.concat(flattenedVerticals);
        }
    }
    const websites = websitesToGen.map(w => generateWebsite(checkout, w, state.palettes));
    
    return updateObject(state, {websites});
}

const deleteWebsite = (state, id) => {
    const websites = state.websites.filter(ws => ws.id !== id);
    return updateObject(state, {websites});
}

const changeCheckoutForWebsite = (state, id, checkout) => {
    const websites = state.websites.map(ws => {
        if(ws.id === id) {
            return {...ws, selectedCheckout: checkout}
        } else {
            return ws;
        }
    })

    return updateObject(state, {websites});
}

const setColorPalettes = (state, palettes) => {
    return updateObject(state, {palettes, random: {loading: false}});
}

const setLoading = state => updateObject(state, {loading: true});

const clearWebsites = state => {
    return updateObject(state, {loading: false, websites: []});
}

const changeWebsitePalette = (state, id, paletteId) => {
    //find website by id and change palette

    const websites = state.websites.map(ws => {
        if(ws.id === id) {
            ws.palette = paletteId;
        }
        return ws;
    });

    return updateObject(state, {websites});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.DECREMENT_VERTICAL: return decrementVertical(state, action.payload.vertical, action.payload.count); 
        case actionTypes.INCREMENT_VERTICAL: return incrementVertical(state, action.payload.vertical, action.payload.count);
        case actionTypes.DECREMENT_VERTICALS: return decrementVerticals(state, action.payload.count); 
        case actionTypes.INCREMENT_VERTICALS: return incrementVerticals(state, action.payload.count);
        case actionTypes.SET_VERTICAL_COUNT: return setVerticalCount(state, action.payload.vertical, action.payload.count);
        case actionTypes.SET_DEFAULT_CHECKOUT: return setDefaultCheckout(state, action.payload.checkout);
        case actionTypes.RESET_CONTROL: return resetControls(state);
        case actionTypes.GENERATE_WEBSITES: return generateWebsites(state);
        case actionTypes.DELETE_WEBSITE: return deleteWebsite(state, action.payload.id);
        case actionTypes.CHANGE_WEBSITE_CHECKOUT: return changeCheckoutForWebsite(state, action.payload.id, action.payload.checkout);
        case actionTypes.FETCH_COLOR_PALETTES_START: 
            const random = {
                palettesLoading: true
            }
            return updateObject(state, {random});
        case actionTypes.FETCH_COLOR_PALETTES_SUCCESS: return setColorPalettes(state, action.payload.palettes);
        case actionTypes.DOWNLOAD_WEBSITES_START: return setLoading(state);
        case actionTypes.DOWNLOAD_WEBSITES_SUCCESS: return clearWebsites(state);
        case actionTypes.CHANGE_WEBSITE_PALETTE: return changeWebsitePalette(state, action.payload.id, action.payload.paletteId);
        case actionTypes.DELETE_WEBSITES: return clearWebsites(state);
        case actionTypes.CHANGE_GLOBAL_SETTING: return setGlobals(state, action.payload.property, action.payload.value);
        default: return initialState;
    }
}

export default reducer;