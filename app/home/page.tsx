"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Gamepad2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import EventCard from "../components/home/EventCard";
import eventsJson from "@/data/events.json"; // <-- import JSON

export default function Home() {
  const router = useRouter();
  const [activeGame, setActiveGame] = useState("CS2");

  // Your JSON is the data
  const events = activeGame === "CS2" ? eventsJson : [];

  const handleEventClick = (eventId: string) => {
    router.push(`/event/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 lg:p-8">
    <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
            <Gamepad2 className="w-8 h-8 text-[#00FF88]" />
            <h1 className="text-4xl font-bold text-white">Upcoming CS2 Events</h1>
        </div>
        <p className="text-slate-400 text-lg">
            Select an event to build your fantasy lineup
        </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeGame} onValueChange={setActiveGame} className="mb-8">
        <TabsList className="bg-slate-900/50 border border-slate-800 p-1">
            <TabsTrigger value="CS2">Counter-Strike 2</TabsTrigger>
            <TabsTrigger value="Dota2" disabled className="opacity-50 text-white">
            Rocket League (Coming Soon)
            </TabsTrigger>
            <TabsTrigger value="Valorant" disabled className="opacity-50 text-white">
            Valorant (Coming Soon)
            </TabsTrigger>
                <TabsTrigger value="LoL" disabled className="opacity-50 text-white">
            R6 (Coming Soon)
            </TabsTrigger>
            <TabsTrigger value="LoL" disabled className="opacity-50 text-white">
            League of Legends (Coming Soon)
            </TabsTrigger>
            <TabsTrigger value="Dota2" disabled className="opacity-50 text-white">
            Dota 2 (Coming Soon)
            </TabsTrigger>
        </TabsList>

        <TabsContent value="CS2" className="mt-8">
            {events.length === 0 ? (
            <div className="text-center py-16">
                <p className="text-slate-400 text-lg">No events available</p>
            </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => handleEventClick(event.id)}
                />
                ))}
            </div>
            )}
        </TabsContent>
        </Tabs>
    </div>
    </div>
  );
}
