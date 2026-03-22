<script>
export let day;
</script>

<span id="svg">
	{@html day.rune.trim()}
</span>

<style>
	#svg {
		display: inline-block;
		width: 1em;
		height: 1em;
	}
</style>
