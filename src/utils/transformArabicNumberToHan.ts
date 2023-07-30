interface numToHan extends Record<string, any> {}
interface HanNumberPlace extends Record<string, any> {}
interface numberPlace {
	value: string;
	place: number;
}
const numToHan: numToHan = {
	1: "一",
	2: "二",
	3: "三",
	4: "四",
	5: "五",
	6: "六",
	7: "七",
	8: "八",
	9: "九",
	0: "十",
};
const HanNumberPlace: HanNumberPlace = {
	0: `个`,
	1: `十`,
	2: `百`,
	3: `千`,
	4: `万`,
	5: `十万`,
	6: `百万`,
};
export const transformArabicToHanz = (
	num: number,
	i: number = 0,
	m: boolean = false
): string => {
	const power = Object.keys(HanNumberPlace).length;
	if (num >= 10 ** power) return "输入的数字超出最大位数限制，请重新输入";
	const q = Math.floor(num / 10 ** i);
	const r = num % 10 ** i;
	// Process number is less than or equals to 9. e.g 零,一....，九
	if (num <= 9) {
		if (num === 0) return "零";
		return numToHan[String(num)];
	}
	// Process number is between 10 and 20(no included). e.g 十,十一...十九
	if (getPlace(num).value === "十" && q >= 10 && q < 20) {
		if (m) {
			if (q === 10) return `一${numToHan[String(r % 10)]}`;
			return `一十${numToHan[String(num % 10)]}`;
		} else {
			if (q === 10) return numToHan[String(0)];
			return `十${numToHan[String(num % 10)]}`;
		}
	}
	if (!(q <= 9)) {
		return transformArabicToHanz(num, ++i);
	} else {
		const expectedPlace: string =
			HanNumberPlace[String(getPlace(num, 0).place - 1)];
		const realPlace = getPlace(r).value;
		// Process the zero to '零'  if one or more zero is between the number.e.g 1104 to 一千一百零四 instead of 一千一百四
		if (!(expectedPlace === realPlace)) {
			if (r === 0) return `${numToHan[String(q)]}${getPlace(num).value}`;
			return `${numToHan[String(q)]}${
				getPlace(num).value
			}零${transformArabicToHanz(r, 0, true)}`;
		} else {
			if (r === 0) return `${numToHan[String(q)]}${getPlace(num).value}`;
			return `${numToHan[String(q)]}${
				getPlace(num).value
			}${transformArabicToHanz(r, 0, true)}`;
		}
	}
};
const getPlace = (num: number, n = 0): numberPlace => {
	if (!(Math.floor(num / 10 ** n) <= 9)) {
		return getPlace(num, ++n);
	} else {
		return {
			value: HanNumberPlace[String(n)],
			place: n,
		};
	}
};
