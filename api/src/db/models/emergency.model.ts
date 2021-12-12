import sequelizeConnection from '../config.db';
import { Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, Model, Optional } from 'sequelize';
import { Sensor, Team } from '.';

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

  // associations

  // sensors
  public getSensors!: HasManyGetAssociationsMixin<Sensor>; // Note the null assertions!
  public addSensor!: HasManyAddAssociationMixin<Sensor, string>;
  public hasSensor!: HasManyHasAssociationMixin<Sensor, string>;
  public countSensors!: HasManyCountAssociationsMixin;
  public createSensor!: HasManyCreateAssociationMixin<Sensor>;
  public readonly sensors?: Sensor[]; // Note this is optional since it's only populated when explicitly requested in code

  // teams
  public getTeams!: HasManyGetAssociationsMixin<Team>; // Note the null assertions!
  public addTeams!: HasManyAddAssociationMixin<Team, string>;
  public hasTeams!: HasManyHasAssociationMixin<Team, string>;
  public countTeams!: HasManyCountAssociationsMixin;
  public createTeams!: HasManyCreateAssociationMixin<Team>;
  public readonly teams?: Team[];


  public static associations: {
    sensors: Association<Emergency, Sensor>,
    teams: Association<Emergency, Team>,
  };
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