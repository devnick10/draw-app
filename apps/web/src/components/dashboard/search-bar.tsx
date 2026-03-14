"use client";

import { Room } from "@/app/types";
import { HTTP_SERVER } from "@/lib/config";
import { IconSearch } from "@tabler/icons-react";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

interface SearchBarProps {
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ setRooms }) => {
  const [query, setQuery] = useState("");

  const searchRooms = async (value: string) => {
    try {
      if (!value) {
        try {
          const res = await axios.get(`${HTTP_SERVER}/rooms`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          setRooms(res.data.rooms);
          return;
        } catch (error) {
          toast.error("Internal server error!");
          console.log(error);
        }
      }

      const res = await axios.get(`${HTTP_SERVER}/rooms/search`, {
        params: { q: value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setRooms(res.data.rooms);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  const debouncedSearch =  debounce(searchRooms, 400)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  }

  return (
    <div className="w-full max-w-xl">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <IconSearch className="size-5 text-neutral-500" />
        </div>

        <input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="Search rooms..."
          className="block w-full p-3 ps-9 border border-neutral-300 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
    </div>
  );
};
