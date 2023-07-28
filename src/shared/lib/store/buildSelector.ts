import { StateSchema } from '@/app/providers/StoreProvider';
import { useSelector } from 'react-redux';

type Selector<T, Args extends any[]> = (state: StateSchema, ...args: Args) => T;
type HookSelector<T, Args extends any[]> = (...args: Args) => T;
type Result<T, Args extends any[]> = [HookSelector<T, Args>, Selector<T, Args>];

export function buildSelector<T, Args extends any[]>(selector: Selector<T, Args>): Result<T, Args> {
	const useSelectorHook: HookSelector<T, Args> = (...args: Args) => {
		console.log(args, 'get args of selector');
		return useSelector((state: StateSchema) => selector(state, ...args));
	};

	return [useSelectorHook, selector];
}
