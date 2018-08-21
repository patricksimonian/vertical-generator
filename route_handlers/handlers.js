
const routeVersions = require('../routes/route_versions');
const ProjectBuilder = require('../helpers/projectBuilder');
const paletteHelper = require('../helpers/palettes');

module.exports = {
  getPalettes: (req, res) => {
    res.send(JSON.stringify(paletteHelper.getPalettes()));
  },
  // grabs request data, generates a directory structure of all websites and
  // subsequently zips the entire
  // directory structure and sends back
  createWebsites: (req, res) => {
    console.log('received request');
    let destinationPath = "";
    let error = ProjectBuilder.verifyVerticals(req.body.payload);
    // minor verifications
    if(!routeVersions[req.params.version] || error.error) {
      console.log('received request', JSON.stringify(error));
      res.json(error || "incorrect version").status(400);
    } else {
      // create project builder
      const pb = new ProjectBuilder(req.body.payload, {
        schema: req.params.version,
        garunteedUnique: true
      });
      // start building
      pb.build()
        .then(() => {
          res.send('ok');
        })
        .catch((e) => {
          console.error(e);
          res.sendStatus(500);
        });
    }
  }
}
