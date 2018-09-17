
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
    //verify globals
    let globalsError = ProjectBuilder.verifyGlobals(req.body.globals);
    console.log(error);
    console.log(globalsError);
    error.errors = error.errors.concat(globalsError.errors);
    error.error = error.errors.length > 0;
    console.log(error);
    // minor verifications
    if(!routeVersions[req.params.version] || error.error) {
      console.log('received request', JSON.stringify(error));
      res.status(400).json(error || "incorrect version");
    } else {
      // create project builder
      const pb = new ProjectBuilder(req.body.payload, {
        schema: req.params.version,
        garunteedUnique: true,
        globals: req.body.globals
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
