import "../styles/globals.css";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header>
        <Link href="/">Go back home</Link> <span> | </span>
        <Link href="/otherpage">Go to other page</Link>
      </header>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
