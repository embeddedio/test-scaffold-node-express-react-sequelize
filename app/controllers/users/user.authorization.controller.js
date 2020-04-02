'use strict';

const  	path 	= require("path"),
        db 		= require(path.resolve('./config/sequelize/sequelize')).models,
        User    = db.user;




/**
 * User authorizations routing middleware
 */

exports.hasAuthorization = (roles) =>{
	
	return async(req, res, next) =>{
		
		let accessToken = req.headers["x-access-token"]	
		try{
			let user = await User.findOne({ where: { accessToken: accessToken } });
			if(!user) return  res.redirect('/login');
			if (roles.includes(user.role)) {
				return next();
			} else {
				return res.status(403).send({
					message: 'Permissions denied, you dont have permissions.'
				});
			}
		}catch(err){
			res.status(400).send(err);
		}
	};
};

