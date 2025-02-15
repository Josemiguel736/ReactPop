import { Component, ErrorInfo, ReactNode } from 'react';
import Page500 from '../../pages/ErrorPages/500';

interface Props {
	children: ReactNode;
}

class ErrorBoundary extends Component<
	Props,
	{ error: null | Error; info: unknown }
> {
	constructor(props: Props) {
		super(props);

		this.state = {
			error: null,
			info: null,
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.warn(error.message, Date.now());
		this.setState({ error, info: errorInfo });
	}

	render() {
		const { error } = this.state;

		if (error) {
			return <Page500 error={error}></Page500>;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
