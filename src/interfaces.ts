export interface IBook {
	id: number;
	idCode: string;
	title: string;
	description: string;
	language: string;
}

export interface IFlashcard {
	id: number;
	category: string;
	front: string;
	back: string;
	isOpen: boolean;
}