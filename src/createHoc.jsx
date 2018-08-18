import React from 'react'
import {object} from 'prop-types'
import createReducerRegistry from './createReducerRegistry'

const createRegisterReducer = rootReducer => (reducers = {}) => Component =>
  class ReducerInjector extends React.Component {
    static contextTypes = {
      store: object.isRequired,
    }

    reducerRegistry = createReducerRegistry(rootReducer)

    componentWillMount() {
      if (Object.keys(reducers).length === 0) return
      Object.keys(reducers).forEach(name => this.reducerRegistry.load(name, reducers[name]))
      this.context.store.replaceReducer(this.reducerRegistry.getReducer())
    }

    componentWillUnmount() {
      if (Object.keys(reducers).length === 0) return;
      this.reducerRegistry.reset();
      this.context.store.replaceReducer(this.reducerRegistry.getReducer())
    }

    render() {
      return React.createElement(Component, this.props);
    }
  }

export default createRegisterReducer
