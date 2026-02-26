"use client";
import { HTTP_SERVER } from "@/lib/config";
import { IconPlus, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, Suspense, useState } from "react";
import { Rooms } from "./rooms";

export const DashboardPage: React.FC = () => {
  const [popup, setPopup] = useState<boolean>(false);
  const [roomCreated, setRoomCreated] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");

  const router = useRouter();

  async function createRoom() {
    if (!roomName) {
      alert("room name is required!");
      return;
    }

    const res = await axios.post(
      `${HTTP_SERVER}/rooms/create`,
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
    } else {
      throw new Error("failed to create room!");
    }
  }

  return (
    <section className="relative w-full min-h-screen bg-white">
      {/* Modal */}
      {popup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="relative bg-white p-8 rounded-2xl shadow-xl w-80 flex flex-col gap-5">
            {/* Close Button */}
            <button
              onClick={() => setPopup(false)}
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
                  className="bg-black text-white py-2.5 rounded-full font-medium hover:bg-gray-900 transition"
                  onClick={createRoom}
                >
                  Create
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

      {/* Create Button */}
      <div className="max-w-7xl mx-auto px-6 py-20 flex justify-center">
        <button
          className="flex flex-col items-center gap-3 px-10 py-10 border border-gray-300 rounded-2xl hover:shadow-md hover:border-gray-400 transition"
          onClick={() => {
            setRoomCreated(false);
            setPopup(true);
          }}
        >
          <IconPlus size={40} />
          <h3 className="text-lg font-medium">Create a Canvas</h3>
        </button>
      </div>

      {/* Rooms */}
      <Suspense
        fallback={
          <div className="w-full h-64 flex justify-center items-center text-gray-500">
            Loading...
          </div>
        }
      >
        <Rooms />
      </Suspense>
    </section>
  );
};
