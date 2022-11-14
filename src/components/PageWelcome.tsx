import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../AppContext';

export const PageWelcome = () => {
	const { books, flashcards } = useContext(AppContext);

	return (
		<>
			<p>Welcome to this site.</p>
			{books.length === 0 ? (
				<p>Loading....</p>
			) : (
				<p>In our club we are reading <NavLink to="/books">{books.length} books</NavLink> learning <NavLink to="/flashcards">{flashcards.length} flashcards</NavLink>.</p>
			)}
		</>
	);
};
