
import * as sensorDal from '../db/dal/sensor.dal';
import {GetAllSensorsFilters} from '../db/dal/types.dal';
import {SensorInput, SensorOuput} from '../db/models/sensor.model';

export const create = (payload: SensorInput): Promise<SensorOuput> => {
  return sensorDal.create(payload)
}
export const createOrUpdate = (payload: SensorInput): Promise<SensorOuput> => {
  return sensorDal.createOrUpdate(payload)
}
export const update = (id: string, payload: Partial<SensorInput>): Promise<SensorOuput> => {
  return sensorDal.update(id, payload)
}
export const getById = (id: string): Promise<SensorOuput> => {
  return sensorDal.getById(id)
}
export const deleteById = (id: string): Promise<boolean> => {
  return sensorDal.deleteById(id)
}
export const getAll = (filters: GetAllSensorsFilters): Promise<SensorOuput[]> => {
  return sensorDal.getAll(filters)
}
export const createOrUpdateRange = async (payload: SensorInput[]): Promise<SensorOuput[]> => {
  const result: SensorOuput[] = [];
  for(const sensor of payload){
    try {
      result.push(await sensorDal.createOrUpdate(sensor));
    } catch (error) {
      console.log(error)
    }
  }
  return result;
}

export const getAllByEmergencyId = (emergencyId: string): Promise<SensorOuput[]> => {
    return sensorDal.getAllByEmergencyId(emergencyId);
}