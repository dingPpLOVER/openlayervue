<template>
	<div id="map" class="map"></div>
</template>

<script>
	import 'ol/ol.css';
	import {
		Map,
		View
	} from 'ol';
	import {
		Tile as TileLayer,
		Vector as VectorLayer
	} from 'ol/layer';
	import {
		OSM,
		Vector as VectorSource
	} from 'ol/source';
	import {
		Circle as CircleStyle,
		Fill,
		Stroke,
		Style,
		Text
	} from 'ol/style';
	import {
		fromLonLat
	} from 'ol/proj';
	import Feature from 'ol/Feature.js';
	import {
		Point
	} from 'ol/geom.js';
	export default {
		name: 'OpenLayersMap',
		data() {
			return {
				map: null,
				customPoint: [], //fromLonLat([123.456, -7.89]), // 自定义点的经纬度
				textarr: []
			};
		},
		mounted() {
			this.initMap();
			this.addCustomPoint();
		},
		methods: {
			initMap() {
				this.map = new Map({
					target: 'map',
					layers: [
						new TileLayer({
							source: new OSM({
								url: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
							}),
						}),
					],
					view: new View({
						center: fromLonLat([123.06, 47.23]),
						zoom: 8,
					}),
				});
			},
			addCustomPoint() {
				var c = require('@/assets/json/two.json')
				var newpoint = []
				var textarr = []
				for (var i = 0; i < c.length; i++) {
					this.customPoint = new Feature({
						geometry: new Point(fromLonLat([c[i].Lon, c[i].Lat])),
						name: c[i].stationName,
					})
					newpoint.push(this.customPoint)
					textarr.push(c[i].stationName)
					this.textarr = textarr
					console.log(this.textarr)
				}

				const vectorLayer = new VectorLayer({
					source: new VectorSource({
						features: newpoint
						// features: [
						// 	new Feature({
						// 		geometry: new Point(fromLonLat([123.06, 47.23])),
						// 		name: '自定义点',
						// 	}),
						// 	new Feature({
						// 		geometry: new Point(fromLonLat([124.06, 47.33])),
						// 		name: '自定义点',
						// 	}),
						// ],
					}),
					style: new Style({
						// text:textarr,
						text: new Text({
							text: 'hh',
							offsetY: 15,
						}),
						image: new CircleStyle({
							radius: 6,

							fill: new Fill({
								color: 'red'
							}),
							stroke: new Stroke({
								color: 'white',
								width: 2
							}),
						}),
					}),

				});
				this.map.addLayer(vectorLayer);
				console.log(this.map)
			},
		},
	};
</script>

<style>
	@import url("/node_modules/ol/ol.css");

	#map {
		position: absolute;
		top: 0;
		height: 95%;
		width: 100%;
	}
</style>