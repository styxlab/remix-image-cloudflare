import { Link } from '@remix-run/react'

import { Image } from 'remix-image-cloudflare'

//const featureImage = 'https://i.picsum.photos/id/1002/4312/2868.jpg?hmac=5LlLE-NY9oMnmIQp7ms6IfdvSUQOzP_O3DPMWmyNxwo'
const featureImage = 'https://i.picsum.photos/id/1002/2156/1434.jpg?hmac=Gg9l2GJVLl8-ukWaDFyx1nhEOz2w7XpzCmeWFY5Ir9Y'

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Remix Image Component for Cloudflare</h1>
      <p>
        This image is loaded with the {'<Image />'} component. Compare with <Link to="/">Standard Image</Link>.
      </p>
      <div className="fade-in">
        <Image
          src={featureImage}
          responsive={[
            {
              size: {
                width: 400,
              },
              maxWidth: 640,
            },
            {
              size: {
                width: 800,
              },
            },
          ]}
          alt="Featured"
          width={2156}
          height={1434}
          decoding="async"
          style={{
            backgroundSize: 'cover',
            backgroundColor: '#eee',
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
    </div>
  )
}
