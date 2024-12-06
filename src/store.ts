import { configureStore } from '@reduxjs/toolkit';

export type CounterId = string;

type CounterState = {
	counter: number;
};

export type State = {
	counters: Record<CounterId, CounterState | undefined>;
};

export type DecAction = { type: 'inc'; payload: { counterId: CounterId } };
export type IncAction = { type: 'dec'; payload: { counterId: CounterId } };
type Action = DecAction | IncAction;

const initilaCounterState: CounterState = { counter: 0 };
const initialState: State = { counters: {} };

const reducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case 'inc': {
			const { counterId } = action.payload;
			const currentCounter = state.counters[counterId] ?? initilaCounterState;
			return {
				...state,
				counters: {
					...state.counters,
					[counterId]: {
						...currentCounter,
						counter: currentCounter.counter + 1
					}
				}
			};
		}
		case 'dec': {
			const { counterId } = action.payload;
			const currentCounter = state.counters[counterId] ?? initilaCounterState;
			return {
				...state,
				counters: {
					...state.counters,
					[counterId]: {
						...currentCounter,
						counter: currentCounter.counter - 1
					}
				}
			};
		}
		default:
			return state;
	}
};

export const store = configureStore({
	reducer
});

export type AppState = ReturnType<typeof store.getState>;
