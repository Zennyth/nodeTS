import sequelizeConnection from '../config.db';
import { DataTypes, Model, Optional } from 'sequelize';

interface SensorAttributes {
  id: number;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface SensorInput extends Optional<SensorAttributes, 'id'> {}
export interface SensorOuput extends Required<SensorAttributes> {}

class Sensor extends Model<SensorAttributes, SensorInput> implements SensorAttributes {
  public id!: number
  public location: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}
  
Sensor.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true
});
  
export default Sensor;