
import {Sensor} from '../../../src/db/models'
import * as sensorDal from '../../../src/db/dal/sensor.dal';

const dbTeardown = async () => {
  // await Sensor.sequelize?.query("SET FOREIGN_KEY_CHECKS = 0")
  // await Sensor.truncate({force: true})
  // await Sensor.sequelize?.query("SET FOREIGN_KEY_CHECKS = 1")
}


describe('Sensor DAL', () => {
  let sensorId: string = "3ab019f4-54ba-46cc-89e7-9ecda0efaf09";

  // init context for testing
  beforeAll(async () => {
    await dbTeardown();

    // await Sensor.create({
    //   id: sensorId,
    //   latitude: 50.1,
    //   longitude: -5.2,
    //   intensity: 10,
    //   radius: 5
    // });
  });

  // reset context
  afterAll(async () => {
    await dbTeardown();
  });

  describe('Create method', () => {
    it('should create and return an object of sensor details', async () => {
      const payload = {
        id: "37945f1a-decd-4d04-aa25-5b455d309a3d",
        latitude: 50.1,
        longitude: -5.2,
        intensity: 10,
        radius: 5
      }

      let sensor = null;
      try {
        sensor = await sensorDal.createOrUpdate(payload);
      } catch (err) {
        console.log(err)
      }
      expect(sensor).not.toBeNull();

    })
  })

  // describe('createOrUpdate method', () => {
  //   it('should create a new entry when none with matching id exists', async () => {
  //     const newId: string = 'af5de3ad-e890-4840-9d02-a31bfabdb50b';

  //     const payload = {
  //       id: newId,
  //       latitude: 52.1,
  //       longitude: -5.3,
  //       intensity: 1,
  //       radius: 10
  //     }

  //     await sensorDal.createOrUpdate(payload);

  //     const sensorsFound = await Sensor.findAll({where: {id: newId}});

  //     expect(sensorsFound.length).toEqual(1);
  //   })

  //   it('should update the existing entity', async () => {
  //     const payload = {
  //       id: sensorId,
  //       latitude: 52.1,
  //       longitude: -5.3,
  //       intensity: 1,
  //       radius: 10
  //     }

  //     await sensorDal.createOrUpdate(payload);

  //     const sensorsFound = await Sensor.findAll({where: {id: sensorId}});
      
  //     expect(sensorsFound.length).toEqual(1)
  //     expect(sensorsFound[0].latitude).toEqual(payload.latitude);
  //     expect(sensorsFound[0].longitude).toEqual(payload.latitude);
  //     expect(sensorsFound[0].intensity).toEqual(payload.latitude);
  //     expect(sensorsFound[0].radius).toEqual(payload.radius);
  //   })
  // })
})