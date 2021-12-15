
interface SensorAttributes {
  id: string;
  latitude?: number;
  longitude?: number;
  intensity: number;
  radius: number;
  emergencyId?: string;
  
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

/**
 * @typedef Sensor
 * @property {string} id.required - - eg: 748f5019-032a-4606-8751-3ea7e39ca52b
 * @property {number} latitude.required - - eg: 45.764043
 * @property {number} longitude.required - - eg: 4.835659
 * @property {number} intensity.required - - eg: 50
 * @property {number} radius.required - - eg: 50
 */
class Sensor implements SensorAttributes {
  id: string;
  latitude?: number;
  longitude?: number;
  intensity: number;
  radius: number;
  emergencyId?: string;

  // timestamps!
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}

export default Sensor;