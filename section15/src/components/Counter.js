import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store';

import classes from './Counter.module.css';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => {
    return state.counter.counter;
  });
  const show = useSelector((state) => {
    return state.counter.showCounter;
  })

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  }

  const increaseHandler = () => {
    dispatch(counterActions.increase(5));
  }

  const decrementHnalder = () => {
    dispatch(counterActions.decrement());
  }

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggle());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increment by 5</button>
        <button onClick={decrementHnalder}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
