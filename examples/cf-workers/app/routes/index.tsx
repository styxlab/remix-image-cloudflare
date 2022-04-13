import { Link } from '@remix-run/react'

const featureImage = 'https://i.picsum.photos/id/1002/4312/2868.jpg?hmac=5LlLE-NY9oMnmIQp7ms6IfdvSUQOzP_O3DPMWmyNxwo'
const featureImage800 = 'https://i.picsum.photos/id/1002/800/532.jpg?hmac=coTm0kTIfKYkmbIhldwXbdUEx4VLlKliH7C_Vw6Rnns'
const featureImage400 = 'https://i.picsum.photos/id/1002/400/266.jpg?hmac=TusO-RP3iv2MlXg8BPCS54_EWWiF64QD7vuuxfoQGq8'

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Remix Image Component for Cloudflare</h1>
      <p>
        This image is loaded with the standard HTML {`<img />`} tag. Note that different sized images must be provided in advance. Compare
        with <Link to="/pure">Image Component</Link> utilizing a pure JS transformer.
      </p>
      <div className="fade-in">
        <img
          src={featureImage}
          srcSet={`${featureImage400} 400w, ${featureImage800} 800w`}
          sizes="(max-width: 640px) 400px, 800px"
          width={4312}
          height={2868}
          alt="Featured"
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
