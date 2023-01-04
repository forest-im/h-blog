import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { remark } from "remark";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import coy from "react-syntax-highlighter/dist/cjs/styles/prism/coy";
import { useEffect, useState } from "react";

export default function MarkDownRenderer({ post }) {
  const [editedPost, setEditedPost] = useState(post);

  useEffect(() => {
    const main = async function () {
      const file = await remark()
        .use(remarkToc)
        .process(await post);

      setEditedPost(String(file));
    };

    main();
  }, []);

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
        {editedPost}
      </ReactMarkdown>
    </div>
  );
}
