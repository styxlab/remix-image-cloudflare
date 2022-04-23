import assert from 'assert'
import { Image } from 'remix-image-cloudflare'

assert.strict.match(typeof Image, /object/)

console.log(typeof Image)
