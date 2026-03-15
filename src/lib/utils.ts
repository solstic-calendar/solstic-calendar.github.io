export function randomColoured(text: string, baseColour: string) {
	return Array.from(text).map((character) => ({
		character,
		color: deviateHexHSL(baseColour, { hue: 15, sat: 5, light: 10 }),
	}));
}

function hexToRgb(hex) {
	hex = hex.replace(/^#/, "");
	if (hex.length === 3)
		hex = hex
			.split("")
			.map((c) => c + c)
			.join("");
	const n = parseInt(hex, 16);
	return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHex({ r, g, b }) {
	return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

// simple RGB <-> HSL (works with 0..255 rgb and 0..360/0..100 hsl)
function rgbToHsl(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	let h,
		s,
		l = (max + min) / 2;
	if (max === min) {
		h = s = 0;
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			default:
				h = (r - g) / d + 4;
		}
		h *= 60;
	}
	return { h, s: s * 100, l: l * 100 };
}
function hslToRgb(h, s, l) {
	s /= 100;
	l /= 100;
	if (s === 0) {
		const v = Math.round(l * 255);
		return { r: v, g: v, b: v };
	}
	const k = (n) => (n + h / 30) % 12;
	const a = s * Math.min(l, 1 - l);
	const f = (n) =>
		l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
	return {
		r: Math.round(255 * f(0)),
		g: Math.round(255 * f(8)),
		b: Math.round(255 * f(4)),
	};
}

function deviateHexHSL(hex, { hue = 10, sat = 8, light = 8 } = {}) {
	const rgb = hexToRgb(hex);
	const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
	const rnd = (n) => (Math.random() * 2 - 1) * n;
	hsl.h = (hsl.h + rnd(hue) + 360) % 360;
	hsl.s = Math.max(0, Math.min(100, hsl.s + rnd(sat)));
	hsl.l = Math.max(0, Math.min(100, hsl.l + rnd(light)));
	const rgb2 = hslToRgb(hsl.h, hsl.s, hsl.l);
	return rgbToHex(rgb2);
}
