import { Entity } from "../../../../database/core/interface/entity";

export interface TaskStatusAttributes extends Entity {
    name: string
    color: string
}