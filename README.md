# TypePlay.js

TypePlay is a JavaScript library that help the user create a visual effect - to type text like a real person would.

![alt text](https://stoilivanov.com/images/ezgif-2-1489a940e8c2.gif "TypePlay preview")

## Install ```TypePlay```
Install using NPM, GIT or just hotlink the script.
### From NPM:
```sh
npm install typeplay --save
```

### From GIT:
```sh
git clone https://github.com/stoilivanov/typeplay.git
npm update
npm run build
```

### From a Hotlink 
```html
<script src="https://github.com/stoilivanov/typeplay/blob/master/dist/iife/TypePlay.min.js"></script>
```

## CSS
The blinking cursor is a "|" character position and animated using css. Depending on your choice of ```font-family``` and ```font-size``` you might need to modify the ```left``` and ```margin-right``` properties. Adjust until blinking cursor stops dislocating the characters around it.
```css
@keyframes blink {
    0%   {opacity: 1;}
    49%  {opacity: 1;}
    50%  {opacity: 0;}
    99%  {opacity: 0;}
    100% {opacity: 1;}
}

.typePlayBlinker {
    position: relative;
    left: -5px;             /* Adjust to font */
    margin-right: -12px;    /* Adjust to font */
    animation-name: blink;
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
}
```


## Initialization 
TypePlay comes in CJS and IIFE formats pre-build:
##### IIFE
If you would like to just add it in your browser and use it straight away use any of the IIFE version:
```html
<script src="https://github.com/stoilivanov/typeplay/blob/master/dest/iife/TypePlay.js"></script>
<script src="https://github.com/stoilivanov/typeplay/blob/master/dest/iife/TypePlay.min.js"></script>
```
##### CJS
If you would like to package it together with other scripts in your App using Webpack or any other alternatife use the CJS version:
```javascript
import {TypeWrapper} from './dest/js/TypeWrap';
```

```javascript
import TypePlay from "TypePlay";

let element = document.getElementById("scene");
let typer = new TypePlay(element, {typeSpeed: {min: 90, max: 240}});
typer
    .wait(2500)
    .eraseAll()
    .type("PHP develo")
    .eraseAll()
    .wait(600)
    .type("JavaScript Dev")
    .eraseAll()
    .wait(620)
    .type("Software Developer")
    .wait(10000)
    .repeat()
    .play();

```

## Digging a little deeper
If you dig a little deeper into the source you will notice that there are 2 classes - ```TypePlay``` and ```TypeWrap```. The second is there only to provide the chainability. Building the ```TypePlay``` source (the index.js file) will result in building ```TypeWrap```.
