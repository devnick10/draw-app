"use client";

import { searchRooms } from "@/lib/api/rooms";
import { Room } from "@/lib/types";
import { IconSearch } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
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
  query:string;
  allRooms:Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar: React.FC<SearchBarProps> = (props) => {
  
  const handleSearch = async (value: string) => {
    try {

      if (!value.trim()) {
        props.setRooms(props.allRooms); // restore cached rooms
        return;
      }

      const rooms = await searchRooms(value);
      props.setRooms(rooms);

    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const debouncedSearch = React.useMemo(
    () => debounce(handleSearch, 400),
    [props.allRooms]
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    props.setQuery(value);
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
          value={props.query}
          onChange={handleChange}
          placeholder="Search rooms..."
          className="block w-full p-3 ps-9 border border-neutral-300 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
    </div>
  );
};
