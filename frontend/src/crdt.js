import username from "./username";
const BASE = 5;

export const structToText = (struct) => {
  if (struct === undefined)
    return ""
  return struct.map(x => x.value).join("");
}

// TODO: Are we gonna keep naming the CRDT text variable with "struct"?
//       Whats a better name?

// type CRDTPosition = Array<number>
// type CRDTChar = { value: string, position: CRDTPosition }
// type CRDTDeletion = CRDTChar

// output: a tuple [posIndex, deletion]: [number, CRDTDeletion]
export const createCRDTDeletion = (pos, struct) => {
  const posIndex =
    pos.line === 0
      ? pos.ch - 1
      : nthIndex(structToText(struct), "\n", pos.line) + pos.ch;

  const crdtChar = struct[posIndex];

  return [posIndex, crdtChar];
};

// type CRDTInsertion = CRDTChar

// output: a tuple [posIndex, insertion]: [number, CRDTInsertion]
export const createCRDTInsertion = (rng, char, pos, struct) => {
  const posIndex = findPos(pos, struct);
  let posBefore;
  let posAfter;
  if (struct[posIndex - 1]) {
    posBefore = struct[posIndex - 1].position;
  } else {
    posBefore = [];
  }
  if (struct[posIndex]) {
    posAfter = struct[posIndex].position;
  } else {
    posAfter = [];
  }

  const newPos = generatePosBetween(rng, posBefore, posAfter);
  return [posIndex, { value: char, position: newPos }];
};

function nthIndex(str, pat, n) {
  var L = str.length,
    i = -1;
  while (n-- && i++ < L) {
    i = str.indexOf(pat, i);
    if (i < 0) break;
  }
  return i;
}

const findPos = (pos, struct) => {
  let ch = pos.ch;
  let line = pos.line;

  if (line === 0) {
    return ch;
  }

  const i = nthIndex(structToText(struct), "\n", line);
  return i + ch + 1;
};

const generatePosBetween = (rng, posBefore, posAfter, newPos = []) => {
  const head1 = posBefore[0] || { digit: 0, username };
  const head2 = posAfter[0] || { digit: BASE, username };

  if (head2.digit - head1.digit > 1) {
    let newDigit = generateDigitBetween(rng, head1.digit, head2.digit);
    newPos.push({ digit: newDigit, username });
    return newPos;
  } else if (head2.digit - head1.digit === 1) {
    newPos.push(head1);
    return generatePosBetween(rng, posBefore.slice(1), [], newPos);
  } else if (head2.digit === head1.digit) {
    if (head1.username < head2.username) {
      newPos.push(head1);
      return generatePosBetween(rng, posBefore.slice(1), [], newPos);
    } else if (head1.username === head2.username) {
      newPos.push(head1);
      return generatePosBetween(
        rng,
        posBefore.slice(1),
        posAfter.slice(1),
        newPos
      );
    }
  }
  console.log(head1);
  console.log(head2);
  throw new Error("da fuck");
};

const generateDigitBetween = (rng, min, max) => {
  min += 1;
  return Math.floor(rng.quick() * (max - min)) + min;
};
