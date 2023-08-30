import { Children, FC, memo, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button} from '../Button/Button';
import { Icon } from '../Icon/Icon';
import CopyIcon from '@/shared/assets/icons/copy.svg';
import classes from './Code.module.scss';

export interface CodeProps {
	className?: string;
	children: ReactNode;
}

/**
 * Компонент устарел, используем новые компоненты из папки redesigned
 * @depricated
 */
export const Code: FC<CodeProps> = memo((props: CodeProps) => {
	const { children, className } = props;
	const onCodeCopy = useCallback(() => {
		const onlyText = Children.toArray(children).reduce((totalText: string, child) => {
			//console.log(typeof child, child.toString(), 'type of child');
			if (typeof child === 'string') totalText = totalText.concat(child.toString());
			return totalText;
		}, '');
		//console.log(onlyText, 'get text from code block');
		void navigator.clipboard.writeText(onlyText);
	}, [children]);

	return (
		<pre className={classNames(classes.code, {}, [className])}>
			<Icon className={classes.copyBtn} Svg={CopyIcon} onClick={onCodeCopy} clickable />
			<code>{children}</code>
		</pre>
	);
});
