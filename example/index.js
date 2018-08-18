import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {render} from 'react-dom'
import Counter from './Counter.jsx'

const store = createStore(state => state)
window.store = store

class App extends React.Component {
  state = {renderCounter: true}
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <button
          onClick={() =>
            this.setState({renderCounter: !this.state.renderCounter})
          }>
          {this.state.renderCounter ? 'hide counter' : 'show counter'}
        </button>
        {this.state.renderCounter && <Counter />}
      </div>
    )
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
