import Sensor from './sensor.model';
import Emergency from './emergency.model';

Sensor.belongsTo(Emergency, {
  foreignKey: {
    allowNull: true
  }
});

export {
  Sensor,
  Emergency,
}