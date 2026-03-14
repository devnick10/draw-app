import { useAppContext } from "@/context";

export const RoomsEmptyState: React.FC = () => {
  const { setCreateDrawingModel } = useAppContext();
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-neutral-500"
        >
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      </div>

      <h2 className="mb-2 text-lg font-medium text-gray-900">No rooms yet</h2>

      <p className="mb-6 text-sm text-gray-500">
        Create your first room to start drawing
      </p>

      <button
        onClick={() => setCreateDrawingModel(true)}
        className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-neutral-800"
      >
        Create Room
      </button>
    </div>
  );
};
