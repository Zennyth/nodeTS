
import {Op} from 'sequelize';
import {Emergency} from '../models';
import {GetAllEmergenciesFilters} from './types.dal';
import {EmergencyInput, EmergencyOuput} from '../models/emergency.model';


export const create = async (payload: EmergencyInput): Promise<EmergencyOuput> => {
    const sensor = await Emergency.create(payload);
    return sensor
}

export const update = async (id: string, payload: Partial<EmergencyInput>): Promise<EmergencyOuput> => {
    const sensor = await Emergency.findByPk(id)
    if (!sensor) {
        // @todo throw custom error
        throw new Error('not found')
    }
    const updatedEmergency = await (sensor as Emergency).update(payload)
    return updatedEmergency
}

export const createOrUpdate = async (payload: EmergencyInput): Promise<EmergencyOuput> => {
    const sensor = await Emergency.findByPk(payload.id);

    let newEmergency;

    if (!sensor) {
        newEmergency = await Emergency.create(payload);
    } else {
        newEmergency = await (sensor as Emergency).update(payload);
    }
    return newEmergency;
}

export const getById = async (id: string): Promise<EmergencyOuput> => {
    const sensor = await Emergency.findByPk(id)
    if (!sensor) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return sensor;
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