'use strict';

const   path 	        = require("path"),
        DB 		        = require(path.resolve('./config/sequelize/sequelize')),
        db 		        = require(path.resolve('./config/sequelize/sequelize')).models,
        sousCategorie   = db.sousCategorie;


/**
 * Create a sous categorie
 */

exports.create = async(req, res) => {
    try{
        let sous_categorie = sousCategorie.create(req.body);
        res.json(sous_categorie)
    }catch(err){
        console.log(err)
        res.json(err)
    }
};

 
/**
 * List des  sous categorie
 */

exports.list = async(req, res) => { 
    try{
        let sous_categories = await sousCategorie.findAll();
        res.json(sous_categories)
    }catch(err){
        res.json({err:err});
    };
 };
