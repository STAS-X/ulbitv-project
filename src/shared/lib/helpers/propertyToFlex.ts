import { FlexAlign, FlexJustify } from '../../ui/Stack/Flex/Flex';

export const convertToProperty = (property: FlexJustify | FlexAlign) => {
	switch (property) {
		case 'start' || 'end':
			return `flex-${property}`;
		case 'between' || 'around' || 'evently':
			return `space-${property}`;
		case 'center':
			return `${property}`;
	}
};
