import { TaskStatusAttributes } from '../interface'
import { DataTypes, Model } from 'sequelize'

import { sequelize } from '../../../index'

class TaskStatus extends Model<TaskStatusAttributes> implements TaskStatusAttributes {
    declare id?: number
    declare name: string
    declare color: string   
}

TaskStatus.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    timestamps: false,
    tableName: 'tb_task_type',
    schema: 'task',
})

export { TaskStatus }