import { TaskMovementAttributes } from "../../../../database/schemas/task/interface";
import { TaskMovement } from "../../../../database/schemas/task/model";

class TaskMovementService {

    async find(){
        return await TaskMovement.findAll();
    }

    async findById(id: number){
        return await TaskMovement.findByPk(id);
    }

    async create(payload: TaskMovementAttributes){
        return await TaskMovement.create(payload);
    }

    async update(id: number, payload: TaskMovementAttributes){
        return await TaskMovement.update(payload, {where: {id}});
    }

    async delete(id: number){
        const options = { where: {id} };
        return await TaskMovement.destroy(options);
    }

}

export default new TaskMovementService();