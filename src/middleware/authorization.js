const jwt = require('jsonwebtoken');
const empCollection = require('../model/model');
const authorization =async (req,res,next) =>{
    try {
        const token =req.cookies.UserToken;
    //console.log(token);
        const matchToken = jwt.verify(token,"cwjdbbifbvefjbfehlbuhfuhfiohfuihciebjbifebhbfijbfeihb");
    //console.log(matchToken);
        const user = await  empCollection.findOne({_id:matchToken._id});
        //console.log(user.name);
        req.token = token;
        req.user = user;
        next();
        
    } catch (error) {
        res.status(401).send(error)
        
    }

}

module.exports  = authorization;