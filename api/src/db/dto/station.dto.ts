import { Optional } from "sequelize/types"

export type CreateStationDTO = {
  id: string,
  latitude: number;
  longitude: number;
  name: string;
  street: string;
  cp: number;
}

export type UpdateStationDTO = Optional<CreateStationDTO, 'id'>

export type FilterStationsDTO = {
  isDeleted?: boolean
  includeDeleted?: boolean
}