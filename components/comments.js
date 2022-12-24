import React from "react";

export default function Comments() {
  return (
    <section
      ref={(elem) => {
        if (!elem) {
          return;
        }
        const scriptElem = document.createElement("script");
        scriptElem.src = "https://utteranc.es/client.js";
        scriptElem.async = true;
        scriptElem.setAttribute("repo", "h-alex2/h-blog");
        scriptElem.setAttribute("issue-term", "pathname");
        scriptElem.setAttribute("theme", "github-light");
        scriptElem.setAttribute("label", "blog-comment");
        scriptElem.crossOrigin = "anonymous";
        elem.appendChild(scriptElem);
      }}
    />
  );
}
