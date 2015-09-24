# pheromon-codecs
Function to encode data used by [pheromon](https://github.com/anthill/pheromon) sources

## List of available codecs


### signalStrengths :

This codec allows to encode measurements matching this pattern :

```
[
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
  },
  ...
]
```

It is used in [6sense](https://github.com/anthill/6sense)


## License

MIT
