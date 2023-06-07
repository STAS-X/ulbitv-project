import { DropDownDirectionType } from '@/shared/types/dropdown/directions';

export const directionsToInlineStyle = (direction: DropDownDirectionType | undefined) => {
	switch (direction) {
		case 'bottomRight':
			return { left: 0, top: '100%' };
		case 'bottomLeft':
			return { right: '100%', top: '100%' };
		case 'topLeft':
			return { right: '100%', bottom: '100%' };
		case 'topRight':
			return { left: 0, bottom: '100%' };
		default:
			return { right: 0, top: '100%' };
	}
};
