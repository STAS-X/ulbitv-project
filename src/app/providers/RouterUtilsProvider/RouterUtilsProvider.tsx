import { useRef, useMemo, useContext, FC, createContext, ReactNode } from 'react';
import { useNavigate as useNavigateOriginal, useLocation as useLocationOriginal } from 'react-router-dom';

const RouterUtilsContext = createContext<any>({});
/*
  With this RouterUtilsContext - we tank the updates from react-router context and
  drill down navigate and location from a separate context.
  This will prevent re-render of consumer components of these hooks for every route change
  and allow using these hooks as utilities instead of context subscribers
*/
interface RouterUtilsProps {
	children: ReactNode;
}

const RouterUtils: FC<RouterUtilsProps> = (props) => {
	const { children } = props;

	const navigate = useNavigateOriginal();
	const location = useLocationOriginal();

	// useRef retains object reference between re-renders
	const navigateRef = useRef<ReturnType<typeof useNavigateOriginal>>(navigate);
	const locationRef = useRef<ReturnType<typeof useLocationOriginal>>(location);

	navigateRef.current = navigate;
	locationRef.current = location;

	// contextValue never changes between re-renders since refs don't change between re-renders
	const contextValue = useMemo(() => {
		return { navigateRef, locationRef };
	}, [locationRef, navigateRef]);

	// since contextValue never changes between re-renders, components/hooks using this context
	// won't re-render when router context updates
	return <RouterUtilsContext.Provider value={contextValue}>{children}</RouterUtilsContext.Provider>;
};

/* 

  useNavigate() re-rendering all components is a known bug in react-router
  and might get fixed soon. https://github.com/remix-run/react-router/issues/8349
  Please be aware: when the url changes - this hook will NOT re-render 
  Only use it as a utility to push url changes into Router history
  which will then re-render the whole route component.
  Eg. const navigate = useNavigate();
*/
export const useNavigate = () => {
	const { navigateRef } = useContext(RouterUtilsContext);
	return navigateRef.current as ReturnType<typeof useNavigateOriginal>;
};

/* 
  Please be aware: when the url changes - this hook will NOT re-render 
  Only use it as a utility to get latest location object.
  Eg. const location = useLocation();
*/
export const useLocation = () => {
	const { locationRef } = useContext(RouterUtilsContext);
	return locationRef.current as ReturnType<typeof useLocationOriginal>;
};

export default RouterUtils;
