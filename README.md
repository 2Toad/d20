# d20

[![GitHub version](https://badge.fury.io/gh/2Toad%2Fd20.svg)](https://badge.fury.io/gh/2Toad%2Fd20)
[![Downloads](https://img.shields.io/npm/dm/@2toad/d20.svg)](https://www.npmjs.com/package/@2toad/d20)
[![Build Status](https://travis-ci.org/2Toad/d20.svg?branch=master)](https://travis-ci.org/2Toad/d20)

A magic bag of JavaScript dice (with TypeScript support)

## Getting Started

Install package

```
npm i @2toad/d20
```

## Usage

```
import { d20 } from '@2toad/d20';
// or
var d20 = require('@2toad/d20');

d20.roll('1d20');
```

## API

### Methods

#### roll(notation: string): number
- Rolls NdX specified dice
- Where N is the number of dice, and X is the number of sides each die has
- Returns the sum of the resulting rolls

```
// roll one 20-sided die
d20.roll('1d20');
// Possible results: 1-20

// roll four 6-sided dice
d20.roll('4d6');
// Possible results: 4-24
```

#### dice(notation: string): number[]
Same as `roll()`, except the result of each die roll is returned in an array

```
// roll one 20-sided die
d20.dice('1d20');
// Possible results: [1-20]

// roll four 6-sided dice
d20.dice('4d6');
// Possible results: [1-6, 1-6, 1-6, 1-6]
```
