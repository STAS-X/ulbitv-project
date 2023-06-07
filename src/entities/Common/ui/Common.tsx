/* eslint-disable i18next/no-literal-string */
import { StateSchema } from '@/app/providers/StoreProvider';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { commonActions } from '..';
import { getCommonValue } from '../model/selectors/getCommon/getCommon';

interface commonProps {
	commonValue?: number;
}

export const Counter: FC<commonProps> = ({ commonValue = 1 }) => {
	const value = useSelector<StateSchema, number>(getCommonValue);
	const dispatch = useDispatch();

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
			style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'start', marginTop: 25 }}
		>
			<h1 data-testid="common-value">{value}</h1>
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
