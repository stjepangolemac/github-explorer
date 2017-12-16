const initialState = { foo: 'bar' }

export default function (state = initialState, action) {
  switch (action.type) {
    case 'EXAMPLE':
      return { ...state, foo: 'baz' }
    default:
      return initialState
  }
}
