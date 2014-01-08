# xtr

extracts archives (currently: tar, tgz, bz2, zip, 7z)

### Version:
   
0.0.1

### Installation:

```
$ git clone https://github.com/inhji/xtr.git
$ cd xtr
$ npm link
```

or

```
$ npm install -g xtr
```

### Usage:
   
`xtr [options] [filename]`

### Options:
   
* `-h`, `--help`, `No arguments`: Output usage information
* `-v`, `--version`: Output the version number

### What it does:
   
Extracts the archives with the file extensions listed below
to a directory with the following filename:
`<filename>_<DD-MM-JJJJ>_<timestamp>`

### Supported filetypes:
   
* `.tar`
* `.tar.gz`
* `.tar.bz2`
* `.zip`
* `.7z`

### Why I created this plugin:

![http://xkcd.com/1168/](http://imgs.xkcd.com/comics/tar.png)

Image credits: [XKCD](http://xkcd.com/ "XKCD")
