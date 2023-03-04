import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { counterActions } from '..';
import { StateSchema } from 'app/providers/StoreProvider/config/stateSchema';
import { getCounterValue } from 'entities/Counter/model/selectors/getCounter/getCounter';

interface CounterProps {
	counterValue?: number;
}

export const Counter: FC<CounterProps> = ({ counterValue = 1 }) => {
	const value = useSelector<StateSchema>(getCounterValue);
	const dispatch = useDispatch();

	const setIncrement = () => {
		dispatch(counterActions.incrementByAmount(2));
	};

	const setDecrement = () => {
		dispatch(counterActions.decrement());
	};

	useEffect(() => {
		counterActions.setByAmount(counterValue);
	}, []);

	return (
		<div
			data-testid="counter"
			style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'start', marginTop: 25 }}
		>
			<h1 data-testid="counter-value">{value}</h1>
			<Button
				theme={value < 10 ? ButtonTheme.OUTLINE : ButtonTheme.BACKGROUND_INVERTED}
				data-testid="increment-btn"
				onClick={setIncrement}
				{...(value < 10 ? { disabled: false } : { disabled: true })}
			>
				inc
			</Button>
			<Button
				theme={value > 0 ? ButtonTheme.OUTLINE : ButtonTheme.BACKGROUND_INVERTED}
				data-testid="decrement-btn"
				onClick={setDecrement}
				{...(value > 0 ? { disabled: false } : { disabled: true })}
			>
				dec
			</Button>
		</div>
	);
};
