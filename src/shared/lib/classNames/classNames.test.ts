import { classNames } from 'shared/lib/classNames/classNames';

describe('classNames', () => {
	test('only first param', () => {
		expect(classNames('someClass')).toBe('someClass');
	});
	test('with mods', () => {
		expect(classNames('otherClass', { selected: true, active: false })).toBe('otherClass selected');
	});
	test('with additional class', () => {
		expect(classNames('elseClass', { selected: false, active: true }, ['newClass'])).toBe('elseClass newClass active');
	});

	test('with undefined mods', () => {
		expect(classNames('elseClass', { selected: undefined, active: true }, ['newClass'])).toBe(
			'elseClass newClass active'
		);
	});
});
