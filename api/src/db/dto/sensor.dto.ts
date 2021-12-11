import { Optional } from "sequelize/types"

export type CreateSensorDTO = {
  id: string,
  latitude: number;
  longitude: number;
  intensity: number;
  radius: number;
  idEmergency?: string;
}

export type UpdateSensorDTO = Optional<CreateSensorDTO, 'id'>

export type FilterSensorsDTO = {
  isDeleted?: boolean
  includeDeleted?: boolean
}