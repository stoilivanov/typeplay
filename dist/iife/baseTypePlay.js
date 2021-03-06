var TypePlayBase = (function () {
    'use strict';

    /*******************************************
     * Class TypePlay
     * 
     * 
     * 
     * @author Stoil Ivanov 
     */
    class TypePlayBase {
      /**
       * Class Constructor
       * 
       * Set up a new instance of the class.
       * 
       * This function creates all of the HTML required to
       *  run the script and inserts it in the DOM.
       * 
       * @param {DOM element} target *required
       * @param {*} settings 
       */
      constructor(target = null, settings = {
        typeSpeed: {
          min: 140,
          max: 220
        },
        delSpeed: {
          min: 50,
          max: 90
        }
      }) {
        if (target == null) {
          throw new Error("When invoking a new instance of TypePlay you must specify a DOM element!");
        }

        this.target = target;
        this.textNodeL = document.createElement("span");
        this.textNodeR = document.createElement("span");
        this.cursorContainerNode = document.createElement("span");
        this.textNodeL.innerHTML = target.innerHTML;
        target.innerHTML = "";
        target.appendChild(this.textNodeL);
        target.appendChild(this.cursorContainerNode);
        target.appendChild(this.textNodeR);
        this.insertCursor();
        this.settings = settings;
      }

      insertCursor() {
        this.cursorNode = document.createElement("span");
        this.cursorNode.classList.add("typePlayBlinker");
        this.cursorNode.innerHTML = "|";
        this.cursorContainerNode.appendChild(this.cursorNode);
      }

      refreshCursor() {
        this.cursorContainerNode.removeChild(this.cursorNode);
        this.insertCursor();
      }
      /**
       * @function getRandomNumberBetween
       * 
       * Get a random number from within the range of min and max values
       * 
       * @param {*} min 
       * @param {*} max 
       */


      getRandomNumberBetween(min, max) {
        let range = max - min;
        return Math.floor(Math.random() * range) + min;
      }
      /**
       * @returns number between 80 and 130
       */


      getNavigateSpeed() {
        return Math.floor(Math.random() * 51) + 80;
      }

      getTypeSpeed() {
        if (typeof this.settings.typeSpeed == "number") return this.settings.typeSpeed;
        if (typeof this.settings.typeSpeed == "object") return this.getRandomNumberBetween(this.settings.typeSpeed.max, this.settings.typeSpeed.min);
        return 150;
      }

      getDeletionSpeed() {
        if (typeof this.settings.delSpeed == "number") return this.settings.delSpeed;
        if (typeof this.settings.delSpeed == "object") return this.getRandomNumberBetween(this.settings.delSpeed.max, this.settings.delSpeed.min);
        return 150;
      }

      type({
        text,
        speed
      }, waitTime = 1000, originalResolve = null) {
        return new Promise(resolve => {
          this.textNodeL.innerHTML += text[0];
          text = text.slice(1);
          this.refreshCursor();
          if (originalResolve == null) originalResolve = resolve;
          if (text.length > 0) setTimeout(() => this.type({
            'text': text
          }, waitTime, originalResolve), this.getTypeSpeed());else setTimeout(() => originalResolve(), waitTime);
        });
      }

      erase(moves = 1, waitTime = 1000, originalResolve = null) {
        return new Promise(resolve => {
          let text = this.textNodeL.innerHTML;
          this.textNodeL.innerHTML = text.substring(0, text.length - 1);
          this.refreshCursor();
          moves--;
          if (originalResolve == null) originalResolve = resolve;
          if (moves > 0) setTimeout(() => this.erase(moves, waitTime, originalResolve), this.getDeletionSpeed());else setTimeout(() => originalResolve(), waitTime);
        });
      } // eraseWord(waitTime = 1000, originalResolve = null) {
      //     return new Promise((resolve) => {
      //         let text = this.textNodeL.innerHTML;
      //         if (text[text.length - 1] == ' ') {
      //             console.log("Empty space");
      //         }
      //         let pop = text.substring(text.length - 1, text.length);
      //         console.log("Pop", pop);
      //         if (originalResolve == null)
      //             originalResolve = resolve;
      //         if (pop == ' ')
      //             return originalResolve();
      //         this.textNodeL.innerHTML = text.substring(0, text.length - 1);
      //         this.refreshCursor();
      //         if (text.length > 0)
      //             setTimeout(() => this.eraseWord(waitTime, originalResolve), this.getDeletionSpeed());
      //         else
      //             setTimeout(() => originalResolve(), waitTime);
      //     });
      // }


      eraseAll(waitTime = 1000, originalResolve = null) {
        return new Promise(resolve => {
          let text = this.textNodeL.innerHTML;
          this.textNodeL.innerHTML = text.substring(0, text.length - 1);
          this.refreshCursor();
          if (originalResolve == null) originalResolve = resolve;
          if (text.length > 0) setTimeout(() => this.eraseAll(waitTime, originalResolve), this.getDeletionSpeed());else setTimeout(() => originalResolve(), waitTime);
        });
      }

      wait({
        ms
      }) {
        return new Promise(resolve => setTimeout(resolve, ms));
      } // jumpLeft() {
      //     return new Promise((resolve) => {
      //         let text = this.textNodeL.innerHTML;
      //         let words = text.split(" ").filter(element => element.length);
      //         let split = text.lastIndexOf(words.pop());
      //         this.textNodeL.innerHTML = text.substr(0, split);
      //         this.textNodeR.innerHTML = text.substr(split) + this.textNodeR.innerHTML;
      //         this.refreshCursor();
      //         resolve();
      //     });
      // }
      // jumpRight() {
      //     return new Promise((resolve) => {
      //         let text = this.textNodeR.innerHTML;
      //         let words = text.split(" ").filter(element => element.length);
      //         let word = words.reverse().pop();
      //         let split = text.indexOf(word) + word.length;
      //         this.textNodeL.innerHTML = this.textNodeL.innerHTML + text.substr(0, split);
      //         this.textNodeR.innerHTML = text.substr(split);
      //         this.refreshCursor();
      //         resolve();
      //     });
      // }


      navigateLeft(moves = 1, originalResolve = null) {
        return new Promise(resolve => {
          let text = this.textNodeL.innerHTML;
          this.textNodeL.innerHTML = text.substr(0, text.length - 1);
          this.textNodeR.innerHTML = text.substr(-1) + this.textNodeR.innerHTML;
          this.refreshCursor();
          moves--;
          if (originalResolve == null) originalResolve = resolve;
          if (moves > 0) setTimeout(() => this.navigateLeft(moves, originalResolve), this.getNavigateSpeed());else originalResolve();
        });
      }

      navigateRight(moves = 1, originalResolve = null) {
        return new Promise(resolve => {
          let text = this.textNodeR.innerHTML;
          this.textNodeL.innerHTML = this.textNodeL.innerHTML + text[0];
          this.textNodeR.innerHTML = text.substr(1);
          this.refreshCursor();
          moves--;
          if (originalResolve == null) originalResolve = resolve;
          if (moves > 0) setTimeout(() => this.navigateRight(moves, originalResolve), this.getNavigateSpeed());else originalResolve();
        });
      }

    }

    return TypePlayBase;

}());
