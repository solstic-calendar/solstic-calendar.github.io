<script>
import { Link } from "svelte5-router";
import DayRune from "./DayRune.svelte";
import { calendar, DAYS, getFirstDay, MONTHS } from "./lib/calendar";
import MonthRune from "./MonthRune.svelte";

let { month } = $props();

const format = new Intl.DateTimeFormat("en", {
	month: "short",
	day: "numeric",
});

const today = calendar();

const monthObject = $derived.by(() => {
	return MONTHS.find((m) => m.name.toLowerCase() === month);
});

const dateForMonth = $derived.by(() => {
	const monthIndex = MONTHS.findIndex((m) => m.name.toLowerCase() === month);
	const firstDay = getFirstDay();
	return new Date(
		firstDay.getFullYear(),
		firstDay.getMonth(),
		firstDay.getDate() + monthIndex * 28,
	);
});

const todayForMonth = $derived(calendar(dateForMonth));

const weeks = $derived.by(() => {
	if (todayForMonth.dayOfMonth === undefined) return;

	const dayOfMonthStart = 1;
	let oldGreg = new Date(
		dateForMonth.getFullYear(),
		dateForMonth.getMonth(),
		dateForMonth.getDate() - todayForMonth.dayOfMonth,
	);

	const days = Array.from({ length: 28 }, (_, i) => {
		oldGreg.setDate(oldGreg.getDate() + 1);
		return {
			dayOfMonth: dayOfMonthStart + i,
			oldGreg: new Date(oldGreg.getTime()),
		};
	});

	const result = [];
	for (let i = 0; i < 4; i++) {
		result.push(days.slice(i * 7, i * 7 + 7));
	}
	return result;
});
</script>

<section id="main">
	<h1>{monthObject?.name}</h1>

	<div id="day_runes">
		{#each DAYS as day}
			<span class="day_rune">
				<DayRune {day} />
			</span>
		{/each}
	</div>

	{#each weeks as week}
		<div>
			{#each week as day}
				<span class="day_wrap">
					<span
						class="table_day {today.dayOfMonth == day.dayOfMonth &&
						today.month?.name.toLowerCase() == month
							? 'currentDay'
							: ''}"
					>
						{day.dayOfMonth}
					</span>
					<span class="old_greg">{format.format(day.oldGreg)}</span>
				</span>
			{/each}
		</div>
	{/each}

	<section id="description">
		{@html monthObject?.html}
	</section>

	<div id="all_rune_months">
		{#each MONTHS as m}
			<Link
				to="/month/{m.name.toLowerCase()}"
				class="monthRune"
				id={m.name.toLowerCase() == month ? "currentRuneMonth" : ""}
			>
				<MonthRune month={m} />
			</Link>
		{/each}
	</div>
</section>

<style>
	#main {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		font-size: 3em;
	}

	h1 {
		font-family: "Hardkaze";
		font-size: 1.8em;
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

	#day_runes {
		display: flex;
		align-items: center;
		text-align: center;
		flex-direction: row;
		font-size: 2em;
	}

	.day_rune {
		flex: 1;
		color: var(--red);
		fill: var(--red);
	}

	.table_day {
		display: inline-block;
		width: 1em;
		margin: 0.25em;
		padding: 0.25em;
		color: var(--red);
	}

	.day_wrap {
		display: inline-flex;
		align-items: center;
		text-align: center;
		flex-direction: column;
	}

	.currentDay {
		border: 2px solid var(--orange);
		border-radius: 5px;
	}

	.old_greg {
		font-size: 0.25em;
	}

	h1 {
		margin-top: 1em;
		font-size: 3em;
	}

	#description {
		margin: 1em;
		margin-bottom: 0;
		font-size: 0.8em;
		max-width: 900px;
	}

	#all_rune_months {
		margin-top: 1em;
		width: 100%;
		text-align: center;
		padding: 0.75rem 1rem;
		box-sizing: border-box;
		z-index: 1000;
		:global(.monthRune) {
			cursor: pointer;
		}
		:global(#currentRuneMonth) {
			color: var(--red);
			fill: var(--red);
			cursor: default;
		}
	}

	@media (max-width: 600px) {
	}
</style>
