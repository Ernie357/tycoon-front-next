import '../styles/globals.css';  // Make sure this imports the global Tailwind CSS file

import type { AppProps } from 'next/app';  // AppProps is a Next.js type for props

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;  // This renders the current page (e.g., index.tsx)
}

export default MyApp;