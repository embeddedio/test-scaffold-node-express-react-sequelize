"use strict";

module.exports = function(sequelize, DataTypes) { 

    let Categorie = sequelize.define('categorie', { 

        reference: { 
            type: DataTypes.STRING,
            field: 'reference',
            defaultValue: null
        },
        name: { 
            type: DataTypes.STRING,
            field: 'name',
            allowNull: false,
            defaultValue: null
        }

    }, { 
        underscored: true,
        freezeTableName: true,
        timestamps: false,
        tableName: 'categories',
        associate: function(models) { 
            //Device.belongsTo(models.Device);
            Categorie.hasMany(models.sousCategorie);
        }
    });
    
    return Categorie;

};
