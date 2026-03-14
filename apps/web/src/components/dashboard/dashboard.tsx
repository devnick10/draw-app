"use client";
import { Room } from "@/app/types";
import { useAppContext } from "@/context";
import { HTTP_SERVER } from "@/lib/config";
import { IconX } from "@tabler/icons-react";
import axios from "axios";
import { Grid3X3, List } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Rooms } from "./rooms";
import { SearchBar } from "./search-bar";
import { SpinnerCustom } from "../ui/spinner";

export const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { createDrawingModel, setCreateDrawingModel } = useAppContext();
  const [roomCreated, setRoomCreated] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [rooms, setRooms] = useState<Room[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await axios.get(`${HTTP_SERVER}/rooms`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setRooms(res.data.rooms);
      } catch (err) {
        console.error(err);
      }
    }

    fetchRooms();
  }, []);

  async function createRoom() {
    if (!roomName) {
      toast.error("Room name is required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${HTTP_SERVER}/rooms`,
        { name: roomName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (res.status === 201) {
        setRoomId(res.data.roomId);
        setRoomCreated(true);
      }
    } catch (err: any) {
      if (err.response?.status === 400) {
        toast.error("Room name already exists! Try different one.");
      } else if (err.response?.status === 411) {
        toast.error("Invalid inputs");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className="relative w-full min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto mt-6 mb-2 flex justify-between ">
        <SearchBar setRooms={setRooms} />
        <div className="flex items-center gap-2">
          <button onClick={() => setViewMode("grid")}>
            <Grid3X3 className="size-5" />
          </button>
          <button onClick={() => setViewMode("list")}>
            <List className="size-5" />
          </button>
        </div>
      </div>
      {/* Modal */}
      {createDrawingModel && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="relative bg-white p-8 rounded-2xl shadow-xl w-80 flex flex-col gap-5">
            {/* Close Button */}
            <button
              onClick={() => setCreateDrawingModel(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
            >
              <IconX size={20} />
            </button>

            {!roomCreated ? (
              <>
                <h3 className="text-xl font-semibold text-black">
                  Create a Room
                </h3>

                <input
                  placeholder="Room name"
                  className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-black"
                  value={roomName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRoomName(e.target.value)
                  }
                />

                <button
                  className="bg-black text-white py-2.5 rounded-full font-medium hover:bg-gray-900 transition flex  justify-center gap-2"
                  onClick={createRoom}
                >
                  {loading && <SpinnerCustom />}
                  {loading ? "Creating" : "Create"}
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-black">
                  Room Created Successfully
                </h3>

                <button
                  className="bg-black text-white py-2.5 rounded-full font-medium hover:bg-gray-900 transition"
                  onClick={() => router.push(`/canvas/${roomId}`)}
                >
                  Go to Room
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {/* Rooms */}
      <Suspense
        fallback={
          <div className="w-full h-64 flex justify-center items-center text-gray-500">
            Loading...
          </div>
        }
      >
        <div className="w-full max-w-7xl mx-auto">
          <Rooms rooms={rooms} viewMode={viewMode} setRooms={setRooms} />
        </div>
      </Suspense>
    </section>
  );
};
