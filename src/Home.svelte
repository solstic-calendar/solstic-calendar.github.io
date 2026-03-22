<script>
import DayRune from "./DayRune.svelte";
import { calendar, getFirstDay, MONTHS } from "./lib/calendar";
import { randomColoured } from "./lib/utils";
import Month from "./Month.svelte";
import MonthRune from "./MonthRune.svelte";

let oldGreg = new Date();
let today = calendar(oldGreg);
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
		<span id="solstic_runes">
			<span id="month_rune">
				<MonthRune month={today.month} />
			</span>
			{#if oldGreg.toDateString() == new Date().toDateString()}
				<span id="day_rune">
					<DayRune day={today.day} />
				</span>
			{/if}
		</span>
		<span id="solstic_month">{today.month?.name}</span>
		{#if oldGreg.toDateString() == new Date().toDateString()}
			<span id="solstic_number">{today.dayOfMonth}</span>
			<div id="solstic_day">
				{#each randomColoured(today.day?.name, "#592925") as item}
					<span style="color: {item.color}">{item.character}</span>
				{/each}
			</div>
		{/if}
	</div>

	<div id="month">
		<Month date={oldGreg} />
	</div>
</section>

<div id="all_rune_months">
	{#each MONTHS as month, index}
		<a
			id={today.month?.name == month.name ? "currentRuneMonth" : ""}
			onclick={(event) => {
				event.preventDefault();
				const firstDay = getFirstDay();
				oldGreg = new Date(
					firstDay.getFullYear(),
					firstDay.getMonth(),
					firstDay.getDate() + index * 28,
				);
				today = calendar(oldGreg);
			}}
		>
			<MonthRune {month} />
		</a>
	{/each}
</div>

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
		margin-bottom: 1em;
		font-size: 5em;
		text-align: center;
	}

	#month {
		margin-top: 1em;
		font-size: 3em;
	}

	#solstic_month {
		font-family: "Hardkaze";
		font-size: 1.5em;
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

	#solstic_runes {
		display: flex;
		color: var(--yellow);
		fill: var(--yellow);
		font-size: 1.5em;
		align-items: center;
		justify-content: center;
		#month_rune {
			width: 1em;
			font-family: "TolkeinDwarf", sans-serif;
		}
	}

	#solstic_day {
		color: var(--red);
		font-size: 0.5em;
	}

	#all_rune_months {
		margin-top: 2em;
		width: 100%;
		text-align: center;
		padding: 0.75rem 1rem;
		box-sizing: border-box;
		z-index: 1000;
		font-size: 4em;
		font-family: "TolkeinDwarf", sans-serif;
		a {
			&:hover {
				color: var(--orange);
				fill: var(--orange);
			}
			cursor: pointer;
		}
	}

	#currentRuneMonth {
		color: var(--orange);
		fill: var(--orange);
	}

	@media (max-width: 600px) {
		#month {
			font-size: 30px;
		}

		#all_rune_months {
			font-size: 40px;
		}
	}
</style>
