"use client";

import { HTTP_SERVER } from "@/lib/config";
import axios from "axios";
import { Clock, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RoomsEmptyState } from "./rooms-empty-state";
import { Room } from "@/app/types";

type RoomsProps = {
  rooms: Room[];
  viewMode: "grid" | "list";
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
};

export const Rooms: React.FC<RoomsProps> = ({ rooms, viewMode, setRooms }) => {
  const router = useRouter();

  async function handleDelete(roomId: string) {
    try {
      await axios.delete(`${HTTP_SERVER}/rooms/${roomId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setRooms((prev) => prev.filter((room) => room.id !== roomId));
    } catch (err) {
      console.error("Delete failed", err);
    }
  }

  /* Empty State */
  if (rooms.length === 0) {
    return <RoomsEmptyState />;
  }

  return (
    <>
      {/* GRID VIEW */}
      {viewMode === "grid" && (
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
      {viewMode === "list" && (
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
                <tr
                  key={room.id}
                  className="border-b border-neutral-200 last:border-0"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/canvas/${room.id}`}
                      className="font-medium text-gray-900 hover:text-black"
                    >
                      {room.slug}
                    </Link>
                  </td>

                  <td className="px-4 py-3 text-sm text-neutral-500">Room</td>

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
    </>
  );
};
