// Import employee model
Employee = require('./employeeModel');
// Handle index actions
exports.index = function (req, res) {
    Employee.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json({
                status: "success",
                message: "Contacts retrieved successfully",
                data: contacts
            });
        }
    });
};
// Handle create Employee actions
exports.new = function (req, res) {
    var employee = new Employee();
    try {
        employee.name = req.body.name ? req.body.name : employee.name;
        employee.gender = req.body.gender;
        employee.email = req.body.email;
        employee.phone = req.body.phone;

    console.log(employee);

// save the employee and check for errors
employee.save(function (err) {
        if (err)
            res.json(err);
        else {
            res.json({
                message: 'New employee detail created!',
                data: employee
            });
        }
    });
    } catch (error) {
        console.log(error);
    }
    
};
// Handle view employee info
exports.view = function (req, res) {
    Employee.findById(req.params.contact_id, function (err, employee) {
        if (err)
            res.send(err);
        else {
            res.json({
                message: 'Employee details loading..',
                data: employee
            });
        }
    });
};
// Handle update employee info
exports.update = function (req, res) {
    Employee.findById(req.params.contact_id, function (err, employee) {
        if (err)
            res.send(err);
        else {
            employee.name = req.body.name ? req.body.name : employee.name;
            employee.gender = req.body.gender;
            employee.email = req.body.email;
            employee.phone = req.body.phone;
        
            // save the employee and check for errors
            employee.save(function (err) {
                if (err)
                    res.json(err);
                else {
                    res.json({
                        message: 'Employee details updated',
                        data: employee
                    });
                }
            });
        }
        });
};
// Handle delete employee
exports.delete = function (req, res) {
    Employee.remove({
        _id: req.params.contact_id
    }, function (err, employee) {
        if (err)
            res.send(err);
        else {
            res.json({
                status: "success",
                message: 'Employee details deleted'
            });
        }
    });
};