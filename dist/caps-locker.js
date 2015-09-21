/*! caps-locker - v0.0.1 - 2015-09-21
* Copyright (c) 2015 Alessio Vertemati; Licensed MIT */
/* global module */

/**
 * Caps Locker.
 * Aspire to be a CommonJS, AMD and Global Object compatible module to handle auto-capitalization of a selected string in textfields (input, textarea) 
 * 
 *
 * Copyright (c) 2015 Alessio Vertemati
 * Licensed under the MIT license.
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['caps-locker'], factory);
    } else if (typeof module === "object" && typeof module.exports === "object") {
        // CommonJS
        factory(module.exports);
    } else {
        // Browser globals
        factory((root.Caps = {}));
    }
}(typeof window !== "undefined" ? window : this, function /* factory */ (exports) {

    /**
     * Default options
     */
    var _defaults = {
            /**
            * Listen for keypress events instead of keyup.
            * Set to true to listen for keypress events instead of keyup events.
            * 
            * @default false
            * @type {boolean}
            */
            keypress: false,
            /**
            * Listen for CapLock key.
            * Set to true to listen for the capslock key usage
            * 
            * @default false
            * @type {boolean}
            */
            capslock: false
        },
        _instance = 0;


    /*
    
       **Applies only to text selection** 
    
    
        options:
        - keypress: boolean => true listen for keypress, false listen for up
        - capslock: boolean => true listen also for capslock key, false listen only for shift key
        - capslockpress
    
    */
    
    /**
     * @return CapsLocker
     */
    function CapsLocker(el, options){
        
        /** This instance identifier */
        this.id = _instance++;
        
        /** This instance target element */
        this.target = el;
        
        /** This instance options */
        this.options = options;
        
        
    }
    
    CapsLocker.prototype.toString = function(){
        return 'CapsLocker';
    };
    
    /**
     * Extends a default object with another object.
     * 
     * Uses Object.assign from ES6 (ES2015) if available
     * 
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
     * @return {Object}
     */
    var _objectAssign = Object.assign || function (target /*, source*/) {
        
        if (target === null || target === undefined) {
            throw new TypeError('Object.assign cannot be called with null or undefined');
        }
        
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var propIsEnumerable = Object.prototype.propertyIsEnumerable;
        
        var from;
        var to = Object(target);
        var symbols;
    
        for (var s = 1; s < arguments.length; s++) {
            from = Object(arguments[s]);
    
            for (var key in from) {
                if (hasOwnProperty.call(from, key)) {
                    to[key] = from[key];
                }
            }
    
            if (Object.getOwnPropertySymbols) {
                symbols = Object.getOwnPropertySymbols(from);
                for (var i = 0; i < symbols.length; i++) {
                    if (propIsEnumerable.call(from, symbols[i])) {
                        to[symbols[i]] = from[symbols[i]];
                    }
                }
            }
        }
    
        return to;
    };
    
    
    

    /**
     * Attaches a CapsLocker instance to an HTMLElement.
     */
    exports.attach = function(element, options){
       
       options = options || {};
       
       options = _objectAssign(_defaults, options);

       return new CapsLocker(element, options);
    };

    
    /**
     * Capitalize a text.
     * Transform the text from lower case to upper case, while stepping though the first letter capitalization
     * 
     * Internals:
     * 
     * When shift is pressed the capitalize will do
     * lower case => first letter uppercase => all upper case => lower case
     * 
     * When the caps lock key is pressed the capitalize will do
     * lower case => upper case => lower case
     * 
     * @param {string} text the text string to capitalize
     * @param {boolean} capsLockPressed true if the behaviour to apply is governed by the CapsLock key, false otherwise 
     * @return {string} the uppercase/capitalized version of the text 
     */
    exports.capitalize = function (text, capsLockPressed) {
        // if is entire lower case && !capslock_key_pressed => first letter to upper case
        // else if is entire lower case && capslock_key_pressed => entire string upper case
        // if first letter upper case => entire string upper case
        // if entire upper case => entire lower case
        
        if (text === null || text === undefined) {
            throw new TypeError('Capitalize cannot be called with null or undefined text.');
        }
        
        if(text.length === 0){
            // nothing to process here
            return text;
        }
        
        var capsLockBehavior = capsLockPressed || false,
            first = text.charAt(0); 
        
        if(first === first.toLowerCase()){
            // lower case first letter
            // return first letter capitalized in normal cases, otherwise entire string upper case
            return capsLockBehavior ? text.toUpperCase() : first.toUpperCase() + text.slice(1);
        }
        else if(first === first.toUpperCase() && text === text.toUpperCase()){
            // entire text is upper case
            return text.toLowerCase();
        }
        
        // only first letter is upper case
        
        return text.toUpperCase();
    };
    
    exports.objectAssing = _objectAssign;
    
    
    exports.toString = function(){
        return 'CapsLocker';
    };
    
    return exports;
}));