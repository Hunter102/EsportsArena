"use client";

import React from "react";
import { Users, Trophy } from "lucide-react";
import LineupCard from "@/app//components/lineups/LineupCard";
import lineupsData from "@/data/lineups.json";

export default function MyLineups() {
  const lineups = lineupsData; // mock local JSON data
  const isLoading = false; // no async loading for now

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-8 h-8 text-[#00FF88]" />
            <h1 className="text-4xl font-bold text-white neon-text">My Lineups</h1>
          </div>
          <p className="text-slate-400 text-lg">
            Track all your fantasy lineups and performance
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-2">Total Lineups</p>
            <p className="text-3xl font-bold text-white">{lineups.length}</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-2">Active</p>
            <p className="text-3xl font-bold text-[#00FF88]">
              {lineups.filter((l) => l.status === "active").length}
            </p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-2">Completed</p>
            <p className="text-3xl font-bold text-[#9945FF]">
              {lineups.filter((l) => l.status === "completed").length}
            </p>
          </div>
        </div>

        {/* Lineups List */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-64 bg-slate-900/50 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : lineups.length === 0 ? (
          <div className="text-center py-16">
            <Trophy className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-400 text-lg mb-2">No lineups yet</p>
            <p className="text-slate-500">
              Create your first lineup to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lineups.map((lineup) => (
              <LineupCard key={lineup.id} lineup={lineup} allMatchLineups={[lineup]} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
