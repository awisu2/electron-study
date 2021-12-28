import { useAppDispatch } from './store/hooks'
import { setMain, DisplayMain } from './store/reducers/display'

export default (): JSX.Element => {
  const dispatch = useAppDispatch()
  return (
    <div>
      {Object.entries(DisplayMain).map((entry) => {
        return (
          <li
            key={entry[1]}
            onClick={() => {
              dispatch(setMain(entry[1]))
            }}
          >
            <span style={{ cursor: 'pointer', borderBottom: '1px #000 solid' }}>
              {entry[1]}
            </span>
          </li>
        )
      })}
    </div>
  )
}
