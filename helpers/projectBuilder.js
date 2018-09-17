// main handler of project building
const Promise = require('bluebird');
const paletteHelper = require('../helpers/palettes');
const schemas = require('../database/schema.json');
const funnelsData = require('../database/storage/funnel.json');
const Vertical = require('./Vertical');
// checkout types and there related txt files
const checkouts = {
  '135CC': {
    package: '1+3+5_bottle_continuity_checkout.txt',
    terms: '1+3+5_bottle_continuity_terms.txt'
  },
  '135SC': {
    package: '1+3+5_bottle_supply_checkout.txt',
    terms: '1+3+5_bottle_supply_terms.txt'
  },
  T1C: {
    package: 'trial_+_1_bottle_checkout.txt',
    terms: 'trial_+_1_bottle_terms.txt'
  },
  T135SSC: {
    package: 'trial+1+3+5_supply_+_sample_checkout.txt',
    terms: 'trial+1+3+5_supply_+_sample_terms.txt'
  },
  T135SC: {
    package: 'trial+1+3+5_supply_checkout.txt',
    terms: 'trial+1+3+5_supply_terms.txt'
  }
}
// obj of valid verticals that will be compared against
const verticals = {
  colon: true,
  male: true,
  diet: true,
  muscle: true,
  hair: true
}

class ProjectBuilder {
  constructor(verticals, options) {
    this.verticalsRaw = verticals;
    this.options = Object.assign({
      garunteedUnique: false,
      schema: null
    }, options);
    this.folderNames = [];
    return this;
  }

  build() {
    //are we operating under the correct schema? (not being used yet)
    if(this.options.schema === null
      || !schemas[this.options.schema]) {
         throw new Error('Incorrect SCHEMA VERSION');
       }
    const verticals = this.verticalsRaw;
    if(!(verticals instanceof Array)) throw new Error('INVALID DATA TYPE');
    //loop over verticals and create all project directories
    return Promise.all(this.createProjects(verticals));
  }
  //creates a singular project folder with all assets based on vertical
  //as well as color palette
  createProjects(verticals) {
    //creates directory structure based on current schema
    return verticals.map((vertical) => {
      if(this.options.garunteedUnique) {
        vertical.project_name += Date.now().toString().slice(8);
      }
      return new Vertical(vertical, this.options.schema, checkouts[vertical.package]);
    });
  }

  static verifyGlobals(globals) {
    let errors = {
      errors: [],
      error: false
    };
    if(Object.keys(globals).length < 6) {
      errors.errors = ['Global Settings incomplete'];
      errors.error = true;
    }
    for(let key in globals) {
      if(!funnels[key] || globals[key].length === 0) {
        errors.push('Global Funnel Setting ' + key + 'doesn\'t exist or was left blank');
      }
    }
    errors.error = errors.errors.length > 0;
    return errors;
  }

  static verifyVerticals(verticalsData) {
    if(!(verticalsData instanceof Array)) {
      throw new Error('verticalsData must be of type Array[[Object]] or a singular Object');
    }
    let errors = [];
    //verify each project objext that it has the correct values and exists
    verticalsData.forEach((vertical) => {
      let verticalError = {
        vertical,
        messages: []
      }
      //does vertical have valid checkout?
      if(!checkouts[vertical.package]) {
        verticalError.messages.push('vertical package incorrect');
      }
      //does color palette exist
      if(!paletteHelper.hasPalette(vertical.palette)) {
        verticalError.messages.push('vertical color palette doesn\'t exist');
      }
      //does vertical match?
      if(!verticals.hasOwnProperty(vertical.vertical)) {
        verticalError.messages.push('vertical couldn\'t be found');
      }
      if(verticalError.messages.length > 0) {
        errors.push(verticalError);
      }
    });
    return {error: errors.length > 0, errors};
  }
}

module.exports = ProjectBuilder;
