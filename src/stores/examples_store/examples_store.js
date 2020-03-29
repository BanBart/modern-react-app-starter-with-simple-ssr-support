import { types, getEnv, getRoot, flow } from 'mobx-state-tree'
import Example from 'models/example/example'

const INITIAL = 'initial'
const LOADING = 'loading'
const LOADED = 'loaded'
const NOT_FOUND_ERROR = 'not_found'
const ENDPOINT_API_PATH = `/v1/endpoint-path`

const ExampleStore = types
  .model('ExampleStore', {
    state: types.optional(
      types.enumeration([INITIAL, LOADING, LOADED, NOT_FOUND_ERROR]),
      INITIAL
    ),
    examples: types.optional(types.map(Example), {})
  })
  .views(self => {
    return {
      get isLoaded() {
        return self.state === LOADED
      },
      get isInitial() {
        return self.state === INITIAL
      },
      get isNotFoundError() {
        return self.state === NOT_FOUND_ERROR
      },
      get examplesList() {
        return Array.from(self.examples.values())
      },
      getExampleById(id) {
        return self.examples.get(id)
      }
    }
  })
  .actions(self => {
    const { apiClient } = getEnv(self)

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
      fetch: flow(function* fetch() {
        self.startLoading()
        const { locale } = getRoot(self).localeStore
        yield apiClient.requestManager(
          async () =>
            await apiClient.get(`${ENDPOINT_API_PATH}`, {
              locale
            }),
          response => {
            response.data.forEach(self.addExample)
            self.endLoading()
          },
          () => self.setNotFoundError()
        )
      }),
      addExample({ id, name }) {
        self.examples.set(id, {
          id,
          name
        })
      },
      reset() {
        self.state = INITIAL
        self.examples.clear()
      }
    }
  })

export default ExampleStore
