import { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { AppState, CounterId, selectCounter, store, useAppSelector } from './store';
import { useDispatch } from 'react-redux';
import { UsersList } from './users-list';

function App() {
	// const lol = (): number => {return 5}
	// type a = typeof lol;
	// type b = ReturnType<typeof lol>;

	return (
		<>
			<div>
				<a href='https://vite.dev' target='_blank'>
					<img src={viteLogo} className='logo' alt='Vite logo' />
				</a>
				<a href='https://react.dev' target='_blank'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				<Counter counterId='0' />
				<Counter counterId='1' />
			</div>

			<UsersList />
		</>
	);
}

export const Counter = ({ counterId }: { counterId: CounterId }) => {
	console.log('Render: ', counterId);
	const dispatch = useDispatch();
	const counterState = useAppSelector((s) => selectCounter(s, counterId));

	// const [, setLol] = useState(false);

	// const lastStateRef = useRef<ReturnType<typeof selectCounter>>();

	// useEffect(() => {
	// 	const unsubscribe = store.subscribe(() => {
	// 		const currentState = selectCounter(store.getState(), counterId);
	// 		const lastState = lastStateRef.current;
	// 		if (currentState !== lastState) {
	// 			setLol((prev) => !prev);
	// 		}
	// 		lastStateRef.current = currentState;
	// 	});
	// 	return unsubscribe;
	// }, []);

	// const counterState = selectCounter(store.getState(), counterId);

	return (
		<>
			<div className='card'>
				<button onClick={() => dispatch({ type: 'inc', payload: { counterId } })}>Inc</button>
				<button onClick={() => dispatch({ type: 'dec', payload: { counterId } })}>Dec</button>
				<p>Counter: {counterState?.counter}</p>
			</div>
		</>
	);
};

export default App;
