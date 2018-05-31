module.exports.logRequest = function(req, res, next) {
    console.log('\nUser: ' + req.user);
    console.log('Body: ');
    console.log(req.body);
    return next();
}