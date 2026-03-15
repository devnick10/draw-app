import React from "react";
interface RoomsSkeletonProps {
  viewMode: "grid" | "list";
}

export const RoomsSkeleton: React.FC<RoomsSkeletonProps> = ({ viewMode }: { viewMode: "grid" | "list" }) => {
    if (viewMode === "grid") {
        return (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-lg border border-neutral-200 bg-white p-4 animate-pulse"
                    >
                        <div className="h-5 w-32 bg-neutral-200 rounded mb-4" />

                        <div className="flex justify-between">
                            <div className="h-4 w-16 bg-neutral-200 rounded" />
                            <div className="h-4 w-4 bg-neutral-200 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
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
                    {Array.from({ length: 6 }).map((_, i) => (
                        <tr key={i} className="border-b border-neutral-200 animate-pulse">
                            <td className="px-4 py-3">
                                <div className="h-4 w-32 bg-neutral-200 rounded" />
                            </td>

                            <td className="px-4 py-3">
                                <div className="h-4 w-16 bg-neutral-200 rounded" />
                            </td>

                            <td className="px-4 py-3 text-right">
                                <div className="h-4 w-4 bg-neutral-200 rounded ml-auto" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};