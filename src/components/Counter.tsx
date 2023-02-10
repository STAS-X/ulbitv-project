import React, {useState} from 'react';
import classes from './Counter.module.scss';

export const Counter = () => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count+1);
    }

    return (
			<div>
				<h1>{count}</h1>
				<button className={classes.btn} onClick={handleClick}>
					Increment
				</button>
			</div>
		);
}