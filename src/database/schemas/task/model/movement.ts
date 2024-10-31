import { Task, TaskStatus } from '../../../../database/schemas/task/model'
import { TaskMovementAttributes } from '../interface'
import { DataTypes, Model } from 'sequelize'

import { sequelize } from '../../../index'

class TaskMovement extends Model<TaskMovementAttributes> implements TaskMovementAttributes {
    declare id?: number
    declare start_date: Date
    declare end_date: Date | null
    declare task_id: number
    declare status_id: number
    declare user_id: number
    declare description: string
}

TaskMovement.init({
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
   
}, {
    sequelize,
    timestamps: true,
    tableName: 'tb_task_movement',
    schema: 'task',
})

TaskMovement.belongsTo(TaskStatus, { foreignKey: { name: 'status_id', allowNull: false } })
TaskStatus.hasMany(TaskMovement, { foreignKey: { name: 'status_id', allowNull: false } })

TaskMovement.belongsTo(Task, { foreignKey: { name: 'task_id', allowNull: false } })
Task.hasMany(TaskMovement, { foreignKey: { name: 'task_id', allowNull: false } })

export { TaskMovement }