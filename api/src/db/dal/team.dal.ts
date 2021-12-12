
import {Op} from 'sequelize';
import {Team} from '../models/';
import {GetAllTeamsFilters} from './types.dal';
import {TeamInput, TeamOuput} from '../models/team.model';


export const create = async (payload: TeamInput): Promise<TeamOuput> => {
    const team = await Team.create(payload);
    return team
}

export const update = async (id: string, payload: Partial<TeamInput>): Promise<TeamOuput> => {
    const team = await Team.findByPk(id)
    if (!team) {
        // @todo throw custom error
        throw new Error('not found')
    }
    const updatedTeam = await (team as Team).update(payload)
    return updatedTeam
}

export const createOrUpdate = async (payload: TeamInput): Promise<TeamOuput> => {
    const team = await Team.findByPk(payload.id);

    let newTeam;

    if (!team) {
        newTeam = await Team.create(payload);
    } else {
        newTeam = await (team as Team).update(payload);
    }
    return newTeam;
}

export const getById = async (id: string): Promise<TeamOuput> => {
    const team = await Team.findByPk(id)
    if (!team) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return team;
}

export const deleteById = async (id: string): Promise<boolean> => {
    const deletedTeamCount = await Team.destroy({
        where: {id}
    })
    return !!deletedTeamCount
}

export const getAll = async (filters?: GetAllTeamsFilters): Promise<TeamOuput[]> => {
    return Team.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}