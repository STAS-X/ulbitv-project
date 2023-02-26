import React, { ErrorInfo, ReactNode, Suspense } from 'react';
import { PageError } from 'widgets/PageError/ui/PageError';

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	errorMessage: string;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, errorMessage: '' };
	}

	static getDerivedStateFromError(error: Error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true, errorMessage: error.message };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// You can also log the error to an error reporting service
		console.error(error, errorInfo);
	}

	render() {
		const { hasError, errorMessage } = this.state;
		const { children } = this.props;

		if (hasError) {
			// You can render any custom fallback UI
			return (
				<Suspense fallback="">
					<PageError className="pageerror" message={errorMessage} />
				</Suspense>
			);
		}

		return children;
	}
}

export { ErrorBoundary };
