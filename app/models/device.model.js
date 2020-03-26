"use strict";

module.exports = function(sequelize, DataTypes) { 

    let Device = sequelize.define('devices', { 

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
        },
        price: { 
            type: DataTypes.FLOAT,
            field: 'price',
            defaultValue: 0
        }

    }, { 
        underscored: true,
        freezeTableName: true,
        timestamps: false,
        tableName: 'devices',
        associate: function(models) { 
            //Device.belongsTo(models.Device);
            //Device.hasMany(models.Device);
        }
    });
  return Device;

};
