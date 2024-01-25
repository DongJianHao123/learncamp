import { IDType } from "../Safe"

export interface IJob {
    id: number
    partnerId: IDType
    name: string
    description: string
    salary: { max: number, min: number, times?: number }
    city: string
    province: string
    contact: string
    partner?: {
        id: number,
        name: string
    };
    requirement: string;
}