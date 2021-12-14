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

/**
 * @typedef Station
 * @property {string} id.required - - eg: 229d6a35-d5cb-4145-8e6a-c538b6582fa0
 * @property {number} latitude.required - - eg: 45.764043
 * @property {number} longitude.required - - eg: 4.835659
 * @property {string} name.required - - eg: la caserne des pompiers
 * @property {string} street.required - - eg: Rue des pompiers
 * @property {number} cp.required - - eg: 10
 */
class Station implements StationAttributes {
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
}
  
export default Station;