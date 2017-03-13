/**
 * Created by roshan on 15/2/17.
 */
var mysql = require('../config/mysqlconfig.js');
var utils = require('../common/utils.js');
var multer = require('multer');
var mime = require('mime-types');
var fs = require('fs');

exports.verifygetintervalapiargs = function (req, res, next) {
    var isallkeys = utils.checkallkeys(req.body, ['fromdate', 'todate']);
    if (!isallkeys[0])
        utils.failReply(req.body, "key no found " + isallkeys[1], res);
    else
        next()
};

exports.verifycreatewidgetapiargs = function (req, res, next) {
    var isallkeys = utils.checkallkeys(req.body, ['miles', 'fuel', 'time']);
    if (!isallkeys[0])
        utils.failReply(req.body, "key no found " + isallkeys[1], res);
    else
        next()
};


exports.getWidgets = function (req, res) {
    var querystr = "select miles, fuel, time from widgetapi.widgets order by time desc limit 30";

    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if (data.length == 0)
                msg = "Empty table widgets";
            utils.succReply(data, msg, res);
        }
        else
            utils.failReply(err, msg, res);
    }, mysql.queryReturn(querystr, []))
};

exports.getTotalMiles = function (req, res) {
    var querystr = "select sum(miles) as total_miles from widgetapi.widgets ";

    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if (data.length == 0)
                msg = "Empty table widgets";
            utils.succReply(data, msg, res);
        }
        else
            utils.failReply(err, msg, res);
    }, mysql.queryReturn(querystr, []))
};

exports.getTotalFuel = function (req, res) {
    var querystr = "select sum(fuel) as total_fuel from widgetapi.widgets ";

    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if (data.length == 0)
                msg = "Empty table widgets";
            utils.succReply(data, msg, res);
        }
        else
            utils.failReply(err, msg, res);
    }, mysql.queryReturn(querystr, []))
};

exports.getFuelInterval = function (req, res) {
    var querystr = "select (select sum(fuel) from widgets where time<= w.time) as fuel, w.time from widgets w order by time desc limit 30;";

    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if (data.length == 0)
                msg = "Empty table widgets";
            utils.succReply(data, msg, res);    
        }
        else
            utils.failReply(err, msg, res);
    }, mysql.queryReturn(querystr, []))
};

exports.createWidget = function (req, res) {
    var querystr = "insert into widgetapi.widgets(miles, fuel, time) values (?, ?, ?)";

    mysql.getmysqlconnandrun(function (err, data, msg) {
        if (!err) {
            if (data.length == 0)
                msg = "Empty table widgets";
            utils.succReply(data, msg, res);
        }
        else
            utils.failReply(err, msg, res);
    }, mysql.queryReturn(querystr, [req.body.miles, req.body.fuel, req.body.time]))
};