<script>
import { link, Route, Router } from "svelte5-router";
import Home from "./Home.svelte";
import Month from "./Month.svelte";
import { randomColoured } from "./lib/utils";

export const url = "";
</script>

<svelte:head>
	<link rel="icon" href="/sheket.svg" />
</svelte:head>

<a id="title" href="/" use:link>
	{#each randomColoured("SOLSTIC", "#592925") as item}
		<span style="color: {item.color}">{item.character}</span>
	{/each}
</a>
<strong id="subtitle">
	{#each randomColoured("Stellar Lunar Solar Tree Calendar", "#592925") as item}
		<span style="color: {item.color}">{item.character}</span>
	{/each}
</strong><br /><br />

<Router {url}>
	<div>
		<Route path="/"><Home /></Route>
		<Route path="/month/:month">
			{#snippet children(params)}
				<Month month={params.month} />
			{/snippet}
		</Route>
	</div>
</Router>

<style>
	#title {
		font-family: "Aight", sans-serif;
		margin-top: 0px;
		margin-bottom: -40px;
		color: var(--red);
		font-size: 6em;
		text-decoration: none;
		display: inline-block;
		&:hover {
			filter: invert(1);
		}
	}

	#subtitle {
		color: color-mix(in srgb, var(--red) 80%, white 20%);
		font-size: 3em;
		display: block;
	}
</style>
