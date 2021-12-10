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