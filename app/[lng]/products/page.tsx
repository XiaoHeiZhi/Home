"use client";

import useSWR from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Products() {
  const { data, error } = useSWR(
    "https://web-yapi.company.druidtech.net/mock/55/api/v2/label/",
    fetcher
  );
  if (error) {
    console.log("Failed to load");
  }
  if (!data) {
    console.log("Loading");
  } else {
    console.log(data);
  }
  return <div></div>;
}
