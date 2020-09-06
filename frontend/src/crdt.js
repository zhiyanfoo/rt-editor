import username from "./username";
const BASE = 5;

export const crdtTextToString = (crdtText) => {
  if (crdtText === undefined)
    return ""
  return crdtText.map(x => x.value).join("");
}


// type crtdText = Array<CRDTChar>
// type CRDTPosition = Array<number>
// type CRDTChar = { value: string, position: CRDTPosition }
// type CRDTDeletion = CRDTChar

// output: a tuple [posIndex, deletion]: [number, CRDTDeletion]
export const createCRDTDeletion = (pos, crdtText) => {
  const posIndex =
    pos.line === 0
      ? pos.ch - 1
      : nthIndex(crdtTextToString(crdtText), "\n", pos.line) + pos.ch;

  const crdtChar = crdtText[posIndex];

  return [posIndex, crdtChar];
};

// type CRDTInsertion = CRDTChar

// output: a tuple [posIndex, insertion]: [number, CRDTInsertion]
export const createCRDTInsertion = (rng, char, pos, crdtText) => {
  const posIndex = findPos(pos, crdtText);
  let posBefore;
  let posAfter;
  if (crdtText[posIndex - 1]) {
    posBefore = crdtText[posIndex - 1].position;
  } else {
    posBefore = [];
  }
  if (crdtText[posIndex]) {
    posAfter = crdtText[posIndex].position;
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

const findPos = (pos, crdtText) => {
  let ch = pos.ch;
  let line = pos.line;

  if (line === 0) {
    return ch;
  }

  const i = nthIndex(crdtTextToString(crdtText), "\n", line);
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
