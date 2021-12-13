<template>
  <router-view></router-view>
</template>

<script>
import sensorService from "@/services/sensor.service";
import emergencyService from "@/services/emergency.service";
import teamService from "@/services/team.service";
import stationService from "@/services/station.service";

export default {
  created() {
    sensorService.getAll();
    emergencyService.getAll();
    teamService.getAll();
    stationService.getAll();
  }
}
</script>
