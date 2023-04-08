import { ReducerManager, StateSchema, StateSchemaKey } from './StateSchema';
import { AnyAction, combineReducers, Reducer, ReducersMapObject } from '@reduxjs/toolkit';

export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManager {
	// Create an object which maps keys to reducers
	const reducers = { ...initialReducers };

	// Create the initial combinedReducer
	let combinedReducer = combineReducers(reducers);

	// An array which is used to delete state keys when reducers are removed
	let keysToRemove: Array<StateSchemaKey> = [];

	return {
		getReducerMap: () => reducers,

		// The root reducer function exposed by this object
		// This will be passed to the store
		reduce: (state: StateSchema, action: AnyAction) => {
			// If any reducers have been removed, clean up their state first
			if (keysToRemove.length > 0) {
				state = { ...state };
				// eslint-disable-next-line prefer-const
				for (let key of keysToRemove) {
					delete state[key];
				}
				keysToRemove = [];
			}

			// Delegate to the combined reducer
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
			return combinedReducer(state, action);
		},

		// Adds a new reducer with the specified key
		add: (key: StateSchemaKey, reducer?: Reducer) => {
			if (!key || !reducer || reducers[key]) {
				return;
			}

			// Add the reducer to the reducer mapping
			reducers[key] = reducer;

			// Generate a new combined reducer
			combinedReducer = combineReducers(reducers);
		},

		// Removes a reducer with the specified key
		remove: (key: StateSchemaKey) => {
			if (!key || !reducers[key]) {
				return;
			}

			// Remove it from the reducer mapping
			delete reducers[key];
			//console.log(`remove reducer ${key}`);
			// Add the key to the list of keys to clean up
			keysToRemove.push(key);

			// Generate a new combined reducer
			combinedReducer = combineReducers(reducers);
		}
	};
}