import { types } from 'mobx-state-tree'

const INITIAL = 'initial'
const LOADING = 'loading'
const LOADED = 'loaded'
const NOT_FOUND_ERROR = 'not_found'

const LoadingState = types
  .model('LoadingState', {
    state: types.optional(
      types.enumeration([INITIAL, LOADING, LOADED, NOT_FOUND_ERROR]),
      INITIAL
    ),
  })
  .views((self) => ({
    get isLoaded() {
      return self.state === LOADED
    },
    get isInitial() {
      return self.state === INITIAL
    },
    get isNotFoundError() {
      return self.state === NOT_FOUND_ERROR
    },
  }))
  .actions((self) => {
    return {
      startLoading() {
        self.state = LOADING
      },
      endLoading() {
        self.state = LOADED
      },
      setNotFoundError() {
        self.state = NOT_FOUND_ERROR
      },
      reset() {
        self.state = INITIAL
      },
    }
  })

export default LoadingState
