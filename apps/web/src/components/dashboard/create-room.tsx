"use client";
import { useAppContext } from "@/context";
import { createRoom } from "@/lib/api/rooms";
import { Room } from "@/lib/types";
import { IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { SpinnerCustom } from "../ui/spinner";

export const CreateRoomModel = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setCreateDrawingModel } = useAppContext();
    const [roomCreated, setRoomCreated] = useState<boolean>(false);
    const [roomName, setRoomName] = useState<string>("");
    const [roomId, setRoomId] = useState<string>("");
    const router = useRouter();

    async function createRoomHandler() {
        if (!roomName) {
            toast.error("Room name is required");
            return;
        }
        try {
            setLoading(true);

            const data = await createRoom(roomName);

            setRoomId(data.roomId);
            setRoomCreated(true);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
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
                            onClick={createRoomHandler}
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
    )
}
