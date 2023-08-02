/* eslint-disable i18next/no-literal-string */
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { useCounterValue } from '../model/selectors/getCommon/getCommon';
import { commonActions, useCounterActions } from '../model/slices/commonSlices';

interface commonProps {
	commonValue?: number;
}

export const Counter: FC<commonProps> = ({ commonValue = 1 }) => {
	//const value = useSelector<StateSchema, number>(getCommonValue);
	const dispatch = useDispatch();
	const counterValue = useCounterValue();
	const { increment, decrement, incrementByAmount } = useCounterActions();

	const setIncrement = () => {
		dispatch(commonActions.increment());
	};

	const setDecrement = () => {
		dispatch(commonActions.decrement());
	};

	useEffect(() => {
		commonActions.setByAmount(commonValue);
	}, [commonValue]);

	return (
		<div
			data-testid="common"
			style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'start', marginBlock: 25 }}
		>
			<h1 data-testid="common-value">{counterValue}</h1>
			<div style={{ display: 'flex', gap: 10 }}>
				<Button
					theme={counterValue < 100 ? ButtonTheme.OUTLINE : ButtonTheme.BACKGROUND_INVERTED}
					data-testid="inc-five-btn"
					onClick={() => incrementByAmount(5)}
					{...(counterValue < 100 ? { disabled: false } : { disabled: true })}
				>
					addFive
				</Button>
				<Button
					theme={counterValue < 100 ? ButtonTheme.OUTLINE : ButtonTheme.BACKGROUND_INVERTED}
					data-testid="increment-btn"
					onClick={() => increment()}
					{...(counterValue < 100 ? { disabled: false } : { disabled: true })}
				>
					inc
				</Button>
				<Button
					theme={counterValue > 0 ? ButtonTheme.OUTLINE : ButtonTheme.BACKGROUND_INVERTED}
					data-testid="decrement-btn"
					onClick={() => decrement()}
					{...(counterValue > 0 ? { disabled: false } : { disabled: true })}
				>
					dec
				</Button>
			</div>
		</div>
	);
};
