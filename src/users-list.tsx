import { memo, useState } from 'react';
import {
	AppState,
	createAppSelector,
	useAppDispatch,
	useAppSelector,
	User,
	UserId,
	UserRemoveSelectedAction,
	UserSelectedAction
} from './store';

// const selectSortedUsers = (s: AppState, sort: 'asc' | 'desc') =>
// 	s.users.ids
// 		.map((id) => s.users.entities[id])
// 		.sort((a, b) => {
// 			if (sort === 'asc') {
// 				return a.name.localeCompare(b.name);
// 			} else {
// 				return a.name.localeCompare(a.name);
// 			}
// 		});

const selectSortedUsers = createAppSelector(
	(s: AppState) => s.users.ids,
	(s: AppState) => s.users.entities,
	(_: AppState, sort: 'asc' | 'desc') => sort,
	(ids, entities, sort) =>
		ids
			.map((id) => entities[id])
			.sort((a, b) => {
				if (sort === 'asc') {
					return a.name.localeCompare(b.name);
				} else {
					return a.name.localeCompare(a.name);
				}
			})
);

// const selectSelectedUser = (s: AppState) =>
// 	s.users.selectedUserId ? s.users.entities[s.users.selectedUserId] : undefined;

export const UsersList = memo(function UsersList() {
	console.log('>>> Users list rendered!!!');

	const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');

	const sortedUsers = useAppSelector((s) => selectSortedUsers(s, sortType));
	const selectedUserId = useAppSelector((s) => s.users.selectedUserId);

	return (
		<div className='flex flex-col items-center'>
			{!selectedUserId ? (
				<div className='flex flex-col items-center justify-between'>
					<div className='flex flex-row items-center'>
						<button
							onClick={() => setSortType('asc')}
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
							Asc
						</button>
						<button
							onClick={() => setSortType('desc')}
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2'>
							Desc
						</button>
					</div>
					<ul className='list-none' style={{ listStyle: 'none' }}>
						{sortedUsers.map((user) => (
							<UserListItem userId={user.id} key={user.id} />
						))}
					</ul>
				</div>
			) : (
				<SelectedUser userId={selectedUserId} />
			)}
		</div>
	);
});

const UserListItem = memo(function UserListItem({ userId }: { userId: UserId }) {
	const dispatch = useAppDispatch();
	const handleUserClick = () => {
		dispatch({
			type: 'userSelected',
			payload: { userId }
		} satisfies UserSelectedAction);
	};
	return (
		<li key={userId} className='UserListItem' onClick={handleUserClick}>
			<span className='hover:bg-red-300 cursor-pointer'>{userId}</span>
		</li>
	);
});

function SelectedUser({ userId }: { userId: UserId }) {
	const user = useAppSelector((s) => s.users.entities[userId]);
	const dispatch = useAppDispatch();
	const handleBackButtonClick = () => {
		dispatch({
			type: 'userRemoveSelected'
		} satisfies UserRemoveSelectedAction);
	};
	return (
		<div className='flex flex-col items-center'>
			<button
				onClick={handleBackButtonClick}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md'>
				Back
			</button>
			<h2 className='text-3xl'>{user?.name}</h2>
			<p className='text-xl'>{user?.description}</p>
		</div>
	);
}
