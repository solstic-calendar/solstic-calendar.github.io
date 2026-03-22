import yewRune from "../assets/yew.svg?raw";
import yofiRune from "../assets/yofi.svg?raw";
import yareyahRune from "../assets/yareyah.svg?raw";
import mayimRune from "../assets/mayim.svg?raw";
import adamahRune from "../assets/adamah.svg?raw";
import eyshRune from "../assets/eysh.svg?raw";
import shemeshRune from "../assets/shemesh.svg?raw";
import sheketRune from "../assets/sheket.svg?raw";

export const ASSETS_PATH = "assets";

export const MONTHS = [
	{
		name: "HAzEl",
		rune: "x",
	},
	{
		name: "BIRCH",
		rune: "b",
	},
	{
		name: "AlDER",
		rune: "E",
	},
	{
		name: "HAwThoRn",
		rune: "T",
	},
	{
		name: "oAK",
		rune: "d",
	},
	{
		name: "AsH",
		rune: "a",
	},
	{
		name: "ROWAN",
		rune: "r",
	},
	{
		name: "ApPle",
		rune: "p",
	},
	{
		name: "BEECH",
		rune: "J",
	},
	{
		name: "wILloW",
		rune: "w",
	},
	{
		name: "yeW",
		rune: yewRune,
	},
	{
		name: "HOlly",
		rune: "h",
	},
	{
		name: "pINe",
		rune: "c",
	},
];

export const DAYS = [
	{
		name: "Yom Sheket",
		rune: sheketRune,
	},
	{
		name: "Yom Shemesh",
		rune: shemeshRune,
	},
	{
		name: "Yom Eysh",
		rune: eyshRune,
	},
	{
		name: "Yom Adamah",
		rune: adamahRune,
	},
	{
		name: "Yom Mayim",
		rune: mayimRune,
	},
	{
		name: "Yom Yareyah",
		rune: yareyahRune,
	},
	{
		name: "Yom Yofi",
		rune: yofiRune,
	},
];

const MISTLETOE_DAY = {
	name: "Mistletoe Day",
};

const MISTLETOE_MONTH = {
	name: "",
};

const MOSS_DAY = {
	name: "Moss Day",
};

const MOSS_MONTH = {
	name: "",
};

const CALENDAR_START = "Feburary 5";

export function calendar(now = new Date()) {
	let day;
	let month;
	let dayOfMonth;
	let oldGreg = getFirstDay();
	oldGreg.setDate(getFirstDay().getDate() - 1);

	for (let index = 0; index <= daysSince(now); index++) {
		day = getDay(index);
		dayOfMonth = getNumber(index);
		month = getMonth(index);
		oldGreg.setDate(oldGreg.getDate() + 1);
	}

	return { month, day, dayOfMonth, oldGreg };
}

function getDay(index) {
	if (isMossDay(index)) {
		return MOSS_DAY;
	}
	if (isMistletoeDay(index)) {
		return MISTLETOE_DAY;
	}

	return DAYS[index % 7];
}

function getNumber(index) {
	if (isMistletoeDay(index) || isMossDay(index)) {
		return 0;
	}

	return (index % 28) + 1;
}

function getMonth(index) {
	if (isMossDay(index)) {
		return MOSS_MONTH;
	}
	if (isMistletoeDay(index)) {
		return MISTLETOE_MONTH;
	}

	return MONTHS[Math.floor(index / 28)];
}

export function getFirstDay() {
	const now = new Date();
	return new Date(`${CALENDAR_START}, ${now.getFullYear()}`);
}

function daysSince(now: Date | undefined) {
	const msPerDay = 24 * 60 * 60 * 1000;

	if (now === undefined) {
		now = new Date();
	}
	const firstDay = getFirstDay();
	const diff =
		Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
		Date.UTC(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate());
	return Math.floor(diff / msPerDay);
}

function isMistletoeDay(index) {
	return index === 365;
}

function isMossDay(index) {
	if (isLeapYear() && index === 33) {
		return true;
	}

	return false;
}

function isLeapYear() {
	const thisYear = new Date().getFullYear();
	return new Date(thisYear, 1, 29).getDate() === 29;
}
