'use strict';

const   path 	= require("path"),
        DB 		= require(path.resolve('./config/sequelize/sequelize')),
        db 		= require(path.resolve('./config/sequelize/sequelize')).models,
        Categorie    = db.categorie;


/**
 * Create a device
 */

exports.create = async(req, res) => {
    try{
        let categorie = Categorie.create(req.body);
        res.json(categorie)
    }catch(err){
        console.log(err)
        res.json(err)
    }
};

 
/**
 * List des  categories
 */

exports.list = async(req, res) => { 
    try{
        let categories = await  Categorie.findAll();
        res.json(categories)
    }catch(err){
        res.json({ err:err });
    };
 };
