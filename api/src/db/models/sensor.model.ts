import sequelizeConnection from '../config.db';
import { DataTypes, Model, Optional } from 'sequelize';

interface SensorAttributes {
  id: string;
  latitude?: number;
  longitude?: number;
  intensity: number;
  radius?: number;
  emergencyId?: string;
  
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
 * @property {number} intensity.required - - eg: 50
 * @property {number} radius.required - - eg: 50
 */
class Sensor extends Model<SensorAttributes, SensorInput> implements SensorAttributes {
  id: string;
  latitude!: number;
  longitude!: number;
  intensity: number;
  radius!: number;
  emergencyId!: string;

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
    allowNull: true
  },
  longitude: {
    type: DataTypes.NUMBER,
    allowNull: true
  },
  intensity: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  radius: {
    type: DataTypes.NUMBER,
    allowNull: true
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
  
export default Sensor;