"use client";
import { HTTP_SERVER } from "@/lib/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Room {
  id: string;
  slug: string;
}

async function getRooms(): Promise<Room[]> {
  const res = await axios.get(`${HTTP_SERVER}/rooms`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (res.status !== 200) {
    throw new Error("Failed to fetch rooms");
  }
  return res.data.rooms;
}

export const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const router = useRouter();
  useEffect(() => {
    getRooms().then((rooms) => {
      setRooms(rooms);
    });
  }, []);
  return (
    <div className="mt-4 max-w-7xl mx-auto border-t border-neutral-700 pt-4">
      <h3 className="text-2xl mb-3">All Rooms</h3>
      <div className="text-xl flex flex-col divide-y divide-neutral-300">
        {rooms.length === 0 && (
          <>
            <h3>No rooms yet</h3>
          </>
        )}
        {rooms.map((room, idx) => (
          <button
            onClick={() => {
              router.push(`/canvas/${room.id}`);
            }}
            key={idx}
            className="py-2 text-left hover:bg-neutral-200 rounded-md"
          >
            {room.slug}
          </button>
        ))}
      </div>
    </div>
  );
};
