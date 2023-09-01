import { memo} from 'react';
import classes from './ApplicationFallBackLayout.module.scss';
import { MainLayout } from '../MainLayout/MainLayout';
import { HStack, VStack } from '../../ui/redesign/Stack';
import { Skeleton } from '../../ui/redesign/Skeleton/Skeleton';

export interface ApplicationFallBackLayoutProps {
	className?: string;
}

export const ApplicationFallBackLayout = memo((props: ApplicationFallBackLayoutProps) => {
	const { className = '' } = props;
	//const { t } = useTranslation();

	return (
		<MainLayout className={className}
			header={
				<HStack className={classes.header}>
					<Skeleton width={40} height={40} border={'50%'} />
				</HStack>
			}
			content={
				<VStack className={classes.content} gap={16} max>
					<Skeleton width={'70%'} height={32} border={16} />
					<Skeleton width={'40%'} height={20} border={16} />
					<Skeleton width={'50%'} height={20} border={16} />
					<Skeleton width={'30%'} height={32} border={16} />
					<Skeleton width={'80%'} height={'40%'} border={16} />
					<Skeleton width={'80%'} height={'40%'} border={16} />
				</VStack>
			}
			sidebar={<Skeleton border={32} width={220} height={'100%'} />}
		/>
	);
});
