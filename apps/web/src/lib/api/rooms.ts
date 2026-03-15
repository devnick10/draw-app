import { api } from "@/lib/axios";

export async function createRoom(name: string) {
    try {
        const res = await api.post("/rooms", { name });
        return res.data;
    } catch (err: any) {
        const status = err.response?.status;

        if (status === 400) {
            throw new Error("Room name already exists! Try different one.");
        }

        if (status === 411) {
            throw new Error("Invalid inputs");
        }

        throw new Error("Something went wrong");
    }
}
export async function getRooms() {
    try {
        const res = await api.get("/rooms");
        return res.data.rooms;
    } catch (err: any) {
        const status = err.response?.status;

        if (status === 401) {
            throw new Error("Unauthorized");
        }

        throw new Error("Failed to fetch rooms");
    }
}
export async function getShapes(roomId: string) {
    try {
        const res = await api.get(`/rooms/shapes/${roomId}`)
        const { shapes } = res.data;
        return shapes;
    } catch (err: any) {
        const status = err.response?.status;

        if (status === 409) {
            throw new Error("Invalid inputs");
        }
        if (status === 404) {
            throw new Error("Rooms not found");
        }

        throw new Error("Failed to fetch rooms");
    }
}
export async function searchRooms(query?: string) {
    try {
        if (!query) {
            const res = await getRooms();
            return res.data.rooms;
        }

        const res = await api.get("/rooms/search", {
            params: { q: query },
        });

        return res.data.rooms;
    } catch (err: any) {
        const status = err.response?.status;
        if (status === 500) {
            throw new Error("Internal server error");
        }
    }
}
export async function deleteRoom(roomId: string) {
    try {
        const res = await api.post(`/rooms/delete/${roomId}`);
        return res.data;
    } catch (err: any) {
        const status = err.response?.status;

        if (status === 400) {
            throw new Error("Room name already exists! Try different one.");
        }
        if (status === 411) {
            throw new Error("Invalid inputs");
        }
        throw new Error("Something went wrong");
    }
}