/* global define */
/* global module */
/* global console */

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
        // AMD
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
            capslock: true
        },
        _instance = 0;


    /*
    
       **Applies only to text selection** 
    
    
        options:
        - keypress: boolean => true listen for keypress, false listen for up
        - capslock: boolean => true listen also for capslock key, false listen only for shift key
        - capslockpress
    
    */
    
    /** Process the key event on the textarea/input */
    function _handleKey(evt){
        
        var target = evt.target || evt.toElement;
        
        // console.log('_handleKey this:', this, 'evt:', evt, 'target:', target);
            
            // TODO: ignore if Alt+Ctrl+Meta modifiers
            if(evt.altKey || evt.ctrlKey || evt.metaKey){
                console.info('Modifiers');
                return false;
            }
            
            if( evt.keyCode === 16 || ( evt.keyCode === 20 && this.options.capslock ) ){
                
                
                if(target.selectionStart < target.selectionEnd){
                    
                    var start = target.selectionStart,
                        end = target.selectionEnd;
                
                    var selection = target.value.substring(start, end);
                    
                    var newText = exports.capitalize(selection, evt.keyCode === 20 && this.options.capslock);
                    
                    target.value = target.value.substring(0, start) + newText + target.value.substring(end);
                    
                    target.selectionStart = start;
                    target.selectionEnd = end;
                    target.focus();
                    
                    
                }  
            }
        
    }
    
    
    
    /**
     * CapLocker constructor
     * 
     * @constructor
     * @parameter {DOMElement} el The DOMElement to attach the CapsLocker behavior to
     * @parameter {Object} options
     * @return CapsLocker
     */
    function CapsLocker(el, options){
        
        /** This instance identifier */
        this.id = _instance++;
        
        /** This instance target element */
        this.target = el;
        
        /** This instance options */
        this.options = options;

        // Check if el is textarea or input text
        if(!(el instanceof HTMLTextAreaElement) && !(el instanceof HTMLInputElement)){
            throw new TypeError('CapsLocker currently supports only textarea and input text elements');
        }
        
        this.target.addEventListener( this.options.keypress ? 'keypress' : 'keyup', _handleKey.bind(this), false);
        
        console.log(el, this);
        
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
     * Attaches a CapsLocker instance to a DOMElement.
     */
    exports.attach = function(selector, options){
        
        
       // HANDLE: selector = "" || null || undefined || false
        if ( !selector ) {
            throw new TypeError("Please specify a selector or an HTMLElement. For supported selectors refer to document.querySelector");
        }
        
        // Handle strings
        if ( typeof selector === "string" ) {
            selector = document.querySelector(selector);
        }
        // HANDLE: selector = DOMElement
        else if( selector.nodeType ){
            selector = selector;
        }
        else{
            throw new TypeError("Unknown selector type, sorry :(");
        }
        
       
        options = options || {};
        
        options = _objectAssign(_defaults, options);
        
        return new CapsLocker(selector, options);
    };

    
    /**
     * Capitalize a text.
     * Transform the text from lower case to upper case, while stepping through the first letter capitalization
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