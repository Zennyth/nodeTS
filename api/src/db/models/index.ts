import Sensor from './sensor.model';
import Emergency from './emergency.model';
import Station from './station.model';
import Team from './team.model';


Emergency.hasMany(Sensor, {
  sourceKey: "id",
  foreignKey: "emergencyId",
  as: "sensors"
});

Emergency.hasMany(Team, {
  sourceKey: "id",
  foreignKey: "emergencyId",
  as: "teams"
});

Station.hasMany(Team, {
  sourceKey: "id",
  foreignKey: "stationId",
  as: "teams"
});

export {
  Sensor,
  Emergency,
  Station,
  Team,
}