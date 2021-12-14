interface TeamAttributes {
  id: string;
  latitude: number;
  longitude: number;
  level: number;
  isHandlingEmergency: boolean;
  stationId: string;
  emergencyId?: string;
  
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}


/**
 * @typedef Team
 * @property {string} id.required - - eg: fd297b1c-dfa0-4bcb-8a86-266bbbe00371
 * @property {number} latitude.required - - eg: 45.764043
 * @property {number} longitude.required - - eg: 4.835659
 * @property {number} level.required - - eg: 3
 * @property {boolean} isHandlingEmergency.required - - eg: false
 * @property {string} stationId.required - - eg: fd297b1c-dfa0-4bcb-8a86-266bbbe00371
 * @property {string} emergencyId - - eg: fd297b1c-dfa0-4bcb-8a86-266bbbe00371
 */
class Team implements TeamAttributes {
  id: string;
  latitude: number;
  longitude: number;
  level: number;
  isHandlingEmergency: boolean;
  stationId!: string;
  emergencyId!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default Team;