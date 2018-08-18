import React from 'react'
import createHoc from '../lib/main' // if in development, use '../src', hot reload or sourcemap etc.
import {connect} from 'react-redux'

const actions = {
  increment() { return {type: 'INCREMENT'} },
  decrement() { return {type: 'DECREMENT'} }
}

const reducer = (state = 0, {type}) => {
  if (type === 'INCREMENT')  return ++state
  else if (type === 'DECREMENT') return --state
  else return state
}

export default createHoc(state => state)({counter: reducer})(
  connect(
    ({counter}) => ({value: counter}),
    actions
  )(
    ({value, increment, decrement}) =>
      <div>
        <button onClick={increment}>+</button>
        {value}
        <button onClick={decrement}>-</button>
      </div>
  )
)
