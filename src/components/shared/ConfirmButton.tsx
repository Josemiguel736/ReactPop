import Button from './Button';
import { ComponentProps } from 'react';

export interface ConfirmLogoutProps extends ComponentProps<'input'> {
	setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
	handleSubmit: () => void;
	titlePrimary: string;
	titleSecondary: string;
}

export default function Confirm({
	setIsClicked,
	handleSubmit,
	titlePrimary,
	titleSecondary,
}: ConfirmLogoutProps) {
	return (
		<div className=" text-amber-50">
			<Button
				onClick={() => {
					setIsClicked(false);
				}}
				$variant="primary"
			>
				{titlePrimary}
			</Button>
			<Button onClick={handleSubmit} $variant="secondary">
				{titleSecondary}
			</Button>
		</div>
	);
}
