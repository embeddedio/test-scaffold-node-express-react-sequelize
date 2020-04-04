"use strict";

module.exports = function(sequelize, DataTypes) { 

    let sousCategorie = sequelize.define('sousCategorie', { 

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
        tableName: 'sous_categories',
        associate: function(models) { 
            sousCategorie.belongsTo(models.categorie);
            //Device.hasMany(models.Device);
        }
    });
    
    return sousCategorie;

};
