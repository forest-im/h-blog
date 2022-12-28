import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { light, dark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import {
  gradientDark,
  isblEditorDark,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import gruvboxDark from "react-syntax-highlighter/dist/cjs/styles/hljs/gruvbox-dark";
import srcery from "react-syntax-highlighter/dist/cjs/styles/hljs/srcery";
// import dracula from "react-syntax-highlighter/dist/cjs/styles/hljs/dracula";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import oneLight from "react-syntax-highlighter/dist/cjs/styles/prism/one-light";
import { prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import synthwave84 from "react-syntax-highlighter/dist/cjs/styles/prism/synthwave84";
import coy from "react-syntax-highlighter/dist/cjs/styles/prism/coy";

export default function MarkDownRenderer({ post }) {
  return (
    <div>
      <ReactMarkdown
        rehypePlugins={[remarkGfm, rehypeRaw]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                language="javascript"
                PreTag="div"
                style={coy}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {post}
      </ReactMarkdown>
    </div>
  );
}
