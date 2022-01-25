import { useAppSelector, useAppDispatch } from './store/hooks'
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount
} from './store/reducers/counter'
import { useState } from 'react'
import { ColorSpan, ColorId } from './styles/components'

export default (): JSX.Element => {
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()
  const [n, setN] = useState(5)
  const [color, setColor] = useState<ColorId>(ColorId.none)
  const [size, setSize] = useState<number>(10)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <br />
      n:{' '}
      <input type="number" value={n} onChange={(e) => setN(e.target.valueAsNumber)} />
      <button onClick={() => dispatch(incrementByAmount(n))}>+ n</button>
      <h4>styled-compnent sample</h4>
      <div>
        <button
          onClick={() => {
            setColor(color == ColorId.none ? ColorId.red : ColorId.none)
          }}
        >
          change color
        </button>
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
        ></input>
        <div>
          <ColorSpan color={color} size={size}>
            i can change!
          </ColorSpan>
        </div>
      </div>
    </div>
  )
}
