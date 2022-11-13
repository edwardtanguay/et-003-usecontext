import { useContext } from 'react';
import { AppContext } from '../AppContext';

export const PageWelcome = () => {
	const { books } = useContext(AppContext);

	return (
		<>
			<p>Welcome to this site.</p>
			{books.length === 0 ? (
				<p>Loading....</p>
			) : (
				<p>In our club we are reading {books.length} books.</p>
			)}
		</>
	);
};
