A lightweight CLI to quickly compress files using Brotli Compression algorithm.

```bash
npx brrr file.txt
```

## Installation

Install the `brrr` package using npm or yarn.

```bash
npm install --global brrr

# or, if you like yarn more:
yarn global add brrr

# or, use npx for one-off runs:
npx brrr [SEE USAGE BELOW]
```

## Usage

Above will install `brrr` as a command line utility.

```bash
# compress file.txt and write output to file.txt.br
$ brrr file.txt

# compress all JS files in current directory and write output in OUT directory
$ brrr *.js -o OUT

# Use with pipes
$ brrr --stdin < INPUT > OUTPUT
$ cat INPUT.txt | brrr --stdin > OUTPUT
$ brrr input.txt --stdout
```

You can replace **`brrr`** above with **`brotli`** to sound more professional (or if miss a few _r_ in previous command — finding a good package name is difficult). That is, the following also works just as fine:

```bash
$ brotli file.txt
```

Run `brotli -h` or see [help.md](help.md) for details.

## License

MIT.
