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



## Current supported Browsers

Chrome (latest), Firefox (latest), Opera (latest)

requires ES2015 (ES6) Object.assign

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign


## License

MIT © Alessio Vertemati
