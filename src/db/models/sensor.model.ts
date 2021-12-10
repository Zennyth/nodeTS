import sequelizeConnection from '../config.db';
import { DataTypes, Model, Optional } from 'sequelize';

interface SensorAttributes {
  id: string;
  latitude: number;
  longitude: number;
  temperature: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface SensorInput extends Optional<SensorAttributes, 'id'> {}
export interface SensorOuput extends Required<SensorAttributes> {}


/**
 * @typedef Sensor
 * @property {string} id.required - - eg: 748f5019-032a-4606-8751-3ea7e39ca52b
 * @property {number} latitude.required - - eg: 45.764043
 * @property {number} longitude.required - - eg: 4.835659
 * @property {number} temperature.required - - eg: 30.2
 */
class Sensor extends Model<SensorAttributes, SensorInput> implements SensorAttributes {
  id: string;
  latitude: number;
  longitude: number;
  temperature: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}
  
Sensor.init({
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
  temperature: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true
});
  
export default Sensor;