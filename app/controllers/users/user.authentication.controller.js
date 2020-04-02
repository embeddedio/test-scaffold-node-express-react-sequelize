'use strict';

const   _       = require('lodash'),
        path 	= require("path"),
        jwt     = require('jsonwebtoken'),
        bcrypt  = require('bcrypt'),
        config  = require(path.resolve('./config/config')),
        DB 		= require(path.resolve('./config/sequelize/sequelize')),
        db 		= require(path.resolve('./config/sequelize/sequelize')).models,
        User    = db.user;





/**
 * signup
 */

exports.signup = async (req, res, next) => {
    try {
        const { email, password, role } = req.body
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ email, password: hashedPassword, role: "ROLE_USER" });
        const accessToken = jwt.sign({ userId: newUser.id }, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRE
        });
        accessToken = config.cryptToken(accessToken);
        newUser.accessToken = accessToken;
        
        await newUser.save();
        delete newUser.id;
        delete newUser.password;
        res.json({
            data: newUser,
            accessToken
        })
    } catch (error) {
     next(error)
    }
}


/**
 * Signin
 */

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({where:{email:email} });
        if (!user) return next(new Error('Email does not exist'));
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return next(new Error('Password is not correct'))
        let accessToken = jwt.sign({ userId: user.id }, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRE
        });
        accessToken = config.cryptToken(accessToken);
                       
        await User.update({ accessToken: accessToken }, { where: { id: user.id } });
        res.status(200).json({
            email: user.email, 
            role: user.role,
            token:accessToken
        })
    } catch (error) {
        next(error);
    }
}
   




/**
 * Signout
 */
exports.signout = async (req, res) => {

    let accessToken = req.headers["x-access-token"]	

    // remove login token information from user object
    try{
        await User.update({ accessToken: null }, { where: { accessToken: accessToken} });
        // update the user object in the database
        res.redirect('/');

    }catch(err){
        res.status(400).send(err);
    }

};













async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}
async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}