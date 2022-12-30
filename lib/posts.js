import { remark } from "remark";
import html from "remark-html";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

const getDate = (date) => {
  const stringDate = date.toISOString();

  const dateObj = {
    year: stringDate.slice(0, 4),
    month: stringDate.slice(5, 7),
    date: stringDate.slice(8, 10),
  };

  return `${dateObj.year}-${dateObj.month}-${dateObj.date}`;
};

export function getSortedPostsData(tag) {
  // Get file names under /posts
  const postList = [];
  const tagList = {};

  const getAllPosts = (destPath) => {
    try {
      fs.readdirSync(destPath, { withFileTypes: true }).forEach((file) => {
        let path = `${destPath}/${file.name}`;
        let data = file;

        if (file.isDirectory()) {
          fs.readdirSync(path, { withFileTypes: true }).forEach((file) => {
            postList.push({
              path: path + "/" + file.name,
              file,
              directory: path.slice(path.lastIndexOf("/") + 1),
            });
          });

          return;
        }
        postList.push({
          path: path,
          file: data,
          directory: null,
        });
      });
    } catch (err) {
      return console.error("Read Error", err);
    }
  };

  getAllPosts(postsDirectory);

  const allPostsData = postList
    .map((file) => {
      if (!file.file.name.endsWith(".md")) return;
      const fileContents = fs.readFileSync(path.join(file.path), "utf-8");
      const id = file.file.name.replace(/\.md$/, ""); //파일 이름
      const matterResult = matter(fileContents);

      const timestamp = matterResult.data.date.getTime() / 1000;
      let tags;

      if (matterResult.data.tag) {
        tags = matterResult.data.tag.split(", ").sort();

        tags.forEach((tag) => {
          if (tagList[tag]) {
            tagList[tag]++;
          } else {
            tagList[tag] = 1;
          }
        });
      }

      if (!matterResult.data.tag) {
        tags = [];
      }

      return {
        id,
        timestamp,
        tags,
        title: matterResult.data.title,
        date: getDate(matterResult.data.date),
        param: file.directory,
      };
    })
    .filter((item) => {
      if (tag) {
        return item.tags.includes(tag);
      } else {
        return true;
      }
    });

  return allPostsData.sort((a, b) => {
    if (a.timestamp < b.timestamp) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getSortedTagsData() {
  // Get file names under /posts
  const postList = [];
  const tagList = new Map();

  const getAllPosts = (destPath) => {
    try {
      fs.readdirSync(destPath, { withFileTypes: true }).forEach((file) => {
        let path = `${destPath}/${file.name}`;
        let data = file;

        if (file.isDirectory()) {
          fs.readdirSync(path, { withFileTypes: true }).forEach((file) => {
            postList.push({
              path: path + "/" + file.name,
              file,
              directory: path.slice(path.lastIndexOf("/") + 1),
            });
          });

          return;
        }
        postList.push({
          path: path,
          file: data,
          directory: null,
        });
      });
    } catch (err) {
      return console.error("Read Error", err);
    }
  };

  getAllPosts(postsDirectory);

  postList.forEach((file) => {
    if (!file.file.name.endsWith(".md")) return;
    const fileContents = fs.readFileSync(path.join(file.path), "utf-8");
    const matterResult = matter(fileContents);

    if (matterResult.data.tag) {
      const tags = matterResult.data.tag.split(", ").sort();

      tags.forEach((tag) =>
        tagList.set(tag, !tagList.get(tag) ? 1 : tagList.get(tag) + 1)
      );
    }
  });

  const allTagsData = Array.from(tagList, ([name, value]) => ({ name, value }));

  return allTagsData
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else {
        return -1;
      }
    })
    .sort((a, b) => {
      if (a.value < b.value) {
        return 1;
      } else {
        return -1;
      }
    });
}

export function getAllPostIds() {
  // const fileNames = fs.readdirSync(postsDirectory);
  const postList = [];
  const getAllPosts = (destPath) => {
    try {
      fs.readdirSync(destPath, { withFileTypes: true }).forEach(
        async (file) => {
          const path = `${destPath}/${file.name}`;

          let param = [
            file.name.endsWith(".md")
              ? file.name.replace(/\.md$/, "")
              : file.name,
          ];
          let id = file.name;

          if (file.isDirectory()) {
            fs.readdirSync(path, { withFileTypes: true }).forEach((file) => {
              postList.push({
                param: [...param, file.name.replace(/\.md$/, "")],
                id: file.name.replace(/\.md$/, ""),
              });
            });

            return;
          }

          postList.push({
            param,
            id,
          });
        }
      );
    } catch (err) {
      return console.error("Read Error", err);
    }
  };

  getAllPosts(postsDirectory);

  const test = postList.map((fileName) => {
    return {
      params: {
        param: fileName.param,
        id: fileName.id.replace(/\.md$/, ""),
      },
    };
  });

  return test;
}

export async function getPostData(id, dir) {
  const directory = dir ? postsDirectory + "/" + dir : postsDirectory;
  const fullPath = path.join(directory, `${id}.md`);

  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  const tags = matterResult.data.tag ? matterResult.data.tag.split(", ") : [];

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    content: matterResult.content,
    tags,
    title: matterResult.data.title,
    date: getDate(matterResult.data.date),
  };
}
