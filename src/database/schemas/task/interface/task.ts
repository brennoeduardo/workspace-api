import { Entity } from "../../../../database/core/interface/entity";

export interface TaskAttributes extends Entity {
    title: string
    description: string
    status: string
    deadline: Date
}