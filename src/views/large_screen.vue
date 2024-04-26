<template>
	<div id="map" class="map" style="height: 95%; width: 100%;"></div>
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
	import {
		padLeft
	} from '/src/assets/js/funone.js'
	export default {
		name: 'OpenLayersMap',
		data() {
			return {
				map: null,
			};
		},
		mounted() {
			this.initMap();
			console.log(padLeft(2, 8))
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
								// url: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
								tileUrlFunction: function(xyz) {
									// console.log(xyz)
									// console.log(obj1)
									// console.log(obj2)
									var z = xyz[0] //缩放级别
									var x = Math.abs(xyz[1]) //横坐标
									var y = Math.abs(xyz[2]) - 1 //纵坐标

									if (z > 10) {
										var url =
											'http://wprd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x=' +
											x + '&y=' + y + '&z=' + z + ''
										// console.log(url)
										return url
									} else {
										x = 'C' + padLeft(8, x.toString(16))
										y = 'R' + padLeft(8, y.toString(16))
										z = 'L' + padLeft(2, z)
										// console.log(x, y, z)
										// var url = 'mapimg' + '/' + z + '/' + y + '/' + x + '.png';
										url = 'http://' + '221.209.22.251:15003' +
											'/web/mapimg/GD_china' + '/' + z + '/' + y + '/' +
											x + '.png'; //齐齐哈尔服务器图片位置
										// url = require('@/assets/mapimg/'+ z + '/' + y + '/' + x + '.png') 
										// console.log(url)
										return url
									}
								}
							})
						}),
					],

					view: new View({
						center: fromLonLat([124.6, 47.48]), //地图中心点
						zoom: 10, // 缩放级别
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
	#map{
		position: absolute;
		top: 0;
	}
</style>