export const range = (start: number, end: number) =>
	Array.from(new Array(end - start + 1)).map((_, i) => i + start);
