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
      {
        name: roomName,
      },
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
    <section className="relative w-full min-h-screen mt-6">
      {/* Modal */}
      {popup && (
        <div className="absolute inset-0 bg-neutral-700/50 flex justify-center items-center">
          <div className="relative bg-neutral-900 p-6 rounded-md flex flex-col gap-4 w-72">
            {/* Close Button */}
            <button
              onClick={() => setPopup(false)}
              className="absolute top-3 right-3 text-neutral-400 hover:text-white text-xl"
            >
              <IconX />
            </button>

            {!roomCreated ? (
              <>
                <h3 className="text-xl mb-2">Create a Room</h3>
                <input
                  placeholder="Name"
                  className="px-3 py-2 rounded bg-neutral-700 outline-none"
                  required
                  value={roomName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRoomName(e.target.value)
                  }
                />
                <button
                  className="bg-white text-black py-2 rounded"
                  onClick={createRoom}
                >
                  Submit
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl mb-2">Room Created Successfully</h3>
                <button
                  className="bg-white text-black py-2 rounded"
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
      <div className="w-full flex items-center justify-center">
        <button
          className="cursor-pointer flex flex-col items-center p-6 border border-neutral-500 bg-neutral-800 rounded-md"
          onClick={() => {
            setRoomCreated(false);
            setPopup(true);
          }}
        >
          <IconPlus size={50} />
          <h3>Create a canvas</h3>
        </button>
      </div>

      {/* Rooms */}
      <Suspense
        fallback={
          <div className="w-full h-screen flex justify-center items-center">
            <h1>Loading...</h1>
          </div>
        }
      >
        <Rooms />
      </Suspense>
    </section>
  );
};
