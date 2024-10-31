import { TaskStatusAttributes } from "../../../../database/schemas/task/interface";
import { TaskStatus } from "../../../../database/schemas/task/model";

class TaskStatusService {

    async find(){
        return await TaskStatus.findAll();
    }

    async findById(id: number){
        return await TaskStatus.findByPk(id);
    }

    async create(payload: TaskStatusAttributes){
        return await TaskStatus.create(payload);
    }

    async update(id: number, payload: TaskStatusAttributes){
        return await TaskStatus.update(payload, {where: {id}});
    }

    async delete(id: number){
        const options = { where: {id} };
        return await TaskStatus.destroy(options);
    }

}

export default new TaskStatusService();