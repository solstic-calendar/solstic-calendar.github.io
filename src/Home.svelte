<script>
import { calendar } from "./lib/calendar";
import { randomColoured } from "./lib/utils";
import Month from "./Month.svelte";
import MonthRune from "./MonthRune.svelte";

const today = calendar();
</script>

<h1 id="title">
	{#each randomColoured("SOLSTIC", "#592925") as item}
		<span style="color: {item.color}">{item.character}</span>
	{/each}
</h1>
<strong id="subtitle">
	{#each randomColoured("Stellar Lunar Solar Tree Calendar", "#592925") as item}
		<span style="color: {item.color}">{item.character}</span>
	{/each}
</strong><br /><br />

<section>
	<div id="date">
		<span id="solstic_rune"><MonthRune month={today.month} /></span>
		<span id="solstic_month">{today.month?.name}</span>
		<span id="solstic_number">{today.dayOfMonth}</span>
		<div id="solstic_day">
			{#each randomColoured(today.day?.name, "#592925") as item}
				<span style="color: {item.color}">{item.character}</span>
			{/each}
		</div>
	</div>

	<div id="month">
		<Month />
	</div>
</section>

<style>
	section {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	#title {
		font-family: "Aight", sans-serif;
		margin-top: 0px;
		margin-bottom: -40px;
		color: var(--red);
		font-size: 6em;
	}

	#subtitle {
		color: color-mix(in srgb, var(--red) 80%, white 20%);
		font-size: 3em;
	}

	#date {
		margin-top: 1em;
		font-size: 5em;
		text-align: center;
	}

	#month {
		margin-top: 1em;
		font-size: 3em;
	}

	#solstic_month,
	#solstic_number {
		background: linear-gradient(
			to bottom,
			var(--orange) 0%,
			var(--yellow) 100%
		);
		background-clip: text;
		color: transparent;
		-webkit-background-clip: text; /* Chrome, Safari */
		-webkit-text-fill-color: transparent;
	}

	#solstic_rune {
		font-family: "TolkeinDwarf", sans-serif;
		display: block;
		font-size: 1.5em;
		color: var(--yellow);
	}

	#solstic_day {
		color: var(--red);
		font-size: 0.5em;
	}
</style>
