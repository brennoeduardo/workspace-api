import { TaskAttributes } from '../interface'
import { DataTypes, Model } from 'sequelize'

import { sequelize } from '../../../index'

class Task extends Model<TaskAttributes> implements TaskAttributes {
    declare id?: number
    declare title: string
    declare description: string
    declare deadline: Date
    declare status: string
}

Task.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    timestamps: true,
    tableName: 'tb_task',
    schema: 'task',
})

export { Task }
