import username from './username'
const BASE = 8192

export const localChangeReducer = (state, action) => {
  if (action.data.origin === '+input') {
    return handleCharInsert(state, action)
  }
  if (action.data.origin === '+delete') {
    return handleCharDelete(state, action)
  }
  return state
}

const handleCharInsert = (state, action) => {
  const struct = state.struct
  const pos = {line: action.data.from.line, ch: action.data.from.ch }
  let textChar
  if (action.data.text.length === 2) {
    textChar = '\n'
  } else {
    textChar = action.data.text[0]
  }
  const [index, char] = createChar(action.rng, textChar, pos, state.struct)
  const newStruct = [
    ...struct.slice(0, index),
    char,
    ...struct.slice(index)
  ]

  return {struct: newStruct}
}

const handleCharDelete = (state, action) => {
  const struct = state.struct
  const pos = {line: action.data.to.line, ch: action.data.to.ch }
  const index = findPos(pos, struct)
  const newStruct = [
    ...struct.slice(0, index-1),
    ...struct.slice(index)
  ]
  return {struct: newStruct}
}

const createChar = (rng, char, pos, struct) => {
  const posIndex = findPos(pos, struct);
  const posBefore = struct[posIndex] || []
  const posAfter = struct[posIndex] || []
  const newPos = generatePosBetween(rng, posBefore, posAfter);
  return [posIndex, {value: char, position: newPos}]
}

function nthIndex(str, pat, n){
    var L= str.length, i= -1;
    while(n-- && i++<L){
        i= str.indexOf(pat, i);
        if (i < 0) break;
    }
    return i;
}

const findPos = (pos, struct) => {
  let ch = pos.ch;
  let line = pos.line;

  if (line === 0) {
    return ch
  }

  const i = nthIndex(struct, '\n', line)
  return i + ch - 1
}

const generatePosBetween = (rng, posBefore, posAfter, newPos=[]) => {
  const head1 = posBefore[0] || {digit : 0, username}
  const head2 = posAfter[0] || {digit : BASE, username}

  if (head2.digit - head1.digit > 1) {
    console.log('a')
    let newDigit = generateDigitBetween(rng, head1.digit, head2.digit)
    newPos.push({digit: newDigit, username})
    return newPos
  } else if (head1.digit - head2.digit === 1) {
    newPos.push(head1)
    return generatePosBetween(posBefore.slice(1), [], newPos)
  } else if (head1.digit === head2.digit) {
    if (head1.username < head2.username) {
      newPos.push(head1)
      return generatePosBetween(posBefore.slice(1), [], newPos)
    } else if (head1.username === head2.username) {
      newPos.push(head1)
      return generatePosBetween(posBefore.slice(1), posAfter.slice(1), newPos)
    }
  }
  console.log(head1)
  console.log(head2)
  throw new Error('da fuck')
}

const generateDigitBetween = (rng, min, max) => {
  min += 1
  return Math.floor(rng.quick() * (max - min)) + min;
}
