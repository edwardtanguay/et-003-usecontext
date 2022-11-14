import { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { IBook, IFlashcard } from './interfaces';
import * as tools from './tools';

interface IAppContext {
	appTitle: string;
	books: IBook[];
	flashcards: IFlashcard[],
	handleToggleFlashcard: (arg0: IFlashcard) => void
}

interface IAppProvider {
	children: React.ReactNode;
}

const booksUrl = 'https://edwardtanguay.vercel.app/share/techBooks.json';
const flashcardsUrl = 'http://localhost:5556/flashcards';
const mockApiWaitSeconds = 1;

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [books, setBooks] = useState<IBook[]>([]);
	const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
	const appTitle = 'Berlin Study Group';

	useEffect(() => {
		setTimeout(() => {
			(async () => {
				const rawBooks = (await axios.get(booksUrl)).data;
				const _books: IBook[] = [];
				rawBooks.forEach((rawBook: any) => {
					const _book: IBook = {
						id: rawBook.id,
						idCode: rawBook.idCode,
						title: rawBook.title,
						description: rawBook.description,
						language:
							rawBook.language === ''
								? 'English'
								: tools.capitalizeFirstLetter(rawBook.language),
					};
					_books.push(_book);
				});
				setBooks(_books);
			})();
		}, mockApiWaitSeconds * 1000);
	}, []);

	useEffect(() => {
		(async () => {
			const rawFlashcards = (await axios.get(flashcardsUrl)).data;
			const _flashcards: IFlashcard[] = [];
			rawFlashcards.forEach((rawFlashcard: any) => {
				const _flashcard: IFlashcard = {
					id: rawFlashcard.id,
					category: rawFlashcard.category,
					front: rawFlashcard.front,
					back: rawFlashcard.back,
					isOpen: false
				};
				_flashcards.push(_flashcard);
			});
			setFlashcards(_flashcards);
		})();
	}, []);

	const handleToggleFlashcard = (flashcard: IFlashcard) => {
		flashcard.isOpen = !flashcard.isOpen;
		setFlashcards([...flashcards]);
	}

	return (
		<AppContext.Provider
			value={{
				appTitle,
				books,
				flashcards,
				handleToggleFlashcard
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
