import { types } from 'mobx-state-tree'

const Example = types
  .model('Example', {
    id: types.identifier,
    name: types.maybeNull(types.string)
  })
  .views(self => {
    return {}
  })

export default Example
