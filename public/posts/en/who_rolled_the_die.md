---
title: Who Rolled the Die?
description: A tabletop saving throw makes a small but important distinction visible. The language model tells the story, and a separate tool rolls the dice.
titleformat: prose
published: "2026-11-07"
tags: [ai, mcp, tabletop, python, systems]
---

The rope bridge is coming apart. Your character gets one saving throw before the last plank drops. A natural 20 has a five percent chance, even if the game master just spent three paragraphs setting up the fall.

Suppose the game master is a language model. It can write “you rolled a 14” as easily as it can describe the rope fraying. Generating that sentence can involve randomness, but the model is sampling text. Nothing in that process assigns each of the twenty faces a one-in-twenty chance.

I wanted Codex and ChatGPT to be able to make the draw under the same rules as the players. So I built a small Model Context Protocol server that takes dice notation or a numeric range and returns a result. [RNG MCP on GitHub](https://github.com/Obscuretone/rng-mcp)

## The Call That Returned 14

When I asked Codex whether the server worked, it called `roll_dice` with `{"notation":"d20"}`. The server returned this result.

```json
{
  "notation": "d20",
  "rolls": [14],
  "modifier": 0,
  "total": 14
}
```

The d20 path boils down to `1 + secrets.randbelow(20)`. Python draws from the operating system's cryptographically secure random generator and returns a uniform integer from zero through nineteen. Adding one shifts those outcomes onto the faces of the die. The tool does the same for each die in a request like `2d6+3`, then adds the modifier once. You can see the individual faces and check the arithmetic. [Python's random number API](https://docs.python.org/3/library/secrets.html#secrets.randbelow)

Bounded decimals use the same idea. A draw from 0.10 to 0.20 at two decimal places has eleven possible outcomes. The server draws an integer from 10 through 20 and places the decimal point two digits from the right. Both endpoints have the same chance as 0.15, and the result keeps its trailing zero.

## Which Roll Counts

A fair die still leaves the game master with decisions. Someone has to call for the save, set the difficulty, and decide whether a second roll is allowed. If the assistant quietly rolls again until it gets a result it likes, each individual roll can be fair while the outcome the player sees is skewed. Showing the tool result gives the table a specific roll to agree on.

The assistant can describe what the character does with a 14. Maybe they catch a hanging rope. Maybe they hit the water. That depends on the rules the table agreed to and the situation in the game. By the time the assistant writes that part of the scene, the die has already landed.
