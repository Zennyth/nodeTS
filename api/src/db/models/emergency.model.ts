import sequelizeConnection from '../config.db';
import { DataTypes, Model, Optional } from 'sequelize';

interface EmergencyAttributes {
  id: string;
  latitude: number;
  longitude: number;
  intensity: number;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface EmergencyInput extends Optional<EmergencyAttributes, 'id'> {}
export interface EmergencyOuput extends Required<EmergencyAttributes> {}


/**
 * @typedef Emergency
 * @property {string} id.required - - eg: 748f5019-032a-4606-8751-3ea7e39ca52b
 * @property {number} latitude.required - - eg: 45.764043
 * @property {number} longitude.required - - eg: 4.835659
 * @property {number} intensity.required - - eg: 50
 */
class Emergency extends Model<EmergencyAttributes, EmergencyInput> implements EmergencyAttributes {
  id: string;
  latitude: number;
  longitude: number;
  intensity: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}
  
Emergency.init({
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
  intensity: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true,
});
  
export default Emergency;