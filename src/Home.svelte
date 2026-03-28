<script>
import { links } from "svelte5-router";
import DayRune from "./DayRune.svelte";
import { calendar, MONTHS } from "./lib/calendar";
import { randomColoured } from "./lib/utils";
import MonthRune from "./MonthRune.svelte";

let oldGreg = new Date();
let today = calendar(oldGreg);
</script>

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
				{#each randomColoured(today.day?.name || "", "#592925") as item}
					<span style="color: {item.color}">{item.character}</span>
				{/each}
			</div>
		{/if}
	</div>

	<section id="intro">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
		cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
		non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	</section>

	<ul id="links_to_months" use:links>
		{#each MONTHS as m}
			<li>
				<MonthRune month={m} />
				<a href="/month/{m.name.toLowerCase()}" class="monthRune">
					{m.name.toLowerCase()}
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	section {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	#date {
		margin-top: 1em;
		margin-bottom: 1em;
		font-size: 5em;
		text-align: center;
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

	#intro {
		max-width: 900px;
		margin: 1em;
		font-size: 2.3em;
	}

	#links_to_months {
		margin: 0;
		margin-top: 1em;
		list-style: none;
		padding-left: 0;
		font-size: 3em;
		li {
			display: flex;
			align-items: center;
			a {
				margin-left: 0.5em;
			}
		}
	}
</style>
