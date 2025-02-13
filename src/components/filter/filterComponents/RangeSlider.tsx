import { ComponentProps } from 'react';

interface Props extends ComponentProps<'input'> {
	showValue: number;
	spanName: string;
}

const RangeSlider = ({ showValue, spanName, ...props }: Props) => {
	return (
		<div className="flex flex-col items-center justify-center">
			<span>{spanName}</span>
			<div className="flex flex-row gap-2.5">
				<input type="range" {...props} />
				<h1>{showValue}</h1>
			</div>
		</div>
	);
};

export default RangeSlider;
