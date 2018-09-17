const path = require('path');
const paletteHelper = require('../helpers/palettes');
const fileHelper = require('../helpers/file');
const Promise = require('bluebird');
const ncp = Promise.promisify(require('ncp').ncp); //copy directory module

class Vertical {
  constructor(data, schema, checkout, globals) {
    this.data = data;
    this.schema = schema;
    this.checkout = checkout;
    this.globals = globals;
    return this.init();
  }

  buildFunnelJSONFromGlobals(destinationPath, globals) {
    return fileHelper.readContentsOfFile(destinationPath)
    .then((content) => {
      console.log('updating funnel.json with global settings');
      content = JSON.parse(content);
      content.funnel_support_email = globals.funnel_support_email;
      content.funnel_support_phone = globals.funnel_support_phone;
      content.address_inline = globals.address_inline; 
      content.address_formatted = globals.address_inline;
      content.signer_corp_name = globals.signer_corp_name;
      content.state_of_incorporation = globals.state_of_incorporation;
      return fileHelper.writeFile(destinationPath, JSON.stringify(content, null, 2));
    });
  }

  init() {
    let that = this;
    //create project boiilerplate for vertical
    return this.createDirectoryStructure(this.data.project_name, this.schema)
      .then((directoryResult) => {
        //path to created directory
        const destinationPath = directoryResult[0];
        //get entire color palette based on the desired color palette
        const fullColorPalette = that.getColorPaletteForVertical.call(that);
        //get correct content for project: vertical content, root CSS and checkout packaging content
        return that.getContentByVerticalType.apply(that, [
          destinationPath,
          that.data.vertical,
          fullColorPalette,
          that.data.package,
          that.checkout
        ]);
      })
      .spread((destinationPath, ingredients, mainContent, checkout, terms, rootCSS) => {
        //plug content into boiilerplate code in the project
        return that.writeContentToProjectDirectory(destinationPath, {
          ingredients,
          mainContent,
          checkout,
          terms,
          rootCSS
        }, that.checkout);
      })
      .spread((destinationPath) => {
        const funnelsJSONPath = path.join(destinationPath, '/storage/funnel.json');
        return that.buildFunnelJSONFromGlobals(funnelsJSONPath, that.globals);
      });
  }

  createDirectoryStructure(rootFolderName, schema) {
    const sourcePath = path.join(__dirname, `../database/${schema}`);
    const destinationPath = path.join(__dirname, `../temp/${rootFolderName}`);
    return ncp(sourcePath, destinationPath)
    .then(() => {
      return Promise.resolve([destinationPath, rootFolderName])
    });
  }

  getContentByVerticalType(destinationPath, vertical, fullColorPalette, checkoutPackage, checkout) {
    let that = this;
    return Promise.all([
      Promise.resolve(destinationPath), //to bring destinationpath to next func
      that.getIngredients(vertical),
      that.getMainContent(vertical),
      that.getCheckout(checkout),
      that.getTerms(checkout),
      that.getRootCSS(fullColorPalette)
    ]);
  }

  getColorPaletteForVertical() {
    return paletteHelper.getFullPalette(this.data.palette);
  }
  //this is where the schema would come in eventually to dictate where the
  //to write tertiary_dark_color
  writeContentToProjectDirectory(destinationPath, content) {
    const ingredientsPath = path.join(destinationPath, '/templates/ingredients.html');
    const indexPath = path.join(destinationPath, '/templates/index.html');
    const checkoutPath = path.join(destinationPath, '/templates/checkout.html');
    const termsPath = path.join(destinationPath, '/templates/terms.html');
    const rootCSSPath = path.join(destinationPath, '/css/root.css');
    return Promise.all([
      destinationPath,
      fileHelper.writeFile(ingredientsPath, content.ingredients),//create ingredient
      fileHelper.writeFile(termsPath, content.terms),//create terms
      fileHelper.writeContentsToFileByTag(indexPath, content.mainContent, '<%=main_content%>'), //replace main content
      fileHelper.writeContentsToFileByTag(checkoutPath, content.checkout, '<%=main_content%>'), //replace main content
      fileHelper.writeFile(rootCSSPath, content.rootCSS),//root css
    ]);
  }

  getCheckout(checkout) {
    let checkoutPackage = checkout.package;
    return fileHelper.readContentsOfFile(path.join(__dirname, '../database/content/checkout/', checkoutPackage));
  }

  getTerms(checkout) {
    let checkoutPackage = checkout.terms;
    return fileHelper.readContentsOfFile(path.join(__dirname, '../database/content/terms/', checkoutPackage));
  }

  getMainContent(vertical) {
    return fileHelper.readContentsOfFile(path.join(__dirname, '../database/content/index/', vertical + '.txt'));
  }

  getIngredients(vertical) {
    return fileHelper.readContentsOfFile(path.join(__dirname, '../database/content/ingredients/', vertical + '.html'));
  }

  getRootCSS(palette) {
    return fileHelper.readContentsOfFile(path.join(__dirname, '../database/content/root_css/css.txt'))
    .then((cssTemplate) => {
      //loop over pallete and fill in template tags with pallete
      let rootCSS = cssTemplate;
      palette.forEach((colorRule) => {
        rootCSS = rootCSS.replace(colorRule.tag, colorRule.color);
      });
      return Promise.resolve(rootCSS);
    });
  }
}

module.exports = Vertical;
