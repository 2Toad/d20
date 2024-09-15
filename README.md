# d20 🎲

![GitHub Release](https://img.shields.io/github/v/release/2Toad/d20)
[![Downloads](https://img.shields.io/npm/dm/@2toad/d20.svg)](https://www.npmjs.com/package/@2toad/d20)
[![Build status](https://github.com/2toad/d20/actions/workflows/ci.yml/badge.svg)](https://github.com/2Toad/d20/actions/workflows/nodejs.yml)

A magic bag of JavaScript dice with full TypeScript support

## Getting Started

Install package

```Shell
npm i @2toad/d20
```

## Usage

```JavaScript
import { d20 } from '@2toad/d20';
// or
const { d20 } = require('@2toad/d20');
```

```JavaScript
d20.roll('1d20');
```

## API

### Methods

#### roll(notation: string, seed?: string): number
- Rolls NdX specified dice
- Where N is the number of dice, and X is the number of sides each die has
- Returns the sum of the resulting rolls
- Optional seed parameter for reproducible results

```JavaScript
// roll one 20-sided die
d20.roll('1d20');
// Possible results: 1-20

// roll four 6-sided dice
d20.roll('4d6');
// Possible results: 4-24

// roll three 7-sided dice with a seed
d20.roll('3d7', 'Dungeons & Dragons®');
// Possible results: 3-21 (will return same result for seed 'Dungeons & Dragons')
```

#### dice(notation: string, seed?: string): number[] | IterableIterator<number>
- Same as `roll()`, except the result of each die roll is returned
- For large quantities of dice (1,000,000 or more), returns an iterator instead of an array
- Optional seed parameter for reproducible results

```JavaScript
// roll one 20-sided die
d20.dice('1d20');
// Possible results: [1-20]

// roll four 6-sided dice
d20.dice('4d6');
// Possible results: [1-6, 1-6, 1-6, 1-6]

// roll three 7-sided dice with a seed
d20.roll('3d7', 'Dungeons & Dragons®');
// Possible results: [1-7, 1-7, 1-7] (will return same result for seed 'Dungeons & Dragons')
```

> For performance and memory reasons, when rolling 1,000,000 or more dice, the `dice()` function returns an iterator instead of an array.

## Further Reading

Seeding allows you to generate reproducible results by providing a specific seed value. When a seed is provided, the random number generator will produce the same sequence of radom results each time. 

For more information on how seeding works and its applications, please refer to the [Seeding](./seeding.md) documentation.


## Contributing 🤝

So you want to contribute to the d20 project? Fantastic! Please read the [Contribute](./contribute.md) doc to get started.