import {combineReducers} from 'redux'

const NOOP = () => {}

const createReducerRegistry = (baseReducer = NOOP) => {
  let currentReducer
  let loadedReducers
  let baseState
  let loadedState

  const createReducer = loadedReducer => (state = {}, action) => {
    if (baseState == null) baseState = state
    const nextBaseState = baseReducer(baseState, action)
    const nextLoadedState = loadedReducer(loadedState, action)
    const changed =
      baseState !== nextBaseState || loadedState !== nextLoadedState
    baseState = nextBaseState
    loadedState = nextLoadedState
    return changed ? {...nextBaseState, ...nextLoadedState} : state
  }

  const getReducer = () => currentReducer

  const load = (name, reducer) => {
    if (typeof name !== 'string' || typeof reducer !== 'function')
      throw new Error(
        'createReducerRegistry.js: load(name, reducer) can only take (string, function) as arguments.'
      )
    if (loadedReducers == null) loadedReducers = {}
    if (loadedReducers.hasOwnProperty(name)) return
    loadedReducers[name] = reducer
    const loadedReducer = combineReducers(loadedReducers)
    currentReducer = createReducer(loadedReducer)
  }

  const unload = name => {
    if (loadedReducer == null || !loadedReducers.hasOwnProperty(name)) return
    delete loadedReducer[name]
    const loadedReducer = combineReducers(loadedReducers)
    currentReducer = createReducer(loadedReducer)
  }

  const reset = () => {
    loadedReducers = null
    currentReducer = createReducer(NOOP)
  }

  return {getReducer, load, unload, reset}
}

export default createReducerRegistry
