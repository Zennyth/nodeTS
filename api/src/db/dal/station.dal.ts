
import {Op} from 'sequelize';
import {Station} from '../models/';
import {GetAllStationsFilters} from './types.dal';
import {StationInput, StationOuput} from '../models/station.model';
import { TeamOuput } from '../models/team.model';


export const create = async (payload: StationInput): Promise<StationOuput> => {
    const station = await Station.create(payload);
    return station
}

export const update = async (id: string, payload: Partial<StationInput>): Promise<StationOuput> => {
    const station = await Station.findByPk(id)
    if (!station) {
        // @todo throw custom error
        throw new Error('not found')
    }
    const updatedStation = await (station as Station).update(payload)
    return updatedStation
}

export const createOrUpdate = async (payload: StationInput): Promise<StationOuput> => {
    const station = await Station.findByPk(payload.id);

    let newStation;

    if (!station) {
        newStation = await Station.create(payload);
    } else {
        newStation = await (station as Station).update(payload);
    }
    return newStation;
}

export const getById = async (id: string): Promise<StationOuput> => {
    const station = await Station.findByPk(id)
    if (!station) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return station;
}

export const deleteById = async (id: string): Promise<boolean> => {
    const deletedStationCount = await Station.destroy({
        where: {id}
    })
    return !!deletedStationCount
}

export const getAll = async (filters?: GetAllStationsFilters): Promise<StationOuput[]> => {
    return Station.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}

export const getTeams = async (id: string): Promise<TeamOuput[]> => {
  const emergency = await Station.findByPk(id, {
    include: [Station.associations.teams],
    rejectOnEmpty: true,
  });
  return emergency.getTeams();
}