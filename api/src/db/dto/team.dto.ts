import { Optional } from "sequelize/types"

export type CreateTeamDTO = {
  id: string,
  latitude: number;
  longitude: number;
  level: number;
  stationId: string;
  emergencyId?: string;
}

export type UpdateTeamDTO = Optional<CreateTeamDTO, 'id'>

export type FilterTeamsDTO = {
  isDeleted?: boolean
  includeDeleted?: boolean
}