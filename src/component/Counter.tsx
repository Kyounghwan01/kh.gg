import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount
} from "store/counter/counterSlice";
import { setTitle } from "store/example/exampleSlice";
import { titles, getFilterLike } from "store/example/exampleSlice";

import { fetchTodo } from "store/example/exampleSlice";
import styles from "./Counter.module.css";
import { Alert } from "react-bootstrap";

export function Counter() {
  const count = useSelector(selectCount);
  // const list = useSelector(lists);
  const title = useSelector(titles);
  const filterLikes = useSelector(getFilterLike);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  useEffect(() => {
    dispatch(fetchTodo({ test1: 321, test2: 123 }));
  }, [dispatch]);

  return (
    <div>
      <Alert variant="danger" onClose={() => console.log(1)}>
        <Alert.Heading>Hey, nice to see you</Alert.Heading>
        <p>
          Aww yeah, you successfully read this important alert message. This
          example text is going to run a bit longer so that you can see how
          spacing within an alert works with this kind of content.
        </p>
        <hr />
        <p className="mb-0">
          Whenever you need to, be sure to use margin utilities to keep things
          nice and tidy.
        </p>
      </Alert>
      <p>ㅇㅇㅇㅇ123123 {title.zxc}</p>
      {filterLikes.map(({ id }: { id: string }, index: React.ReactNode) => (
        <p key={id}>
          {id}
          {index}
        </p>
      ))}
      <button onClick={() => dispatch(setTitle({ zxc: "z", content: 2 }))}>
        setTitle
      </button>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
    </div>
  );
}
