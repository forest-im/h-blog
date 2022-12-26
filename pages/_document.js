import React from "react";
import Document, { Html, Head, Main, NextScript } from 'next/document'
// import { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-light.min.css"
            integrity="sha512-zb2pp+R+czM7GAemdSUQt6jFmr3qCo6ikvBgVU6F5GvwEDR0C2sefFiPEJ9QUpmAKdD5EqDUdNRtbOYnbF/eyQ=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <style>
            {`	.markdown-body {
              box-sizing: border-box;
              min-width: 200px;
              max-width: 980px;
              margin: 0 auto;
              padding: 45px;
            }

            .markdown-body pre{
              border-radius: 10px;
              border: 1px solid gray;
              background-color: rgb(253, 253, 253);
            }

            @media (max-width: 767px) {
              .markdown-body {
                padding: 15px;
              }
            }`}
          </style>
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

// export default function Document() {
//   return (
//     <Html>
//       <Head>
//         <link
//           rel="stylesheet"
//           href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-light.min.css"
//           integrity="sha512-zb2pp+R+czM7GAemdSUQt6jFmr3qCo6ikvBgVU6F5GvwEDR0C2sefFiPEJ9QUpmAKdD5EqDUdNRtbOYnbF/eyQ=="
//           crossOrigin="anonymous"
//           referrerPolicy="no-referrer"
//         />
//         <style>
//           {`	.markdown-body {
//             box-sizing: border-box;
//             min-width: 200px;
//             max-width: 980px;
//             margin: 0 auto;
//             padding: 45px;
//           }

//           .markdown-body pre{
//             border-radius: 10px;
//             border: 1px solid gray;
//             background-color: rgb(253, 253, 253);
//           }

//           @media (max-width: 767px) {
//             .markdown-body {
//               padding: 15px;
//             }
//           }`}
//         </style>
//       </Head>
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// }
