
import * as stationDal from '../db/dal/station.dal';
import {GetAllStationsFilters} from '../db/dal/types.dal';
import {StationInput, StationOuput} from '../db/models/station.model';
import { TeamOuput } from '../db/models/team.model';

export const create = (payload: StationInput): Promise<StationOuput> => {
  return stationDal.create(payload)
}
export const createOrUpdate = (payload: StationInput): Promise<StationOuput> => {
  return stationDal.createOrUpdate(payload)
}
export const update = (id: string, payload: Partial<StationInput>): Promise<StationOuput> => {
  return stationDal.update(id, payload)
}
export const getById = (id: string): Promise<StationOuput> => {
  return stationDal.getById(id)
}
export const deleteById = (id: string): Promise<boolean> => {
  return stationDal.deleteById(id)
}
export const getAll = (filters: GetAllStationsFilters): Promise<StationOuput[]> => {
  return stationDal.getAll(filters)
}
export const createOrUpdateRange = async (payload: StationInput[]): Promise<StationOuput[]> => {
  const result: StationOuput[] = [];
  for(const station of payload){
    try {
      result.push(await stationDal.createOrUpdate(station));
    } catch (error) {
      console.log(error)
    }
  }
  return result;
}
export const getTeams = (id: string): Promise<TeamOuput[]> => {
  return stationDal.getTeams(id);
}