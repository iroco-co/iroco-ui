export class NavigationItem {
	hrefOrCallback: string | (() => void);
	name: string;
	type: NavigationItemType;

	constructor(
		name: string,
		hrefOrCallback: string | (() => void),
		type = NavigationItemType.ANCHOR
	) {
		this.hrefOrCallback = hrefOrCallback;
		this.name = name;
		this.type = type;
	}
}

export enum NavigationItemType {
	BUTTON,
	ANCHOR,
	FORM
}

export enum TextInputType {
	text = 'text',
	email = 'email',
	password = 'password'
}

export enum Color {
	blue = '#00B9FF',
	darkBlue = '#211D28',
	nightBlue = '#18151E',
	green = '#00D692',
	red = '#ff504d',
	yellow = '#FFE032',
	beige = '#f2ebe3',
	darkBeige = '#a9a29e',
	mediumGrey = '#464452',
	darkGrey = '#33323a',
	lightGrey = '#f5f5f5'
}

export enum ButtonKind {
	REGULAR = 'regular',
	DANGER = 'danger'
}
