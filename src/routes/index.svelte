<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import { Grid, Row, Column, Tile } from 'carbon-components-svelte';
	import MenuCard from '$components/menu-card.svelte';
	export const prerender = true;
</script>

<Grid>
	<Row class="title-row">
		<h1>Welcome Task DashBoard</h1>
	</Row>
	<Row class="card-grid">
		<MenuCard
			on:cardClick={(e) => {
				console.log('da', e);
			}}
		/>
	</Row>
</Grid>

<style lang="scss" global>
	/* your styles go here */
	.card-grid {
		display: grid;
		grid-template-columns: 6;
    
	}
	.menu-card {
	}
</style>
