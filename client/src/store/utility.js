import Chance from 'chance';
const chance = new Chance();

export const updateObject = (oldObject, updatedValues) => {
    return {
      ...oldObject,
      ...updatedValues
    }
}


export const generateWebsite = (checkoutType, vertical, palettes) => {
    const name = vertical + '-' + chance.word({length: 4});
    const palette = palettes[Math.floor(Math.random() * palettes.length)].id;
    const formFlavor = '1';
    return {
      vertical,
      name,
      palette,
      formFlavor,
      id: chance.hash({length: 10}),
      selectedCheckout: checkoutType
    }
}