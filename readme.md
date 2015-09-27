# Caps

> Make text uppercase or lower case with the caps lock key


![](http://img-9gag-fun.9cache.com/photo/anK7qQb_700b.jpg)

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.githubusercontent.com/avvertix/jquery-caps-locker/master/dist/jquery.caps-locker.min.js
[max]: https://raw.githubusercontent.com/avvertix/jquery-caps-locker/master/dist/jquery.caps-locker.js

In your web page:

```html
<p>
  <textarea name="textarea" id="textarea" cols="30" rows="10">example text</textarea>
</p>


<script src="dist/caps-locker.min.js"></script>
<script>
  window.Caps.attach("#textarea");
</script>
```

**At now only supports `textarea` and `input[type=text]` elements**


Now when you select the text in that `#textarea` you can press the Shift key to capitilize or make upper case your selected text. You can also use the CapsLock key for the same behavior.


## Current supported Browsers

Chrome (latest), Firefox (latest), Edge (on Win10 build 10240)

## API

The CapsLocker API is pretty simple. You can `attach` the capitalization behavior to a textarea or an input text. You can also use tha `capitalize` function independently from a DOM Element.

### `Caps.attach(selector: string||DOMElement, options: Object)`

Attaches a CapsLocker instance to a DOMElement.

**parameters**
- `{string||DOMElement} selector`: the textarea or the input text field. You can use the selectors supported by `document.querySelector`;
- `{Object} options`: The object options, default *undefined*; 

**return**

`{Object}` the CapsLocker instance.

**errors thrown**

- `TypeError` in case `selector` is *undefined*, *null*, and empty string or a boolean.
- `TypeError` in case that the selected DOMElement is not an instance of `HTMLTextAreaElement` or `HTMLInputElement`

**remarks**

- The `document.querySelector` is used in case of a string selector value.


#### Current supported options

The supported options are:

| property | type    | default value | description                                                                                                     |
| -------- | ------- | ------------- | --------------------------------------------------------------------------------------------------------------- |
| keypress | boolean | `false`       | Listen for keypress events instead of keyup. Set to true to listen for keypress events instead of keyup events. |
| capslock | boolean | `true`        | Listen for CapLock key. Set to true to listen for accepting the capslock key usage                              |


### `Caps.capitalize(text: string, capsLockPressed: boolean)`

Capitalize a text.
Transform the text from lower case to upper case, while stepping through the first letter capitalization.

Capitalization cycle:

`lower case => first letter uppercase => all upper case => lower case`

if capsLockPressed is true the capitalization cycle is the following:

`lower case => upper case => lower case`

**parameters**
- `{string} text`: the text string to capitalize;
- `{boolean} capsLockPressed`: `true` if the behaviour to apply is governed by the CapsLock key, `false` otherwise; 

**return**

`{string}` the uppercase/capitalized version of the `text` parameter

**errors thrown**

`TypeError` in case `text` is *undefined* or *null*

**edge cases**

- The capitalization of an empty string is an empty string.


 


## License

MIT © Alessio Vertemati
