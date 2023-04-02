import { Children, FC, memo, ReactNode, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '../Button/Button';
import { Icon } from '../Icon/Icon/Icon';
import CopyIcon from 'shared/assets/icons/copy-20-20.svg';
import classes from './Code.module.scss';

export interface CodeProps {
	className?: string;
	children: ReactNode;
}

export const Code: FC<CodeProps> = memo((props: CodeProps) => {
	const { children, className } = props;
	const onCodeCopy = useCallback(() => {
		const onlyText = Children.toArray(children).reduce((totalText, child) => {
			if (typeof child === 'string') totalText = totalText + String(child);
			return totalText;
		}, '') as string;
		//console.log(onlyText, 'get text from code block');
		navigator.clipboard.writeText(onlyText);
	}, [children]);

	return (
		<pre className={classNames(classes.code, {}, [className])}>
			<Button className={classes.copyBtn} onClick={onCodeCopy} theme={ButtonTheme.CLEAR}>
				<Icon Svg={CopyIcon} />
			</Button>
			<code>{children}</code>
		</pre>
	);
});
