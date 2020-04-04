'use strict';

const  	path 	= require("path"),
        db 		= require(path.resolve('./config/sequelize/sequelize')).models,
		User    = db.user,
		config 	= require(path.resolve('./config/config')),
		jwt 	= require('jsonwebtoken');




/**
 * User authorizations routing middleware
 */

exports.hasAuthorization = (roles) =>{
	
	return async(req, res, next) =>{
		
		let accessToken = req.headers["x-access-token"]	
		
		try
		{ 
			const { userId,userRole, exp } = await jwt.verify( config.decryptToken(accessToken), config.JWT_SECRET);
			console.log('accessToken==>  ',Date.now()/1000, exp)
			if(exp<Date.now()/1000){
				throw("Session expired, please login to obtain a new one" )
			}else{

				let user = await User.findOne({ where: { accessToken: accessToken } });

				if(!user) return  null//res.redirect('/login');
				if (roles.includes(user.role)) {
					return next();
				} else {
					throw("Permissions denied, you dont have permissions")					
				}
			}

		}
		catch (error)
		{
			console.log('******************',error)
			return res.status(403).send({
				error
			});
		}
		

		/*try{
			console.log('----*-*-')
			const { userId,userRole, exp } = await jwt.verify(accessToken, config.JWT_SECRET);

			console.log('accessToken==>  ',jwt.verify(accessToken, config.JWT_SECRET))

			/*if(exp<Date.now()-99999999999){
				throw({error: "JWT token has expired, please login to obtain a new one" })
			}else{

				let user = await User.findOne({ where: { accessToken: accessToken } });
				if(!user) return  res.redirect('/login');
				if (roles.includes(user.role)) {
					return next();
				} else {
					return res.status(403).send({
						message: 'Permissions denied, you dont have permissions.'
					});
				}
			}*/
		/*}catch(err){
			res.status(400).send(err);
		}*/
	};
};

