<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-warning">
      <!-- Card stats -->
      <b-row>
        <b-col xl="3" md="6">
          <stats-card title="Total sensors"
                      type="gradient-success"
                      :sub-title="$store.getters.numberOfSensors.toString()"
                      icon="ni ni-sound-wave"
                      class="mb-4 bg-dark">

            <template slot="footer">
              <b-button variant="success" style="height: 60%;" class="bg-gradient-success" @click="hideSensors = !hideSensors">{{ hideSensors ? 'show' : 'hide'}} sensors</b-button>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Total emergencies"
                      type="gradient-orange"
                      :sub-title="$store.getters.numberOfEmergencies.toString()"
                      icon="ni ni-support-16"
                      class="mb-4 bg-dark">

            <template slot="footer">
              <b-button variant="orange" style="height: 60%;" class="bg-gradient-orange" @click="hideEmergencies = !hideEmergencies">{{ hideEmergencies ? 'show' : 'hide'}} emergencies</b-button>
            </template>
          </stats-card>
        </b-col>
      </b-row>
    </base-header>

    <b-container fluid class="mt--7 bg-dark">
      <b-row>
        <b-col>
          <b-card no-body class="border-0">
            <div id="map-custom" class="map-canvas" style="height: 600px;">
              <l-map
                :zoom="zoom"
                :center="center"
                :options="mapOptions"
                @update:center="centerUpdate"
                @update:zoom="zoomUpdate"
                @ready="computeCenter"
                ref="leaflet"
              >
                <l-tile-layer
                  :url="url"
                  :attribution="attribution"
                />
                <l-layer-group 
                  ref="sensors"
                  :visible="!hideSensors"
                >
                  <l-marker
                    v-for="[id, sensor] in Object.entries($store.state.sensor.sensors)"
                    :key="id"
                    :lat-lng="computeLocation(sensor)" 
                    :icon="icons.sensor"
                  >
                    <l-popup>
                      <div @click="innerClick">
                        I am a sensor of {{sensor.intensity}}°C
                        <p v-show="showParagraph">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                          sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
                          Donec finibus semper metus id malesuada.
                        </p>
                      </div>
                    </l-popup>
                  </l-marker>
                </l-layer-group>
                <l-layer-group 
                  ref="emergencies"
                  :visible="!hideEmergencies"
                >
                  <l-marker
                    v-for="[id, emergency] in Object.entries($store.state.emergency.emergencies)"
                    :key="id"
                    :lat-lng="computeLocation(emergency)" 
                    :icon="icons.fire"
                  >
                    <l-popup>
                      <div @click="innerClick">
                        I am an emergency of {{emergency.intensity}} intensity
                        <p v-show="showParagraph">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                          sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
                          Donec finibus semper metus id malesuada.
                        </p>
                      </div>
                    </l-popup>
                  </l-marker>
                </l-layer-group>
              </l-map>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  // If you need to reference 'L', such as in 'L.icon', then be sure to
  // explicitly import 'leaflet' into your component
  import L from 'leaflet';
  import { latLng, icon } from "leaflet";
  import { LMap, LTileLayer, LMarker, LPopup, LTooltip, LLayerGroup } from "vue2-leaflet";
  import 'leaflet/dist/leaflet.css';

  export default {
    data() {
      return {
        zoom: 13,
        center: latLng(47.41322, -1.219482),
        url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
        attribution: '',
        currentZoom: 11.5,
        showParagraph: false,
        mapOptions: {
          zoomSnap: 0.5
        },
        showMap: true,
        hideSensors: false,
        hideEmergencies: false,
        icons: {
          fire: icon({
            iconUrl: require("@/../public/img/icons/map/fire.png"),
            iconSize: [42, 47],
            iconAnchor: [23, 0]
          }),
          sensor: icon({
            iconUrl: require("@/../public/img/icons/map/sensor.png"),
            iconSize: [42, 42],
            iconAnchor: [21, 0]
          }),
        }
      };
    },
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LPopup,
      LTooltip,
      LLayerGroup,
    },
    methods: {
      zoomUpdate(zoom) {
        this.currentZoom = zoom;
      },
      centerUpdate(center) {
        this.currentCenter = center;
      },
      showLongText() {
        this.showParagraph = !this.showParagraph;
      },
      innerClick() {
        alert("Click!");
      },
      computeLocation(objectWithLatLng) {
        return latLng(objectWithLatLng.latitude, objectWithLatLng.longitude);
      },
      computeCenter() {
        if(this.$refs.sensors) {
          const latLngs = this.$refs.sensors.$children.reduce((filtered, child) => {
            if(child.latLng !== undefined) filtered.push(child.latLng);
            return filtered;
          }, []);
          if(latLngs.length > 0) {
            this.$refs.leaflet.fitBounds(latLngs);
          }
          console.log(this.$refs.sensors)
        }
      }
    },
    mounted() {
    }
  };
</script>
