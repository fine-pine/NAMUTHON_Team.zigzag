import type { Application } from "../interfaces";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function useApplications() {
  const { getAccessTokenSilently } = useAuth0();
  const [price, setPrice] = useState(0);

  const { data, mutate } = useSWR<Comment[]>(
    // TODO: API ROUTE 변경
    "http://localhost:8080/api/v1/post/application",
    fetcher,
    { fallbackData: [] }
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();

    try {
      // TODO: API ROUTE 변경
      await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({ price }),
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

  return { price, setPrice, data, onSubmit };
}
