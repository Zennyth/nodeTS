import sequelizeConnection from '../config.db';
import { DataTypes, Model, Optional } from 'sequelize';

interface TeamAttributes {
  id: string;
  latitude: number;
  longitude: number;
  level: number;
  stationId: string;
  emergencyId?: string;
  
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface TeamInput extends Optional<TeamAttributes, 'id'> {}
export interface TeamOuput extends Required<TeamAttributes> {}


/**
 * @typedef Team
 * @property {string} id.required - - eg: fd297b1c-dfa0-4bcb-8a86-266bbbe00371
 * @property {number} latitude.required - - eg: 45.764043
 * @property {number} longitude.required - - eg: 4.835659
 * @property {number} level.required - - eg: 3
 * @property {string} stationId.required - - eg: fd297b1c-dfa0-4bcb-8a86-266bbbe00371
 * @property {string} emergencyId - - eg: fd297b1c-dfa0-4bcb-8a86-266bbbe00371
 */
class Team extends Model<TeamAttributes, TeamInput> implements TeamAttributes {
  id: string;
  latitude: number;
  longitude: number;
  level: number;
  stationId!: string;
  emergencyId!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}
  
Team.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  latitude: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  longitude: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  level: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  stationId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emergencyId: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true,
});
  
export default Team;