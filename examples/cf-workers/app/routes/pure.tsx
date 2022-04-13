import { Link } from '@remix-run/react'

import { Image } from 'remix-image-cloudflare'

const featureImage = 'https://i.picsum.photos/id/1002/2156/1434.jpg?hmac=Gg9l2GJVLl8-ukWaDFyx1nhEOz2w7XpzCmeWFY5Ir9Y'
//const featureImage = 'https://i.picsum.photos/id/1002/800/532.jpg?hmac=coTm0kTIfKYkmbIhldwXbdUEx4VLlKliH7C_Vw6Rnns'

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Remix Image Component for Cloudflare</h1>
      <p>
        This image is loaded with the {'<Image />'} component. Compare with <Link to="/cf">Image Component</Link> utilizing a Cloudflare
        image optimizer.
      </p>
      <div className="fade-in">
        <Image
          loaderUrl="/api/image/pure"
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
