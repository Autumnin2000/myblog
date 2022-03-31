const jwt = require("jsonwebtoken");
Token = {
    en(str){
        let tokenKey = jwt.sign(str,'service');
        return tokenKey;
    },
    de(token){
        try {
            let tokenKey = jwt.verify(token,'service');
            return {
                status:'success',
                tokenKey
            }
        } catch (error) {
            return {
                status:'failed'
            }
        }
    }
}
module.exports = Token