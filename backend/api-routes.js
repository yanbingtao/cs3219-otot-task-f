// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Here is the API Home page',
    });
});
// Import eemployee controller
var employeeController = require('./employeeController');
// Employee routes
router.route('/contacts')
    .get(employeeController.index)
    .post(employeeController.new);
router.route('/contacts/:contact_id')
    .get(employeeController.view)
    .patch(employeeController.update)
    .put(employeeController.update)
    .delete(employeeController.delete);
// Export API routes
module.exports = router;