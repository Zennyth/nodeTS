
import {Op} from 'sequelize';
import {Sensor} from '../models/';
import {GetAllSensorsFilters} from './types.dal';
import {SensorInput, SensorOuput} from '../models/sensor.model';


export const create = async (payload: SensorInput): Promise<SensorOuput> => {
    const sensor = await Sensor.create(payload);
    return sensor
}

export const update = async (id: number, payload: Partial<SensorInput>): Promise<SensorOuput> => {
    const sensor = await Sensor.findByPk(id)
    if (!sensor) {
        // @todo throw custom error
        throw new Error('not found')
    }
    const updatedSensor = await (sensor as Sensor).update(payload)
    return updatedSensor
}

export const getById = async (id: number): Promise<SensorOuput> => {
    const sensor = await Sensor.findByPk(id)
    if (!sensor) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return sensor;
}

export const deleteById = async (id: number): Promise<boolean> => {
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