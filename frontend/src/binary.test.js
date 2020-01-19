const { binarySearch, compare } = require("./reducers.js");

const cmp = (x, y) => {
  if (x < y) {
    return -1;
  } else if (x > y) {
    return 1;
  }
  return 0;
};

// test('check1',  () => {
//   expect(binarySearch([1,2,3], cmp, 1)).toEqual([true, 0])
// })

// test('check2',  () => {
//   expect(binarySearch([1,2,3], cmp, 2)).toEqual([true, 1])
// })

// test('check3',  () => {
//   expect(binarySearch([1,2,3], cmp, 3)).toEqual([true, 2])
// })

// test('check4', () => {
//   expect(binarySearch([1,2,3], cmp, -1)).toEqual([false, 0])
// })

// test('check5', () => {
//   expect(binarySearch([1,2,3], cmp, 4)).toEqual([false, 3])
// })

// test('check6', () => {
//   expect(binarySearch([1,2,3], cmp, 1.1)).toEqual([false, 1])
// })

// test('check7', () => {
//   expect(binarySearch([1,2,3], cmp, 2.1)).toEqual([false, 2])
// })

// test('check7', () => {
//   expect(binarySearch([1,2,3, 6, 9, 12, 31], cmp, 13)).toEqual([false, 6])
// })

// test('check8', () => {
//   expect(binarySearch([1,2,3, 6, 9, 12, 31], cmp, 12)).toEqual([true, 5])
// })

// test('check9', () => {
//   expect(binarySearch([1,2,3, 6, 9, 12, 31], cmp, 12)).toEqual([true, 5])
// })

// test('check10', () => {
//   expect(binarySearch([], cmp, 12)).toEqual([false, 0])
// })

test("check11", () => {
  expect(binarySearch([1], cmp, 12)).toEqual([false, 1]);
});

test("check12", () => {
  expect(binarySearch([1], cmp, 0)).toEqual([false, 0]);
});

test("check12", () => {
  expect(binarySearch([1, 2], cmp, 0)).toEqual([false, 0]);
});

// test('charcheck1', () => {
//   expect(compare({value: 'a', position: [{digit: 1, username: 'a'}]},
//     {value: 'b', position: [{digit: 2, username: 'a'}]})).toEqual(-1)
// })

// test('charcheck1', () => {
//   expect(compare(
//     {value: 'a', position: [{digit: 1, username: 'b'}]},
//     {value: 'b', position: [{digit: 2, username: 'a'}]})).toEqual(-1)
// })

// test('bs', () => {
//   expect(binarySearch([{value: 'a', position: [{digit: 1, username: 'b'}]}],
//     compare,
//     {value: 'a', position: [{digit: 2, username: 'a'}]})).toEqual([false, 1])
// })

test("big", () => {
  const obj = {
    value: "h",
    position: [
      {
        digit: 4,
        username: "Harold"
      },
      {
        digit: 1,
        username: "Harold"
      },
      {
        digit: 4,
        username: "Harold"
      },
      {
        digit: 4,
        username: "Harold"
      },
      {
        digit: 2,
        username: "Harold"
      },
      {
        digit: 4,
        username: "Cody"
      }
    ]
  };

  const st = [
    {
      value: "j",
      position: [
        {
          digit: 1,
          username: "Harold"
        }
      ]
    },
    {
      value: "j",
      position: [
        {
          digit: 2,
          username: "Harold"
        }
      ]
    },
    {
      value: "j",
      position: [
        {
          digit: 3,
          username: "Harold"
        }
      ]
    },
    {
      value: "j",
      position: [
        {
          digit: 4,
          username: "Harold"
        }
      ]
    },
    {
      value: "a",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        }
      ]
    },
    {
      value: "a",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        }
      ]
    },
    {
      value: "a",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        }
      ]
    },
    {
      value: "a",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 2,
          username: "Harold"
        }
      ]
    },
    {
      value: "a",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        }
      ]
    },
    {
      value: "a",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 2,
          username: "Harold"
        }
      ]
    },
    {
      value: "a",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 2,
          username: "Harold"
        },
        {
          digit: 2,
          username: "Cody"
        }
      ]
    },
    {
      value: "s",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 2,
          username: "Harold"
        },
        {
          digit: 3,
          username: "Cody"
        }
      ]
    },
    {
      value: "a",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 3,
          username: "Harold"
        }
      ]
    },
    {
      value: "a",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        }
      ]
    },
    {
      value: "f",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Cody"
        }
      ]
    },
    {
      value: "f",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 3,
          username: "Cody"
        }
      ]
    },
    {
      value: "f",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Cody"
        }
      ]
    },
    {
      value: "f",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Cody"
        },
        {
          digit: 1,
          username: "Cody"
        }
      ]
    },
    {
      value: "f",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Cody"
        },
        {
          digit: 3,
          username: "Cody"
        }
      ]
    },
    {
      value: "f",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Cody"
        },
        {
          digit: 4,
          username: "Cody"
        }
      ]
    },
    {
      value: "j",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 2,
          username: "Harold"
        }
      ]
    },
    {
      value: "j",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        }
      ]
    },
    {
      value: "j",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        }
      ]
    },
    {
      value: "a",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        }
      ]
    },
    {
      value: "s",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 2,
          username: "Harold"
        }
      ]
    },
    {
      value: "d",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        }
      ]
    },
    {
      value: "f",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        }
      ]
    },
    {
      value: "h",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 3,
          username: "Harold"
        }
      ]
    },
    {
      value: "a",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        }
      ]
    },
    {
      value: "s",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 2,
          username: "Harold"
        }
      ]
    },
    {
      value: "f",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        }
      ]
    },
    {
      value: "n",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        }
      ]
    },
    {
      value: "a",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        }
      ]
    },
    {
      value: "s",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        }
      ]
    },
    {
      value: "d",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        }
      ]
    },
    {
      value: "f",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        }
      ]
    },
    {
      value: "j",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        }
      ]
    },
    {
      value: "a",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 2,
          username: "Harold"
        }
      ]
    },
    {
      value: "s",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        }
      ]
    },
    {
      value: "d",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        }
      ]
    },
    {
      value: "u",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 1,
          username: "Harold"
        }
      ]
    },
    {
      value: "f",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 3,
          username: "Harold"
        }
      ]
    },
    {
      value: "n",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        }
      ]
    },
    {
      value: "a",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 3,
          username: "Harold"
        }
      ]
    },
    {
      value: "i",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        }
      ]
    },
    {
      value: "s",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 3,
          username: "Harold"
        }
      ]
    },
    {
      value: "n",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        }
      ]
    },
    {
      value: "d",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 2,
          username: "Harold"
        }
      ]
    },
    {
      value: "f",
      position: [
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 4,
          username: "Harold"
        },
        {
          digit: 3,
          username: "Harold"
        }
      ]
    }
  ];
  expect(binarySearch(st, compare, obj)).toEqual([false, 12]);
});
