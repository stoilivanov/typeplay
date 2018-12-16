/**
 * This class exposes only the functions that manipulate the text we are working with.
 * It builds a list of the action that we want to play and plays them automatically.
 * 
 * @author Stoil Ivanov
 * @version 0.1
 */


import {TypePlayBase} from './TypePlayBase';

export class TypePlay {
    constructor(element, settings = {}) {
        this.sequence = [];
        this.typer = new TypePlayBase(element, settings);
    }

    /**
     * Make the script wait before next action
     * 
     * @param {integer} ms - time in milliseconds to wait
     */
    wait(ms) {
        this.sequence.push({"action": "wait", "params": {"ms": ms}});
        return this;
    }


    /**
     * Start typing text
     * 
     * @param {*} text 
     * @param {*} params - "speed" can be fixed integer or object containg min/max properties 
     */
    type(text, params = {"speed": null}) {
        params.text = text;
        this.sequence.push({"action": "type", "params": params});
        return this;
    }


    /**
     * Erases N characters before the cursor
     */
    erase(params = {"chars": 1, "speed": null}) {
        this.sequence.push({"action": "erase", "params": params});
        return this;
    }


    /**
     * Erases all characters before the cursor
     */
    eraseAll() {
        this.sequence.push({"action": "eraseAll", "params": {}});
        return this;
    }


    /**
     * Repeats the sequence of actions
     */
    repeat() {
        this.sequence.push({"action": "repeat", "params": {}});
        return this;
    }


    /**
     * Moves the cursor left or right
     * 
     * @param {integer} moves - how many moves to perform. negative number to move left 
     * @param {*} params - "speed" can be fixed integer or object containg min/max properties 
     */
    navigate(moves, params = {}) {
        if (moves > 0) 
            this.sequence.push({"action": "navigateRight", "params": params});
        else 
            this.sequence.push({"action": "navigateLeft", "params": params});
    }

    /**
     * Execute the actions in the queue 
     */
    async play() {
        for (let i = 0; i < this.sequence.length; i++) {
            let sequence = this.sequence[i];
            let params = sequence.params;
            
            if (sequence.action == 'repeat') {
                i = -1;
                continue;
            }
            
            else
                await this.typer[sequence.action](params);
        }
    }

}
