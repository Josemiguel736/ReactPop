import { Component, ErrorInfo, ReactNode } from 'react';
import Page501 from '../../pages/ErrorPages/501';

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
			return <Page501 error={error}></Page501>;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
