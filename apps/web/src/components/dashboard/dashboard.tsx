"use client";
import { useAppContext } from "@/context";
import React from "react";
import { CreateRoomModel } from "./create-room";
import { RoomsSection } from "./rooms-section";


export const Dashboard: React.FC = () => {
  const { createDrawingModel } = useAppContext();

  return (
    <section className="relative w-full min-h-screen bg-white">


      {createDrawingModel && <CreateRoomModel />}

      <RoomsSection  />

    </section>
  );
};
