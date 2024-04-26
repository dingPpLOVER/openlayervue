<template>
	<div id="app" >
		<!--路由视图-->
		<router-view />
		<!-- <router-link to='/first'>返回</router-link>| -->
		<div style="margin-top: 20px;" class="page">
			<router-link to='/large_screen' class="lin">瓦片</router-link>
			<router-link to='/router_index' class="lin">点</router-link>
			<router-link to='/router_second' class="lin">线</router-link>
			<router-link to='/router_three' class="lin">面</router-link>
		</div>
	</div>
	
</template>

<script>
	
</script>

<style>
	
	*{
		padding: 0;
		margin: 0;
	}
	#app{
		/* height: 100%;
		width: 100%;
		position: absolute; */
		text-align: center;
	}
	
	.lin{
		margin-left: 8px;
		font-size: 16px;
		border: 1px solid;
		padding: 5px;
		border-radius: 5px;
	}
	.lin:hover{
		color: #0000c2;
	}
	.page{
		position: absolute;
		bottom: 10px;
		width: 40%;
		margin-left: 30%;
	}
</style>