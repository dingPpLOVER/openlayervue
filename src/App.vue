<template>
	<div id="app" style="height: 90%; width: 90%; position: absolute;">
		<div id="map" class="map" style="height: 90%; width: 90%;"></div>
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
	export default {
		name: 'OpenLayersMap',
		data() {
			return {
				map: null,
			};
		},
		mounted() {
			this.initMap();
		},
		methods: {
			initMap() {
				// 创建地图实例
				
				this.map = new Map({
					target: 'map', // 对应页面上的div的id
					layers: [
						new TileLayer({ //添加瓦片图层
							// source: new OSM(),
							source: new XYZ({
								url: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
							})
						}),
					],

					view: new View({
						center: fromLonLat([120.771441, 30.756433]), //地图中心点
						zoom: 15, // 缩放级别
						minZoom: 0, // 最小缩放级别
						maxZoom: 18, // 最大缩放级别
						constrainResolution: true // 因为存在非整数的缩放级别，所以设置该参数为true来让每次缩放结束后自动缩放到距离最近的一个整数级别，这个必须要设置，当缩放在非整数级别时地图会糊
					}),
				});
			},
		},
	};
</script>

<style>
	@import url("/node_modules/ol/ol.css");
</style>