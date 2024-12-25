import { configureStore, createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';

const users: User[] = Array.from({ length: 3000 }, (_, index) => ({
	id: `user ${index + 11}`,
	name: `User ${index + 11}`,
	description: `Description for User ${index + 11}`
}));

export type UserId = string;

export type User = {
	id: UserId;
	name: string;
	description: string;
};

type UserState = {
	entities: Record<UserId, User>;
	ids: UserId[];
	selectedUserId: UserId | undefined;
};

export type CounterId = string;

type CounterState = {
	counter: number;
};

export type State = {
	counters: Record<CounterId, CounterState | undefined>;
	users: UserState;
};

export type UserSelectedAction = { type: 'userSelected'; payload: { userId: UserId } };
export type UserRemoveSelectedAction = { type: 'userRemoveSelected' };
export type UsersStoredAction = { type: 'usersStored'; payload: { users: User[] } };
export type DecAction = { type: 'inc'; payload: { counterId: CounterId } };
export type IncAction = { type: 'dec'; payload: { counterId: CounterId } };
type Action = DecAction | IncAction | UserSelectedAction | UserRemoveSelectedAction | UsersStoredAction;

const initilaCounterState: CounterState = { counter: 0 };
const initilaUsersState: UserState = { entities: {}, ids: [], selectedUserId: undefined };
const initialState: State = { counters: {}, users: initilaUsersState };

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
		case 'usersStored': {
			const { users } = action.payload;
			return {
				...state,
				users: {
					...state.users,
					entities: users.reduce((acc, user) => {
						acc[user.id] = user;
						return acc;
					}, {} as Record<UserId, User>),
					ids: users.map((user) => user.id)
				}
			};
		}
		case 'userSelected': {
			const { userId } = action.payload;
			return { ...state, users: { ...state.users, selectedUserId: userId } };
		}
		case 'userRemoveSelected': {
			return { ...state, users: { ...state.users, selectedUserId: undefined } };
		}
		default:
			return state;
	}
};

export const store = configureStore({
	reducer
});

store.dispatch({ type: 'usersStored', payload: { users } } satisfies UsersStoredAction);

export const selectCounter = (state: AppState, counterId: CounterId) => state.counters[counterId];

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<AppStore>();
export const createAppSelector = createSelector.withTypes<AppState>();
