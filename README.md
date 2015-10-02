# pheromon-codecs

[![Build Status](https://travis-ci.org/anthill/pheromon-codecs.svg)](https://travis-ci.org/anthill/pheromon-codecs)

Function to encode data used by [pheromon](https://github.com/anthill/pheromon) sources.

## List of available codecs


### signalStrengths :

This codec allows to encode measurements matching this pattern :

```
{
  date: Date(),
  devices:
  [ 
    {
      signal_strength: int,
      ID: uint32
    },
    ...
  ] 
}
```

## License

MIT
