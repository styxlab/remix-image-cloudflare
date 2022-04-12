import assert from 'assert'
import { banner } from 'remix-image-cloudflare'

assert.strict.match(banner(), /white/)

console.log(banner('white'))
