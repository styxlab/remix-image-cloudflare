import { Link } from '@remix-run/react'

import { Image } from 'remix-image-cloudflare'

const featureImage = 'https://i.picsum.photos/id/1002/4312/2868.jpg?hmac=5LlLE-NY9oMnmIQp7ms6IfdvSUQOzP_O3DPMWmyNxwo'

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Remix Image Component for Cloudflare</h1>
      <p>
        This image is loaded with the {'<Image />'} component. Compare with <Link to="/">Standard Image</Link>
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
          width={4312}
          height={2868}
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
