![remix-image-cloudflare](https://remix.run/img/og.1.jpg)

# remix-image-cloudflare

[![PRs welcome!](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

#### Remix Image Component with Custom Optimizers for Cloudflare

A responsive image component and custom loader for on-demand optimizing of images. The component has been built with [remix](https://remix.run/) in mind, but can be used in any React project. The primary focus of this project is to provide an easy integration with Cloudflare workers.

## ✨ Features

- Small footprint: image component 13 KB, cf-optimizer: 22 KB, js-optimizer: 63 KB
- Easy replacement of standard `<img />` tags
- Image caching with Cloudflare KV store
- Cloudflare image optimizer **or** custom transformers
- Supports local and remote images
- Cache, loader and transformer can be replaced with your own
- Supports rewriting of image URLs
- Example showing the use of the component in a remix project

&nbsp;

## Credits

- [remix-image](https://github.com/Josh-McFarlin/remix-image)

&nbsp;

## Useful References

- [ESM modules](https://gils-blog.tayar.org/posts/using-jsm-esm-in-nodejs-a-practical-guide-part-1/)
- [nextjs/image](https://github.com/vercel/next.js/blob/canary/packages/next/client/image.tsx)

&nbsp;

## 🧐 Disclaimer

This project is not affiliated with [Remix](https://remix.run/) or [Cloudflare](https://workers.cloudflare.com/).

&nbsp;

# Copyright & License

Copyright (c) 2022 styxlab - Released under the [MIT license](LICENSE).
