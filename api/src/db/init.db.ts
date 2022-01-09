import { isDeepStrictEqual } from 'util';

import { createOrUpdateRange } from '../services/sensor.service';
import { CreateSensorDTO } from './dto/sensor.dto';

import { createOrUpdate } from '../services/station.service';
import { CreateStationDTO } from './dto/station.dto';

import * as teamService from '../services/team.service';
import { CreateTeamDTO } from './dto/team.dto';
import {Sensor, Emergency, Station, Team} from './models/';
import { stat } from 'fs';

const uuid = require('uuid');

const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

const min_latitude: number =  45.723967; const step_latitude: number = 0.06 / 6.0; const range_latitude: number = 6;
const min_longitude: number = 4.797831; const step_longitude: number = 0.011; const range_longitude: number = 10;

const dbInit = async () => {
  await Emergency.sync({ force: isDev });
  await Sensor.sync({ force: isDev });
  await Station.sync({ force: isDev });
  await Team.sync({ force: isDev });

  // Init stations and teams
  try {
    const station: CreateStationDTO = {
        id: uuid.v4(),
        latitude: 45.723967 + (step_latitude * (range_latitude - 1) / 2),
        longitude: 4.797831 + (step_longitude * (range_longitude - 1) / 2),
        name: 'Station de test',
        street: 'XXXXX-XXXXX',
        cp: 5,
        radius: 0.01929018172830706 * 10
    };
    createOrUpdate(station);

    const teams: CreateTeamDTO[] = [];
    teams.push({
        id: uuid.v4(),
        latitude: station.latitude,
        longitude: station.longitude,
        level: 10,
        stationId: station.id,
    });
    teamService.createOrUpdateRange(teams);
  } catch (error) {
    console.log(error);
  }


  // Init sensors
  try {
    const sensors: CreateSensorDTO[] = [];
    let id = 0;
    for(let latitude = 0; latitude < range_latitude; latitude++) {
      for(let longitude = 0; longitude < range_longitude; longitude++) {
        let sensor : CreateSensorDTO = {
          "id" : String(id),
          "latitude" : min_latitude + latitude * step_latitude,
          "longitude" : min_longitude + longitude * step_longitude,
          "radius" : 0.01929018172830706 / 2,
          "intensity" : 0
        }
        id++;
        sensors.push(sensor);
      }
    }
    const result: CreateSensorDTO[] = await createOrUpdateRange(sensors);
  } catch(error) {
    console.log(error);
  }
}

export default dbInit;