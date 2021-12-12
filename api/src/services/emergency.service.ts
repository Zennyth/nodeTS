
import * as emergencyDal from '../db/dal/emergency.dal';
import {GetAllEmergenciesFilters} from '../db/dal/types.dal';
import {EmergencyInput, EmergencyOuput} from '../db/models/emergency.model';
import { SensorOuput } from '../db/models/sensor.model';

export const create = (payload: EmergencyInput): Promise<EmergencyOuput> => {
  return emergencyDal.create(payload)
}
export const createOrUpdate = (payload: EmergencyInput): Promise<EmergencyOuput> => {
  return emergencyDal.createOrUpdate(payload)
}
export const update = (id: string, payload: Partial<EmergencyInput>): Promise<EmergencyOuput> => {
  return emergencyDal.update(id, payload)
}
export const getById = (id: string): Promise<EmergencyOuput> => {
  return emergencyDal.getById(id)
}
export const deleteById = (id: string): Promise<boolean> => {
  return emergencyDal.deleteById(id)
}
export const getAll = (filters: GetAllEmergenciesFilters): Promise<EmergencyOuput[]> => {
  return emergencyDal.getAll(filters)
}
export const getSensors = (id: string): Promise<SensorOuput[]> => {
  return emergencyDal.getSensors(id);
}