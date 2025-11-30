"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Calendar, Trophy, Gamepad2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { format, parseISO, startOfDay, isSameDay } from "date-fns";
import MatchCard from "../components/league/MatchCard";

import matchesData from "@/data/matches.json";
import eventsData from "@/data/events.json";

export default function EventView() {
  const router = useRouter();
  const params = useSearchParams();

  const eventId = params.get("eventId");

  // Find the event from JSON
  const event = eventsData.find(e => e.id === eventId);

  // Filter matches belonging to this event
  const matches = matchesData.filter(m => m.event_id === eventId);

  const [filterMode, setFilterMode] = useState("day");
  const [selectedDate, setSelectedDate] = useState(
    matches.length ? new Date(matches[0].match_date) : new Date()
  );

  const availableDates = useMemo(() => {
    const dates = matches.map(m => startOfDay(parseISO(m.match_date)));
    return [...new Set(dates.map(d => d.getTime()))]
      .map(t => new Date(t))
      .sort((a, b) => a.getTime() - b.getTime());
  }, [matches]);

  const filteredMatches = useMemo(() => {
    if (filterMode === "day") {
      return matches.filter(m =>
        isSameDay(parseISO(m.match_date), selectedDate)
      );
    }
    return matches;
  }, [filterMode, selectedDate, matches]);

  const handleMatchClick = (matchId: string) => {
    router.push(
      `/lineup-builder?matchId=${matchId}&filterMode=${filterMode}&eventId=${eventId}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/")}
            className="bg-slate-900/50 border-slate-800 text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div>
            <h1 className="text-4xl font-bold text-white neon-text">
              {event?.name || "Event"}
            </h1>
            <p className="text-slate-400 text-lg mt-1">
              {event?.organizer && (
                <span className="text-[#9945FF]">{event.organizer}</span>
              )}
              {event?.organizer && " • "}
              Select matches to build your lineup
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={filterMode} onValueChange={setFilterMode} className="mb-8">
          <TabsList className="bg-slate-900/50 border border-slate-800 p-1">
            <TabsTrigger
                value="day"
                className="
                    text-white
                    data-[state=active]:bg-white
                    data-[state=active]:text-black
                "
                >
                <Calendar className="w-4 h-4" />
                By Day (Pick6)
                </TabsTrigger>

                <TabsTrigger
                value="event"
                className="
                    text-white
                    data-[state=active]:bg-white
                    data-[state=active]:text-black
                "
                >
                <Trophy className="w-4 h-4" />
                By Event (Pick6)
                </TabsTrigger>

                <TabsTrigger
                value="game"
                className="
                    text-white
                    data-[state=active]:bg-white
                    data-[state=active]:text-black
                "
                >
                <Gamepad2 className="w-4 h-4" />
                By Game (Pick4)
                </TabsTrigger>

          </TabsList>

          {/* Day mode */}
          <TabsContent value="day" className="mt-6">
            <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
              {availableDates.map(date => (
                <Button
                  key={date.getTime()}
                  variant={isSameDay(date, selectedDate) ? "default" : "outline"}
                  onClick={() => setSelectedDate(date)}
                  className={
                    isSameDay(date, selectedDate)
                      ? "bg-gradient-to-r from-[#9945FF] to-[#00FF88] text-white"
                      : "bg-slate-900/50 border-slate-800 text-white"
                  }
                >
                  {format(date, "MMM d, yyyy")}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredMatches.map(match => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onClick={() => handleMatchClick(match.id)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Event mode */}
          <TabsContent value="event" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {matches.map(match => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onClick={() => handleMatchClick(match.id)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Game mode */}
          <TabsContent value="game" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {matches.map(match => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onClick={() => handleMatchClick(match.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
