
import * as teamDal from '../db/dal/team.dal';
import {GetAllTeamsFilters} from '../db/dal/types.dal';
import {TeamInput, TeamOuput} from '../db/models/team.model';

export const create = (payload: TeamInput): Promise<TeamOuput> => {
  return teamDal.create(payload)
}
export const createOrUpdate = (payload: TeamInput): Promise<TeamOuput> => {
  return teamDal.createOrUpdate(payload)
}
export const update = (id: string, payload: Partial<TeamInput>): Promise<TeamOuput> => {
  return teamDal.update(id, payload)
}
export const getById = (id: string): Promise<TeamOuput> => {
  return teamDal.getById(id)
}
export const deleteById = (id: string): Promise<boolean> => {
  return teamDal.deleteById(id)
}
export const getAll = (filters: GetAllTeamsFilters): Promise<TeamOuput[]> => {
  return teamDal.getAll(filters)
}
export const createOrUpdateRange = async (payload: TeamInput[]): Promise<TeamOuput[]> => {
  const result: TeamOuput[] = [];
  for(const team of payload){
    try {
      result.push(await teamDal.createOrUpdate(team));
    } catch (error) {
      console.log(error)
    }
  }
  return result;
}
export const getAllByEmergencyId = (emergencyId: string): Promise<TeamOuput[]> => {
    return teamDal.getAllByEmergencyId(emergencyId);
}