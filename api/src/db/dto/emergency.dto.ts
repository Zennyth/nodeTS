import { Optional } from "sequelize/types"

export type CreateEmergencyDTO = {
  id: string,
  latitude: number;
  longitude: number;
  intensity: number;
}

export type UpdateEmergencyDTO = Optional<CreateEmergencyDTO, 'id'>

export type FilterEmergencysDTO = {
  isDeleted?: boolean
  includeDeleted?: boolean
}