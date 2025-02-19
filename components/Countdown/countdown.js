import React, { useEffect, useRef, useState } from 'react';
import Countdown from 'react-countdown';

const dates = [
	{
		name: 'London, UK',
		date: 'September 26, 2023',
	},
	{
		name: 'Madrid, Spain',
		date: 'October 19, 2023',
	},
	{
		name: 'Bangalore, India',
		date: 'November 30, 2023',
	},
];

function Countdowns() {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const locationRef = useRef(null);
	const dateRef = useRef(null);
	useEffect(() => {
		const intervalId = setInterval(() => {
			locationRef.current.classList.remove('hidden');
			locationRef.current.classList.add('home-title');
			dateRef.current.classList.remove('hidden');
			dateRef.current.classList.add('home-title');
			setSelectedIndex((prevIndex) => (prevIndex + 1) % dates.length);
			setTimeout(() => {
				locationRef.current.classList.remove('home-title');
				locationRef.current.classList.add('hidden');
				dateRef.current.classList.remove('home-title');
				dateRef.current.classList.add('hidden');
			}, 9900); // Element stays visible for 800 milliseconds
		}, 10000); // Toggle visibility every 1500 milliseconds

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			// Render a completed state
			return '';
		} else {
			// Render a countdown
			return (
				<div
					className='home-title flex items-center  w-[200px] sm:w-[100px] justify-between'
					ref={dateRef}
				>
					<div>
						<span className='glitch text-white text-[30px] sm:text-[18px]'>
							{days}:
						</span>
						{/* <p className='text-lg mt-[30px]'>Days</p> */}
					</div>
					<div>
						<span className='glitch text-white text-[30px] sm:text-[18px]'>
							{hours}:
						</span>
						{/* <p className='text-lg mt-[30px]'>Hours</p> */}
					</div>
					<div>
						<span className='glitch text-white text-[30px] sm:text-[18px]'>
							{minutes}:
						</span>
						{/* <p className='text-lg mt-[30px]'>Minutes</p> */}
					</div>
					<div>
						<span className='glitch text-white text-[30px] sm:text-[18px]'>
							{seconds}
						</span>
						{/* <p className='text-lg mt-[30px]'>Seconds</p> */}
					</div>
				</div>
			);
		}
	};
	return (
		<div className='mt-[400px] sm:mt-[150px] flex items-center justify-between'>
			<div className='h-[40px]'>
				<div className='home-title' ref={locationRef}>
					<span className='text-[25px] sm:text-[18px] text-white font-bold'>
						{dates[selectedIndex].name}
					</span>
				</div>
			</div>
			<div className='h-[40px]'>
				<Countdown
					date={new Date(dates[selectedIndex].date)}
					daysInHours={false}
					renderer={renderer}
				/>
			</div>
		</div>
	);
}

export default Countdowns;
