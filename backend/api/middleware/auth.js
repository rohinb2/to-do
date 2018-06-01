module.exports.loggedIn = function(req, res, next) {
    if (req.isAuthenticated() || req.method == 'OPTIONS') {
        console.log("Request is authenticated");
        return next();
    }
    console.log("Request is not authenticated");
    res.sendStatus(401);
}