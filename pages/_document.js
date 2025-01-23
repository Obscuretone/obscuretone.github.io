// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang={this.props.__NEXT_DATA__.props.pageProps.currentLang || 'en'}>
        <Head>


          {/* Syntax Highlighting Styles */}
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/default.min.css"
          />

          {/* Mathjax Script */}


          <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/mml-chtml.min.js" integrity="sha512-4JUXEJCjFmGygcGTR/doRQ1Kw7uEYn+kBpiGWyVBzUQHtFSPQNm08E/lqo2/XJqiWKKV0nTpv1q8bHPPDL4n4Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

          {/* Highlight.js Script */}
          <script
            src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"
            async
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;