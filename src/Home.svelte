<script>
import { calendar } from "./lib/calendar";
import Month from "./Month.svelte";
import MonthRune from "./MonthRune.svelte";

const today = calendar();
</script>

<h1 id="title">SOLSTIC</h1>
<strong id="subtitle">Stellar Lunar Solar Tree Calendar</strong><br /><br />

<section>
	<div id="date">
		<span id="solstic_month">{today.month?.name}</span>
		<span id="solstic_rune"><MonthRune month={today.month} /></span>
		<span id="solstic_number">{today.dayOfMonth}</span>
		<div id="solstic_day">{today.day?.name}</div>
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
		color: var(--pink);
		font-size: 6em;
	}

	#subtitle {
		color: rgb(154, 35, 158);
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
	#solstic_number,
	#solstic_rune {
		color: var(--blue);
	}

	#solstic_rune {
		font-family: "TolkeinDwarf", sans-serif;
	}

	#solstic_day {
		color: cornflowerblue;
	}
</style>
