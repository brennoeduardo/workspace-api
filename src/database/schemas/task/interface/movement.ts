import { Entity } from "../../../../database/core/interface/entity";

export interface TaskMovementAttributes extends Entity {
    start_date: Date;
    end_date: Date | null;
    task_id: number;
    status_id: number;
    user_id: number;
    description: string;
}