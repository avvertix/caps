/* global test */
(function () {
  module('caps', {
    setup: function () {
      // this.elems = $('#qunit-fixture').children();
      
      // fixes the case that the bind method is not available in the headless browser
      if (!Function.prototype.bind) {
        Function.prototype.bind = function(oThis) {
          if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
          }
      
          var aArgs   = Array.prototype.slice.call(arguments, 1),
              fToBind = this,
              FNOP    = function() {},
              fBound  = function() {
                return fToBind.apply(this instanceof FNOP ? this : oThis,
                      aArgs.concat(Array.prototype.slice.call(arguments)));
              };
      
          if (this.prototype) {
            // native functions don't have a prototype
            FNOP.prototype = this.prototype; 
          }
          fBound.prototype = new FNOP();
      
          return fBound;
        };
      }
      
      
    }
  });

  // generic initialization tests

  test('is capsLocker', function () {
    expect(1);
    strictEqual(window.Caps.toString(), 'CapsLocker', 'should be CapsLocker');
  });
  
  test('is there capsLocker global on the page', function () {
    expect(1);
    strictEqual(typeof window.Caps, 'object', 'should be an object');
  });
  
  
  // Capitalize function tests
  
  test('capitalize: lower start', function () {
    expect(1);
    strictEqual(window.Caps.capitalize('lower case'), 'Lower case', 'should be first letter upper case');
  });
  
  test('capitalize: lower I\'m start', function () {
    expect(1);
    strictEqual(window.Caps.capitalize("I'm lower case"), 'I\'M LOWER CASE', 'should be all upper case');
  });
  
  test('capitalize: upper start', function () {
    expect(1);
    strictEqual(window.Caps.capitalize("UPPER CASE"), 'upper case', 'should be all lower case');
  });
  
  test('capitalize: lower start - capslock pressed', function () {
    expect(1);
    strictEqual(window.Caps.capitalize('lower case', true), 'LOWER CASE', 'should be all upper case');
  });
  
  test('capitalize: lower I\'m start - capslock pressed', function () {
    expect(1);
    strictEqual(window.Caps.capitalize("I'm lower case", true), 'I\'M LOWER CASE', 'should be all upper case');
  });
  
  test('capitalize: upper start - capslock pressed', function () {
    expect(1);
    strictEqual(window.Caps.capitalize("UPPER CASE", true), 'upper case', 'should be all lower case');
  });
  
  
  test('capitalize: null check', function () {
    // expect(1);
    throws(function(){ window.Caps.capitalize(null); }, TypeError, 'TypeError raised');
  });
  
  test('capitalize: undefined check', function () {
    // expect(1);
    throws(function(){ window.Caps.capitalize(undefined); }, TypeError, 'TypeError raised');
  });
  
  test('capitalize: empty string', function () {
    expect(1);
    strictEqual(window.Caps.capitalize(''), '', 'empty string');
  });
  
  
  
  // CapsLocker tests
  
  test('capslocker: instance', function () {
    expect(1);
    strictEqual(typeof window.Caps.attach("#textarea"), 'object', 'should be a CapsLocker instance');
  });
  
  test('capslocker: instance', function () {
    expect(1);
    strictEqual(window.Caps.attach("#textarea2").toString(), 'CapsLocker', 'should be a CapsLocker instance');
  });
  
  
  test('capslocker: options', function () {
    expect(1);
    deepEqual(window.Caps.attach("#textarea3", {keypress: true}).options, {keypress: true, capslock: true}, 'CapsLocker options');
  });
  
  
  test('capslocker: paragraph element', function () {
    // expect(1);
    throws(function(){ window.Caps.attach('#paragraph'); }, TypeError, 'TypeError raised');
  });
  
  

}());
