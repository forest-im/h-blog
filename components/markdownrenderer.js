import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function MarkDownRenderer({ children }) {
  return <ReactMarkdown>{children}</ReactMarkdown>;
}
