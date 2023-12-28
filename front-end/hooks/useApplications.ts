import type { Application } from "../interfaces";
import React, { useState } from "react";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function useApplications() {
  const { getAccessTokenSilently } = useAuth0();
  const [text, setText] = useState("");

  // 데이터 조회, 캐싱에 사용되는 리액트 훅
  const { data: applications, mutate } = useSWR<Comment[]>(
    "http://localhost:8080/v1/api/post/application",
    fetcher,
    { fallbackData: [] }
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();

    try {
      await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      setText("");
      await mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async (comment: Comment) => {
    const token = await getAccessTokenSilently();

    try {
      await fetch("/api/comment", {
        method: "DELETE",
        body: JSON.stringify({ comment }),
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      await mutate();
    } catch (err) {
      console.log(err);
    }
  };

  return { text, setText, applications, onSubmit, onDelete };
}
