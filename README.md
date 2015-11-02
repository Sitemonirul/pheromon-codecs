# pheromon-codecs

[![Build Status](https://travis-ci.org/anthill/pheromon-codecs.svg)](https://travis-ci.org/anthill/pheromon-codecs)

Function to encode data used by [pheromon](https://github.com/anthill/pheromon) sources.

## List of available codecs


### signalStrengths :

This codec allows to encode measurements matching this pattern :

```js
{
  date: Date(),
  devices:
  [ 
    {
      signal_strength: int,
      ID: uint32 // ID is optionnal
    },
    ...
  ] 
}
```

It is used in [6sense](https://github.com/anthill/6sense) in order to send a list of devices currently visible.


### trajectories :

This codec allows to encode trajectories matching this pattern :
```js
[
  [
    {
      date: Date(),
      signal_strength: int
    },
    ...
  ],
  [
    {
      date: Date(),
      signal_strength: int
    },
    ...
  ],
  ...
]
```

It is used in [6sense](https://github.com/anthill/6sense) in order to send all trajectories of all devices seen everyday.

## License

MIT
