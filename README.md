# RGB Scripts devtool for Q Light Controller Plus (QLC+)

This application allows create [scripts for RGB matrix](https://www.qlcplus.org/docs/html_en_EN/concept.html#RGBMatrix) easy, faster and error-free.

## Motivation

QLC+ has [pre-installed scripts](https://github.com/mcallegari/qlcplus/tree/master/resources/rgbscripts) for demonstrating animation effects on an RGB matrix. It is possible to write [custom scripts on JavaScript](https://www.qlcplus.org/docs/html_en_EN/rgbscriptapi.html).

But creating scripts comes with many inconveniences, for example:

- QLC+ can only work with ECMAScript2009 (ES5). Although es2021 version is available now.
- The script code must be in one file and there is no way to separate part of the logic into separate modules.
- The weak type system of Javascript makes it difficult to learn API functions.

This devtool aims to improve DX of development scripts for RGB matrix in QLC+. It allows to create scripts in [Typescript](https://www.typescriptlang.org/) using [es modules](https://nodejs.org/api/esm.html) and without routine copy-paste of service code.

## Install

Clone this repository and install dependencies:

```
git clone --depth 1 https://github.com/mrfratello/qlcplus-rgb-script-devtool.git
cd ./qlcplus-rgb-script-devtool
npm ci
```

It is also recommended to [install QLC+ application](https://www.qlcplus.org/downloads.html) for run scripts in the "combat" conditions.

## Usage

Creating and installing a script for an RGB matrix consists of the following steps:

1. Generating a boilerplate of script
2. Writing logic of animation effects for RGB matrix and debugging in the web browser
3. Deploy on QLC+ App

### Generating a script

It is better to use the generator to create a new script:

```
npm run generate
```

After entering the command, need to answer several questions: the name of the script, the main parameters and etc.

As a result, a file will be created in the `src/scripts` folder. This file will already contain the necessary code to work with the RGB matrix.

### Writing and debugging

Scripts are programmed in Typescript.

The folder structure of the project is as follows:

- `src/scripts/*.ts` entry point for scripts. From these files, the resulting files for QLC + are obtained.
- `src/types/*.ts` types of main and additional API objects.
- `src/common/*.ts` es modules that can be used in multiple scripts. For example, a function for filling a matrix with color.

The developer can organize his own project structure in the `src` folder. But the `src/scripts` folder must exist and contain only script entry points.

Чтобы дебажить свои программы нужно запустить две команды в разных терминалах (чтобы эти команды работали параллельно).

To debug your programs, you need to run two commands in different terminals (so that the commands work in parallel).

First command:

```
npm run watch
```

The watcher will start, which will watch for changes in the `src/scrtips/*.ts` files and the es modules included to it.

As soon as the change is committed, the program will collect the script entry point and the code of the included modules into one file, then transpile the resulting code into Javascript ES5 version and save the resulting files to the `dist/scripts/*.js` folder. The resulting files are source scripts for QLC+ and for debugging in a web browser.

The second command must be executed in another terminal (the first command must not be stopped):

```
npm start
```

The web server will start with the QLC+ Development Tool ([https://www.qlcplus.org/docs/html_en_EN/rgbscriptapi.html](https://www.qlcplus.org/docs/html_en_EN/rgbscriptapi.html) chapter "Development tool"). In the browser you need to open the address `http://localhost:1234/`.

On this page, you can debug your program and check how it will work on matrices of different sizes. You need to write the path to the debugged script `scripts/*.js` in the `Algorithm Specification > filename` field. Then click on the "Reload" button.

Web server does not support hot reload, so after changing the source code of the script, you need to reload the page in the browser.

### Deploy

Depending on platform, the required scripts from the `dist/scripts/*.js` folder should be placed either in the QLC+ system script directory or, preferably, the user script directory:

- **Linux user dir**: `~/.qlcplus/rgbscripts/`
- **Linux system dir**: `/usr/share/qlcplus/rgbscripts/`
- **OSX user dir**: `~/Library/Application Support/QLC+/RGBScripts`
- **OSX system dir**: `/Applications/QLC+.app/Contents/Resources/RGBScripts`
- **Windows user dir**: `%HOMEPATH%\QLC+\RGBScripts`
- **Windows system dir**: `C:\QLC+\RGBScripts`

For OSX platforms, you can run the command:

```
npm run deploy
```

Files from the `dist/scripts/*.js` folder will be moved to _OSX user dir_ automatically.

Then you need to start or restart the QLC + application. Open your RGB Matrix function and select in [Pattern](https://www.qlcplus.org/docs/html_en_EN/rgbmatrixeditor.html) your script.

## TODOS

- [ ] single command for run dev-server and watch mode
- [ ] util functions for define properties
- [ ] test for generators
- [ ] deploy to QLC+ for Windows and Linux OS
