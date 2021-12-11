<template>
  <router-view></router-view>
</template>

<script>
import sensorService from "@/services/sensor.service";
import emergencyService from "@/services/emergency.service";

export default {
  created() {
    sensorService.getAll();
    emergencyService.getAll();
    console.log(this.$store.state);
  }
}
</script>
