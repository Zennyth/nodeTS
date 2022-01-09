
import {Op} from 'sequelize';
import {Emergency} from '../models';
import {GetAllEmergenciesFilters} from './types.dal';
import {EmergencyInput, EmergencyOuput} from '../models/emergency.model';
import { SensorOuput } from '../models/sensor.model';
import { TeamOuput } from '../models/team.model';


export const create = async (payload: EmergencyInput): Promise<EmergencyOuput> => {
    const emergency = await Emergency.create(payload);
    return emergency
}

export const update = async (id: string, payload: Partial<EmergencyInput>): Promise<EmergencyOuput> => {
    const emergency = await Emergency.findByPk(id)
    if (!emergency) {
        // @todo throw custom error
        throw new Error('not found')
    }
    const updatedEmergency = await (emergency as Emergency).update(payload)
    return updatedEmergency
}

export const createOrUpdate = async (payload: EmergencyInput): Promise<EmergencyOuput> => {
    const emergency = await Emergency.findByPk(payload.id);

    let newEmergency;

    if (!emergency) {
        newEmergency = await Emergency.create(payload);
    } else {
        newEmergency = await (emergency as Emergency).update(payload);
    }
    return newEmergency;
}

export const getById = async (id: string): Promise<EmergencyOuput> => {
    const emergency = await Emergency.findByPk(id)
    if (!emergency) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return emergency;
}

export const deleteById = async (id: string): Promise<boolean> => {
    const deletedEmergencyCount = await Emergency.destroy({
        where: {id}
    })
    return !!deletedEmergencyCount
}

export const getAll = async (filters?: GetAllEmergenciesFilters): Promise<EmergencyOuput[]> => {
    return Emergency.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}}) 
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}

export const getSensors = async (id: string): Promise<SensorOuput[]> => {
  const emergency = await Emergency.findByPk(id, {
    include: [Emergency.associations.sensors],
    rejectOnEmpty: true,
  });
  return emergency.getSensors();
}

export const getTeams = async (id: string): Promise<TeamOuput[]> => {
    const emergency = await Emergency.findByPk(id, {
      include: [Emergency.associations.teams],
      rejectOnEmpty: false,
    });
    console.log(id)
    return emergency.getTeams();
  }