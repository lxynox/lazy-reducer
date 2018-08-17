import React from 'react'
import {render} from 'react-dom'

const {Provider, Consumer} = React.createContext(null);

class AmountAdjuster extends React.Component {
  state = {value: 0}
  inputRef = React.createRef()
  render() {
    const {value} = this.state
    const {children} = this.props
    return (
      <Provider value={value}>
        <input ref={this.inputRef} onChange={this.handleChange} value={value} type='number' />
        {children}
      </Provider>
    )
  }
  componentDidMount() {
    this.inputRef.current.focus()
  }
  handleChange = ({target}) => this.setState({value: parseInt(target.value)})
}

class AmountCounter extends React.Component {
  state = {count: 0}
  render() {
    const {count} = this.state
    return (
      <Consumer>
        {value => (
          <div>
            <button onClick={this.increment(value)}>+</button>
            <span>Current: {count}</span>
            <button onClick={this.decrement(value)}>-</button>
          </div>
        )}
      </Consumer>
    )
  }
  increment = value => e => this.setState(prevState => ({count: prevState.count + value}))
  decrement = value => e => this.setState(prevState => ({count: prevState.count - value}))
}

// const App = () => <div>💜💙💛💚💖💟🖤♥️❤️</div>
// export default App

render(
  <AmountAdjuster>
    <AmountCounter />
  </AmountAdjuster>,
  document.getElementById('app')
)
