const express = require('express');
const router = express.Router();
const handlers = require('../route_handlers/handlers');

router.get('/palettes', handlers.getPalettes);
// route to create websites
// req body template
/* app json
 {
    payload: [
        {
            package: "",
            palette: "",
            vertical: "",
            project_name: "",
        }
    ]
 }
*/
router.post('/:version/verticals', handlers.createWebsites);

module.exports = router;
