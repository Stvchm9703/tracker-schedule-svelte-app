<script lang="ts">
	import { Tile } from 'carbon-components-svelte';
	import { DateTime } from 'luxon';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	// props
	export let project_id: string = '';
	export let project_name: string = '';
	export let background_src: string = '';
	export let last_update: DateTime = null;
	// compute
	$: last_update_string = !!last_update ? last_update.toISODate() : DateTime.now().toISODate();

	// event
	const onMouseClick = (e) => dispatch('cardClick', project_id);
</script>

<Tile on:click on:click={onMouseClick}>
	<div class="background">
		<slot name="bacground">
			<img src={background_src} alt={project_name} />
		</slot>
	</div>
	<div class="front-info">
		<slot>
			<h2>{project_name}</h2>
			<span>{last_update_string}</span>
		</slot>
	</div>
</Tile>


<style lang="scss">
  /* your styles go here */
  
</style>