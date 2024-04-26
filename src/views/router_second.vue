<template>
	<div id="app">
		<div id="map" class="map"></div>
	</div>
</template>

<script>
	import {
		Map,
		View
	} from 'ol';
	import TileLayer from 'ol/layer/Tile';
	import XYZ from 'ol/source/XYZ';
	import {
		fromLonLat
	} from 'ol/proj'
	import VectorLayer from 'ol/layer/Vector';
	import OSM from 'ol/source/OSM';
	import VectorSource from 'ol/source/Vector';
	import Point from 'ol/geom/Point';
	import Text from 'ol/style/Text';
	import Fill from 'ol/style/Fill';
	import {
		Stroke,
		Style
	} from 'ol/style';
	import CircleStyle from 'ol/style/Circle'
	// import Feature from  'ol';
	export default {
		data() {
			return {
				map: null,
				customPoint: null,
				vectorLayer:null
			};
		},
		mounted() {
			this.initMap();
			this.addCustomPoint();
		},
		methods: {
			initMap() {
				// 创建地图实例
				this.map = new Map({
					target: 'map', // 对应页面上的div的id
					layers: [
						new TileLayer({ //添加瓦片图层
							// source: new OSM(),
							source: new OSM({
								url: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
							})
						}),
					],

					view: new View({
						center: fromLonLat([123.771441, 47.33333]), //地图中心点
						zoom: 8, // 缩放级别
						minZoom: 0, // 最小缩放级别
						maxZoom: 18, // 最大缩放级别
						constrainResolution: true // 因为存在非整数的缩放级别，所以设置该参数为true来让每次缩放结束后自动缩放到距离最近的一个整数级别，这个必须要设置，当缩放在非整数级别时地图会糊
					}),
				});
			},
			createTextStyle(text) {
				return new Style({
					text: new Text({
						text: text,
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
				})
			},
			// 添加文本特征
			addText(lon, lat, text) {
				const vectorSource = this.map.getLayers().item(0).getSource();
				console.log(vectorSource)
				vectorSource.addFeature(new Point([lon, lat]).setStyle(this.createTextStyle(text)));
			},
			addCustomPoint() {
				const vectorSource = new VectorSource();
				this.vectorLayer = new VectorLayer({
					source: vectorSource,
				});
				var c = require('@/assets/json/two.json')
				for (var i = 0; i < c.length; i++) {
					var lon = c[i].Lon
					var lat = c[i].Lat
					var text = c[i].stationName
					console.log(lon,lat,text)
					this.addText(lon, lat, text)
				}
			}
		},
	}
</script>

<style>
	@import url("/node_modules/ol/ol.css");

	* {
		margin: 0;
		padding: 0;
	}

	#app {
		height: 100%;
		width: 100%;
		position: absolute;
	}

	#map {
		height: 100%;
		width: 100%;
	}
</style>