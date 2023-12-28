import type { Post } from "../interfaces";
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

/**
 * 파일명 목록조회
 * @returns 조회된 파일명 목록
 */
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

/**
 * 파일 조회
 * @param slug 조회할 파일명
 * @param fields 조회할 파일 속성
 * @returns 조회된 파일 객체
 */
export function getPostBySlug(slug: string, fields: string[] = []) {
  // 파일명으로 파일 접근
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Post = {};

  // 파일 속성 조회
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

/**
 * 파일 목록조회
 * @param fields 조회할 파일 속성
 * @returns 조회된 파일 목록
 */
export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // 날짜 내림차순 정렬
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
