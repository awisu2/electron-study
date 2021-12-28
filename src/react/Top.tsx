import { useAppSelector, useAppDispatch } from './store/hooks'
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount
} from './store/reducers/counter'
import { useState } from 'react'

export default (): JSX.Element => {
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()
  const [n, setN] = useState(5)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <br />
      n:{' '}
      <input type="number" value={n} onChange={(e) => setN(e.target.valueAsNumber)} />
      <button onClick={() => dispatch(incrementByAmount(n))}>+ n</button>
    </div>
  )
}
