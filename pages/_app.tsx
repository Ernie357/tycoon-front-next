import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';  // Make sure this imports the global Tailwind CSS file

import type { AppProps } from 'next/app';  // AppProps is a Next.js type for props

function MyApp({ Component, pageProps }: AppProps) {
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Online Tycoon game based off the one featured in Persona 5 Royal." />
          <meta 
            name="keywords" 
            content="Tycoon game, Persona 5 Royal, Persona 5, P5, P5 Royal, online card game, multiplayer game, browser game, card game, Tycoon, play online games"
          />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="John Marseglia" />
  
          {/* Open Graph tags for social sharing */}
          <meta property="og:title" content="Tycoon.io - Online Tycoon Game" />
          <meta property="og:description" content="Compete with friends in this online Tycoon game inspired by Persona 5 Royal. Play directly in your browser for free!" />
          <meta property="og:image" content="/ryuji.webp" />
          <meta property="og:url" content="https://personatycoon.com" />
          <meta property="og:type" content="website" />
  
          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Persona Tycoon - Online Tycoon Game" />
          <meta name="twitter:description" content="Join the fun and play this online card game inspired by Persona 5 Royal. Challenge your friends now!" />
          <meta name="twitter:image" content="/ryuji.webp" />
  
          {/* Icons and Manifest */}
          <link rel="apple-touch-icon" href="/ryuji.webp" />
          <link rel="icon" href="/ryuji.webp" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="canonical" href="https://personatycoon.com" />
  
          {/* Google AdSense */}
          <meta name="google-adsense-account" content="ca-pub-3727276762008014" />
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3727276762008014"
            crossOrigin="anonymous"
          ></Script>
          
          <title>Persona Tycoon - Online Tycoon Game</title>
        </Head>
        <Component {...pageProps} />
      </>
    );
  }

export default MyApp;