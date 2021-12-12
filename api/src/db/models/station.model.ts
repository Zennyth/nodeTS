import sequelizeConnection from '../config.db';
import { Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, Model, Optional } from 'sequelize';
import { Team } from '.';

interface StationAttributes {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  street: string;
  cp: number;
  
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface StationInput extends Optional<StationAttributes, 'id'> {}
export interface StationOuput extends Required<StationAttributes> {}


/**
 * @typedef Station
 * @property {string} id.required - - eg: 229d6a35-d5cb-4145-8e6a-c538b6582fa0
 * @property {number} latitude.required - - eg: 45.764043
 * @property {number} longitude.required - - eg: 4.835659
 * @property {string} name.required - - eg: la caserne des pompiers
 * @property {string} street.required - - eg: Rue des pompiers
 * @property {number} cp.required - - eg: 10
 */
class Station extends Model<StationAttributes, StationInput> implements StationAttributes {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  street: string;
  cp: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // associations
  public getTeams!: HasManyGetAssociationsMixin<Team>; // Note the null assertions!
  public addTeam!: HasManyAddAssociationMixin<Team, string>;
  public hasTeam!: HasManyHasAssociationMixin<Team, string>;
  public countTeams!: HasManyCountAssociationsMixin;
  public createTeam!: HasManyCreateAssociationMixin<Team>;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly teams?: Team[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    teams: Association<Station, Team>;
  };
}
  
Station.init({
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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cp: {
    type: DataTypes.NUMBER,
    allowNull: false,
  }
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true,
});
  
export default Station;