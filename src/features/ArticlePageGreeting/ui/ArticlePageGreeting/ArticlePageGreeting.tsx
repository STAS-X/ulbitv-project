import { FC, memo, ReactNode, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Modal } from '@/shared/ui/redesign/Modal/Modal';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { detectMobileDevice } from '@/shared/lib/helpers/checkIsMobile';
import { Drawer } from '@/shared/ui/deprecated/Drawer/Drawer';
import { HStack } from '@/shared/ui/redesign/Stack';
import { Card } from '@/shared/ui/deprecated/Card/Card';

export interface ArticlePageGreetingProps {
	className?: string;
	children?: ReactNode;
	onClose?: () => void;
	userName?: string;
	isModalOpen?: boolean;
}

export const ArticlePageGreeting: FC<ArticlePageGreetingProps> = memo((props: ArticlePageGreetingProps) => {
	const { className, children, userName = '-XXX-', onClose, isModalOpen = false } = props;

	const [slowClose, setSlowClose] = useState(false);

	const sleepForTime = async (ms: number, isOpen: boolean) =>
		await new Promise((resolve) => setTimeout(() => resolve(setSlowClose(isOpen)), ms));

	useEffect(() => {
		if (isModalOpen) void sleepForTime(1000, isModalOpen);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const isMobile = detectMobileDevice();

	const handleClose = () => {
		if (isModalOpen) {
			void sleepForTime(500, false);
			onClose?.();
		} else {
			void sleepForTime(0, true);
		}
	};

	if (isMobile) {
		return (
			<Drawer onClose={handleClose} isOpen={slowClose} className={classNames('', {}, [className])}>
				<HStack max>
					<Card>
						<Text
							title={`Добро пожаловать ${userName}`}
							content={
								'Приложение предназначено для показа и работы со статьями.\nУдачной работы, дорогой друг!'
							}
						/>
						{children}
					</Card>
				</HStack>
			</Drawer>
		);
	}

	return (
		<Modal isOpen={slowClose} onClose={handleClose} className={classNames('', {}, [className])}>
			{slowClose && (
				<Text
					title={`Добро пожаловать ${userName}`}
					content={'Приложение предназначено для показа и работы со статьями.\nУдачной работы, дорогой друг!'}
				/>
			)}
			{children}
		</Modal>
	);
});
