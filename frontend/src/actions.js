
export const onChange = (editor, data, value) => {
  return {
    type: 'ON_CHANGE',
    editor,
    data,
    value
  }
}

