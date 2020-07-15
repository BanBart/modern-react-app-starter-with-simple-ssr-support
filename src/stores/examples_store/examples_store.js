import { types, getEnv, getRoot, flow } from 'mobx-state-tree'
import Example from 'models/example/example'
import LoadingState from 'models/loading_state/loading_state'

const ENDPOINT_API_PATH = `/v1/endpoint-path`

const ExampleStore = types
  .model('ExampleStore', {
    examples: types.optional(types.map(Example), {}),
    loadingState: types.optional(types.maybe(LoadingState), {}),
  })
  .views((self) => {
    return {
      get examplesList() {
        return Array.from(self.examples.values())
      },
      getExampleById(id) {
        return self.examples.get(id)
      },
    }
  })
  .actions((self) => {
    const { apiClient } = getEnv(self)

    return {
      fetch: flow(function* fetch() {
        self.loadingState.startLoading()
        const { locale } = getRoot(self).localeStore
        yield apiClient.requestManager(
          async () =>
            await apiClient.get(`${ENDPOINT_API_PATH}`, {
              locale,
            }),
          {
            onSuccessCallback: (response) => {
              response.data.forEach(self.addExample)
              self.loadingState.endLoading()
            },
            onNotFoundCallback: () => self.loadingState.setNotFoundError(),
          }
        )
      }),
      addExample({ id, name }) {
        self.examples.set(id, {
          id,
          name,
        })
      },
      reset() {
        self.loadingState.reset()
        self.examples.clear()
      },
    }
  })

export default ExampleStore
