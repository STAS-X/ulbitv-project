import { FC, createContext, ReactNode, useEffect, useState, useRef, useMemo, useContext } from 'react';

interface AnimationProviderProps {
	Gesture?: GestureType;
	Spring?: SpringType;
	isLoaded?: boolean;
}

type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

const loadLibraryLazy = async (librarys: any[]) => {
	return Promise.all(librarys);
};

const AnimationContext = createContext<AnimationProviderProps>({});

export const useAnimationLibrarys = () => {
	return useContext(AnimationContext) as Required<AnimationProviderProps>;
};

export const AnimationProvider: FC<{ children: ReactNode }> = (props) => {
	const { children } = props;
	const [isLoaded, setIsLoaded] = useState(false);

	const Spring = useRef<SpringType>();
	const Gesture = useRef<GestureType>();

	useEffect(() => {
		const lazyLoadingLibrary = async () =>
			loadLibraryLazy([import('@react-spring/web'), import('@use-gesture/react')]).then(([lib1, lib2]) => {
				Spring.current = lib1;
				Gesture.current = lib2;
				setIsLoaded(true);
			});
		void lazyLoadingLibrary();
	}, []);

	const outContext = useMemo(
		() => (isLoaded ? { Gesture: Gesture.current, Spring: Spring.current, isLoaded } : { isLoaded: false }),
		[isLoaded]
	);

	return <AnimationContext.Provider value={{ ...outContext }}>{children}</AnimationContext.Provider>;
};
