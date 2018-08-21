const palettes = require('../database/palette.json');
const color = require('color');

function _findPalette(paletteID) {
  const ind = palettes.findIndex((palette) => {
    return palette.id === paletteID;
  });

  return ind > -1 ? palettes[ind] : null;
}
//palettes comes with 4 base colours, all other colours are made from those
//four base colours. We will return a new palette obj that contains all colour
// variations which are:
// -primary dark, light,
// -secondary dark, light
// -tertiary dark, light
// -quarternary dark, light [referred to as compliment in obj]

function _getTemplateColoursFromPalette(paletteID) {
  const palette = _findPalette(paletteID);
  let template = [];
  if(palette) {
    const primary = palette.primary.hex;
    const secondary = palette.secondary.hex;
    const tertiary = palette.tertiary.hex;
    const compliment = palette.compliment.hex;
    const isPrimaryLight = color(primary).isLight();
    let primaryText;
    //does palette have a text color?
    //if not we will attempt to generate one based off of primary color
    if(!palette.text) {
      primaryText = isPrimaryLight ? '#000' : color(primary).negate().lighten(0.5).toString();
    } else {
      primaryText = palette.text.hex;
    }
    const alterMethod = isPrimaryLight ? color.prototype.darken : color.prototype.lighten;
    template = [
      { tag: '<%=primary_color%>', color: primary },
      { tag: '<%=primary_dark_color%>', color: color(primary).darken(0.2).string() },
      { tag: '<%=primary_primary_color_alpha%>', color: color(primary).fade(0.75).string() },
      { tag: '<%=secondary_primary_color_alpha%>', color: color(primary).fade(0.5).string() },
      { tag: '<%=primary_light_color%>', color: color(primary).lighten(0.2).string() },
      { tag: '<%=secondary_color%>', color: secondary },
      { tag: '<%=secondary_dark_color%>', color: color(secondary).darken(0.2).string() },
      { tag: '<%=primary_secondary_color_alpha%>', color: color(secondary).fade(0.9).string() },
      { tag: '<%=secondary_secondary_color_alpha%>', color: color(secondary).fade(0.7).string() },
      { tag: '<%=secondary_light_color%>', color: color(secondary).lighten(0.2).string() },
      { tag: '<%=tertiary_color%>', color: tertiary },
      { tag: '<%=tertiary_dark_color%>', color: color(tertiary).darken(0.2).string() },
      { tag: '<%=primary_tertiary_color_alpha%>', color: color(tertiary).fade(1).string() },
      { tag: '<%=secondary_tertiary_color_alpha%>', color: color(tertiary).fade(1).string() },
      { tag: '<%=tertiary_light_color%>', color: color(tertiary).lighten(0.2).string() },
      { tag: '<%=compliment_color%>', color: compliment },
      { tag: '<%=compliment_dark_color%>', color: color(compliment).darken(0.2).string() },
      { tag: '<%=primary_compliment_color_alpha%>', color: color(compliment).fade(0.75).string() },
      { tag: '<%=secondary_compliment_color_alpha%>', color: color(compliment).fade(0.5).string() },
      { tag: '<%=quinary_light_color%>', color: color(compliment).lighten(0.2).string() },
      { tag: '<%=quinary_color%>', color: compliment },
      { tag: '<%=quinary_dark_color%>', color: color(compliment).darken(0.2).string() },
      { tag: '<%=primary_quinary_color_alpha%>', color: color(compliment).fade(0.75).string() },
      { tag: '<%=secondary_quinary_color_alpha%>', color: color(compliment).fade(0.5).string() },
      { tag: '<%=senary_light_color%>', color: color(compliment).lighten(0.2).string() },
      { tag: '<%=senary_color%>', color: compliment },
      { tag: '<%=senary_dark_color%>', color: color(compliment).darken(0.2).string() },
      { tag: '<%=primary_senary_color_alpha%>', color: color(compliment).fade(0.75).string() },
      { tag: '<%=secondary_senary_color_alpha%>', color: color(compliment).fade(0.5).string() },
      { tag: '<%=senary_light_color%>', color: color(compliment).lighten(0.2).string() },
      { tag: '<%=design_primary_offset_color', color: color(primary).desaturate(0.1).string() },
      { tag: '<%=design_secondary_offset_color', color: color(secondary).desaturate(0.1).string() },
      { tag: '<%=design_tertiary_offset_color', color: color(tertiary).desaturate(0.1).string() },
      { tag: '<%=design_primary_offset_color_alpha', color: color(primary).desaturate(0.1).fade(0.65).string() },
      { tag: '<%=design_secondary_offset_color_alpha', color: color(secondary).desaturate(0.1).fade(0.85).string() },
      { tag: '<%=design_tertiary_offset_color_alpha', color: color(tertiary).desaturate(0.1).fade(1).string() },
      { tag: '<%=radial_gradient_inner%>', color: color(primary).lighten(0.2).fade(0.5).toString() },
      { tag: '<%=radial_gradient_outer%>', color: color(primary).fade(0.1).toString() },
      { tag: '<%=primary_text_color%>', color: primaryText },
      { tag: '<%=tertiary_text_color%>', color: alterMethod.call(color(primaryText), 0.1).toString() },
      { tag: '<%=link_normal_color%>', color: alterMethod.call(color(primaryText), 0.13).toString() },
      { tag: '<%=link_hover_color%>', color: alterMethod.call(color(primaryText), 0.7).toString() },
      { tag: '<%=link_active_color%>', color: alterMethod.call(color(primaryText), 0.4).toString() },
      { tag: '<%=alt_link_normal_color%>', color: alterMethod.call(color(primaryText), 0.16).toString() },
      { tag: '<%=alt_link_hover_color%>', color: alterMethod.call(color(primaryText), 0.20).toString() },
      { tag: '<%=alt_link_active_color%>', color: alterMethod.call(color(primaryText), 0.7).toString() }
    ];
  }
  return template;
}

module.exports = {
  getFullPalette: (paletteID) => {
    return _getTemplateColoursFromPalette(paletteID);
  },
  getPalettes: () => {
    return palettes;
  },
  hasPalette: (palette) => {
    return _findPalette(palette) !== null;
  }
}
