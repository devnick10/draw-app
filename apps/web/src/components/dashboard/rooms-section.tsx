"use client";

import { deleteRoom, getRooms, searchRooms } from "@/lib/api/rooms";
import { Room } from "@/lib/types";
import { Clock, Grid3X3, List, Trash2 } from "lucide-react";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { RoomsEmptyState } from "./rooms-empty-state";
import { RoomsSkeleton } from "./roooms-skelton";
import { SearchBar } from "./search-bar";

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}


export const RoomsSection: React.FC = () => {

  const [rooms, setRooms] = useState<Room[]>([]);
  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const router = useRouter();

  // initial load
  useEffect(() => {
    async function fetchRooms() {
      try {
        const data = await getRooms();
        setRooms(data);
        setAllRooms(data);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, []);

  async function handleDelete(roomId: string) {
    try {
      await deleteRoom(roomId);
      setRooms((prev) => prev.filter((room) => room.id !== roomId));
      setAllRooms((prev) => prev.filter((room) => room.id !== roomId));
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* SEARCH */}
      <div className="w-full max-w-7xl mx-auto my-4 flex items-center justify-between">
        <SearchBar allRooms={allRooms} query={query} setQuery={setQuery} setRooms={setRooms}/>

        {/* View buttons */}
        <div className="flex items-center gap-2">
          <button onClick={() => setViewMode("grid")}>
            <Grid3X3 className="size-5" />
          </button>

          <button onClick={() => setViewMode("list")}>
            <List className="size-5" />
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading && <RoomsSkeleton viewMode={viewMode} />}

      {/* EMPTY */}
      {!loading && rooms.length === 0 && (
        query
          ? <p className="text-center text-gray-500 mt-10">No rooms found</p>
          : <RoomsEmptyState />
      )}

      {/* GRID VIEW */}
      {!loading && rooms.length > 0 && viewMode === "grid" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              onClick={() => router.push(`/canvas/${room.id}`)}
              className="cursor-pointer rounded-lg border border-neutral-200 bg-white p-4 hover:shadow-md transition"
            >
              <h3 className="font-medium text-lg">{room.slug}</h3>

              <div className="flex justify-between mt-3">
                <div className="flex items-center gap-1 text-sm text-neutral-500">
                  <Clock className="size-4" />
                  Room
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(room.id);
                  }}
                  className="p-1 rounded hover:bg-red-100 text-red-500"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIST VIEW */}
      {!loading && rooms.length > 0 && viewMode === "list" && (
        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
          <table className="w-full">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">
                  Type
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-neutral-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => (
                <tr key={room.id} className="border-b border-neutral-200">
                  <td className="px-4 py-3">
                    <Link
                      href={`/canvas/${room.id}`}
                      className="font-medium text-gray-900 hover:text-black"
                    >
                      {room.slug}
                    </Link>
                  </td>

                  <td className="px-4 py-3 text-sm text-neutral-500">
                    Room
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(room.id)}
                      className="p-2 rounded hover:bg-red-100 text-red-500"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};