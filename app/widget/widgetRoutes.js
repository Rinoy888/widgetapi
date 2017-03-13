/**
 * Created by roshan on 15/2/17.
 */
module.exports = function(app, console) {
    var widget = require('./widget.js');
    var utils = require('../common/utils.js');

    app.post('/api/widget/getwidgets', function (req, res) {
        widget.getWidgets(req, res);
    });

    app.post('/api/widget/gettotalmiles', function (req, res) {
        widget.getTotalMiles(req, res);
    });

    app.post('/api/widget/gettotalfuel', function (req, res) {
        widget.getTotalFuel(req, res);
    });

    app.post('/api/widget/getfuelinterval', function (req, res) {
        widget.getFuelInterval(req, res);
    });

    app.post('/api/widget/createwidget', widget.verifycreatewidgetapiargs, function (req, res) {
        widget.createWidget(req, res);
    });

};
