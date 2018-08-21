// read and file writer
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

module.exports = {
  readContentsOfFile: function readContentsOfFile(source) {
    return fs.readFileAsync(source, 'utf8');
  },
  writeFile: function writeFile(dest, content) {
    return fs.writeFileAsync(dest, content);
  },
  //replaces a special tag with your desired content
  // tag is a special alphanunmerical value placed in the destination that
  // is regexable and replaced by the content
  // please note the regex is not a global replace!
  writeContentsToFileByTag: function writeContentsToFileByTag(dest, content, tag) {
    return this.readContentsOfFile(dest)
      .then((fileContents) => {
        fileContents = fileContents.replace(tag, content);
        return this.writeFile(dest, fileContents);
      });
  },
  //replaces a special tag in your target file with contents from another file
  writeContentsToFileByTagFromFile: function writeContentsToFileByTagFromFile(source, dest, tag) {
    return this.readContentsOfFile(source)
      .then((sourceContent) => {
        return this.writeContentsToFileByTag(dest, sourceContent, tag);
      });
  }
}
