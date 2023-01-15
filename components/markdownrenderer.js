import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { remark } from "remark";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import coy from "react-syntax-highlighter/dist/cjs/styles/prism/coy";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function MarkDownRenderer({ post }) {
  const [editedPost, setEditedPost] = useState(post);

  useEffect(() => {
    const main = async function () {
      const file = await remark()
        .use(remarkToc)
        .use(remarkGfm)
        .process(await post);

      setEditedPost(() => String(file));
    };

    main();
  }, []);

  return (
    <div>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, remarkGfm]}
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
          h1: ({ node, ...props }) => {
            const replaceBlank = props.children[0].replace(/\s/g, "-");
            const removeBracket = replaceBlank
              .replace(/[\(\)]/g, "")
              .toLowerCase();
            return (
              <>
                <h1>
                  <a name={`${removeBracket}`} href={`#${removeBracket}`} />
                  {props.children[0]}
                </h1>
              </>
            );
          },
          h2: ({ node, ...props }) => {
            const replaceBlank = props.children[0].replace(/\s/g, "-");
            const removeBracket = replaceBlank
              .replace(/[\(\)|!|@|#|$|%|^|&|*|(|)|,|>|<|.|{|}]/g, "")
              .toLowerCase();

            return (
              <>
                <h2>
                  <a name={`${removeBracket}`} href={`#${removeBracket}`} />
                  {props.children[0]}
                </h2>
              </>
            );
          },
          h3: ({ node, ...props }) => {
            const replaceBlank = props?.children[0].replace(/\s/g, "-");
            const removeBracket = replaceBlank
              .replace(/[\(\)]/g, "")
              .toLowerCase();
            return (
              <>
                <h3>
                  <a name={`${removeBracket}`} href={`#${removeBracket}`} />
                  {props.children[0]}
                </h3>
              </>
            );
          },
          h4: ({ node, ...props }) => {
            const replaceBlank = props.children[0].replace(/\s/g, "-");
            const removeBracket = replaceBlank
              .replace(/[\(\)]/g, "")
              .toLowerCase();
            return (
              <>
                <h4>
                  <a name={`${removeBracket}`} href={`#${removeBracket}`} />
                  {props.children[0]}
                </h4>
              </>
            );
          },
          h5: ({ node, ...props }) => {
            console.log(props);
            const replaceBlank = props.children[0].replace(/\s/g, "-");
            const removeBracket = replaceBlank
              .replace(/[\(\)]/g, "")
              .toLowerCase();
            return (
              <>
                <h4>
                  <a name={`${removeBracket}`} href={`#${removeBracket}`} />
                  {props.children[0]}
                </h4>
              </>
            );
          },
          h6: ({ node, ...props }) => {
            const replaceBlank = props.children[0].replace(/\s/g, "-");
            const removeBracket = replaceBlank
              .replace(/[\(\)]/g, "")
              .toLowerCase();
            return (
              <>
                <h4>
                  <a name={`${removeBracket}`} href={`#${removeBracket}`} />
                  {props.children[0]}
                </h4>
              </>
            );
          },
        }}
      >
        {editedPost}
      </ReactMarkdown>
    </div>
  );
}
