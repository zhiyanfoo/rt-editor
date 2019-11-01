export const localInsertionReducer = (state, action) => {
  const struct = state.struct
  const index = action.index
  const char = action.char
  const newStruct = [
    ...struct.slice(0, index),
    char,
    ...struct.slice(index)
  ]
  console.log('struct')
  console.log(newStruct.map((x) => x.value).join())
  return {struct: newStruct}
}

export const localDeletionReducer = (state, action) => {
  const struct = state.struct
  const index = action.index
  const newStruct = [
    ...struct.slice(0, index-1),
    ...struct.slice(index)
  ]
  return {struct: newStruct}
}

export const remoteInsertionReducer = (state, action) => {
  const struct = state.struct
  console.log('fafafa')
  console.log(action)
  return {struct: struct}
}

export const remoteDeletionReducer = (state, action) => {
  const struct = state.struct
  console.log('asdfa')
  console.log(action)
  return {struct: struct}
}
