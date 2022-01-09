
import {Op} from 'sequelize';
import {Sensor} from '../models/';
import {GetAllSensorsFilters} from './types.dal';
import {SensorInput, SensorOuput} from '../models/sensor.model';


export const create = async (payload: SensorInput): Promise<SensorOuput> => {
    const sensor = await Sensor.create(payload);
    return sensor
}

export const update = async (id: string, payload: Partial<SensorInput>): Promise<SensorOuput> => {
    const sensor = await Sensor.findByPk(id)
    if (!sensor) {
        // @todo throw custom error
        throw new Error('not found')
    }
    const updatedSensor = await (sensor as Sensor).update(payload)
    return updatedSensor
}

export const createOrUpdate = async (payload: SensorInput): Promise<SensorOuput> => {
    const sensor = await Sensor.findByPk(payload.id);

    let newSensor;

    if (!sensor) {
        newSensor = await Sensor.create(payload);
    } else {
        newSensor = await (sensor as Sensor).update(payload);
    }
    return newSensor;
}

export const getById = async (id: string): Promise<SensorOuput> => {
    const sensor = await Sensor.findByPk(id)
    if (!sensor) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return sensor;
}

export const deleteById = async (id: string): Promise<boolean> => {
    const deletedSensorCount = await Sensor.destroy({
        where: {id}
    })
    return !!deletedSensorCount
}

export const getAll = async (filters?: GetAllSensorsFilters): Promise<SensorOuput[]> => {
    return Sensor.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}

export const getAllByEmergencyId = async (emergencyId: string): Promise<SensorOuput[]> => {
    const sensors = await Sensor.findAll({
        where: {
            emergencyId: emergencyId
        }
    })
    if (!sensors) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return sensors;
}
