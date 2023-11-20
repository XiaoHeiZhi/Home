"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

async function getData() {
  const res = await fetch(
    "https://web-yapi.company.druidtech.net/mock/55/api/v2/label/"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

type Date = {
  color: string;
  count: number;
  id: string;
  name: string;
};

export default function Home() {
  const [serverData, setServerData] = useState<Date>();
  const setData = async () => {
    const data = await getData();
    setServerData(data);
  };
  useEffect(() => {
    setData();
  }, []);
  return <div className="cursor-pointer">{serverData?.name}</div>;
}
