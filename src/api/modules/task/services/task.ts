import { TaskAttributes } from "../../../../database/schemas/task/interface";
import { Task } from "../../../../database/schemas/task/model";

class TaskService {

    async find(){
        return await Task.findAll();
    }

    async findById(id: number){
        return await Task.findByPk(id);
    }

    async create(payload: TaskAttributes){
        return await Task.create(payload);
    }

    async update(id: number, payload: TaskAttributes){
        return await Task.update(payload, {where: {id}});
    }

    async delete(id: number){
        const options = {where: {id}};
        return await Task.destroy(options);
    }

}

export default new TaskService();