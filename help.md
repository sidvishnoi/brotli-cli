NAME:
-----
	brotli, brrr - compress files using brotli algorithm.

SYNOPSIS:
---------
	brotli [-l level] [-o output_dir] [ name ... ]
	brotli [-l level] [-o output_dir] [--stdout] [ name ]
	brotli [-l level] [-o output_dir] --stdin

OPTIONS:
--------
	-h, --help
		Print this help message.
	--version
		Print program version
	-o, --output
		Output directory.
	-l, --level
		Specify compression level, a value between 1-11.
	--stdin
		Read from stdin.
	--stdout
		Write to stdout.

EXAMPLES:
---------
	brotli file.txt
		Compress file.txt, and write output to file.txt.br in current working directory (CWD).
	brotli *.js
		Compress all .js files and write output in CWD.
	brotli file.txt --output OUTPUT_DIR
		Compress file.txt and write output to OUTPUT_DIR/file.txt.br.
	cat file.txt | brotli --stdin > file.txt.br
		Read content of file.txt as stdin, and pipe output to file.txt.br.
	brotli file.txt --stdout > OUTPUT_FILE
		Compress file.txt and pipe output to OUTPUT_FILE
	brotli file.txt --level=11
		Specify compression level.
