import { FlexAlign, FlexJustify } from '../../ui/deprecated/Stack/Flex/Flex';

export const convertToProperty = (property: FlexJustify | FlexAlign) => {
	switch (property) {
		case 'start':
		case 'end':
			return `flex-${property}`;
		case 'between':
		case 'around':
			return `space-${property}`;
		case 'center':
			return `${property}`;
	}
};
