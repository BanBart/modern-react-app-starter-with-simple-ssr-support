import { types, flow, getRoot, getEnv } from 'mobx-state-tree'
import LoadingState from 'models/loading_state/loading_state'

const ENDPOINT_API_PATH = '/character'

const Character = types
  .model('Character', {
    id: types.identifier,
    name: types.string,
    url: types.string,
    image: types.string,
    // authorId: types.string
  })
  .views((self) => {
    return {
      get nameWithUrl() {
        return `${self.name} ${self.url}`
      },
      // get author() {
      //   return getRoot(self).authorsStore.getAuthorById(self.authorId)
      // }
    }
  })

const CharactersStore = types
  .model('CharactersStore', {
    characters: types.optional(types.map(Character), {}),
    loadingState: types.optional(types.maybe(LoadingState), {}),
  })
  .views((self) => {
    return {
      get charactersList() {
        return Array.from(self.characters.values())
      },
    }
  })
  .actions((self) => {
    const { apiClient } = getEnv(self)

    return {
      fetch: flow(function* fetch() {
        self.loadingState.startLoading()
        yield apiClient.requestManager(
          async () => await apiClient.get(`${ENDPOINT_API_PATH}`),
          {
            onSuccessCallback: (response) => {
              response.results.forEach(self.addCharacter)
              self.loadingState.endLoading()
            },
          }
        )
      }),
      addCharacter({ id, name, url, image }) {
        self.characters.set(`${id}`, {
          id: `${id}`,
          name,
          url,
          image,
        })
      },
      reset() {
        self.loadingState.reset()
        self.characters.clear()
      },
    }
  })

export default CharactersStore
