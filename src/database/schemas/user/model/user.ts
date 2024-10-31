import { UserAttributes } from '../interface'
import { DataTypes, Model } from 'sequelize'

import { sequelize } from '../../../index'

class User extends Model<UserAttributes> implements UserAttributes {
    declare id?: number;
    declare name: string;
    declare email: string;
    declare password: string;
    declare confirmation_code?: string | null;
    declare confirmed: boolean;
}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    confirmation_code: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize,
    timestamps: false,
    tableName: 'tb_user',
    schema: 'users',
})

export { User }