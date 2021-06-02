var dotenv = require('dotenv');
dotenv.config({ path: './.env' });

function Validate(req, res, next) {
    //Get Key from Headerr
    console.log('Authenticating api key...');
    var keyToTest = req.header('API_KEY');
    //is header filled?
    if (!keyToTest) {
        console.log('An api key was missing. Access denied');
        res.statusCode = 401;
        res.send({
            ResponseCode: 401,
            ResponseMessage: 'Access denied. An api key was missing'
        });
    } else {

        //is the api key from the header equal to our dotenv api key variable?
        if (keyToTest === process.env.API_KEY) {
            console.log('Access granted')
            next();
        } else {
            console.log(process.env.API_KEY)
            res.statusCode = 403;
            res.send({
                ResponseCode: 403,
                ResponseMessage: 'Access denied. Api-Key is wrong.'
            });
        }
    }
}
module.exports = Validate;