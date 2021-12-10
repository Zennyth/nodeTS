import { Optional } from "sequelize/types"

export type CreateSensorDTO = {
    id: string,
    latitude: number;
    longitude: number;
    temperature: number;
}

export type UpdateSensorDTO = Optional<CreateSensorDTO, 'id'>

export type FilterSensorsDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}