"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { DollarSign, Star, TrendingUp, ChevronRight, Users } from "lucide-react";
import { format } from "date-fns";
import { Lineup, Match } from "@/app/types/types";

type Props = {
  lineup: Lineup;
  allMatchLineups: Lineup[];      // You must pass this in
  match?: Match | null;           // Also pass match data in
  currentUserEmail?: string | null;
};

export default function LineupCard({ lineup, allMatchLineups, match, currentUserEmail }: Props) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "bg-[#00FF88]/20 text-[#00FF88] border-[#00FF88]/30";
      case "completed":
        return "bg-[#9945FF]/20 text-[#9945FF] border-[#9945FF]/30";
      default:
        return "bg-slate-700/20 text-slate-400 border-slate-700/30";
    }
  };

  // format created date
  const createdDateStr =
    lineup.created_date && !Number.isNaN(new Date(lineup.created_date).getTime())
      ? format(new Date(lineup.created_date), "MMM d, yyyy")
      : null;

  // ---- POINTS + USER MARKER LOGIC ----
  const { sortedLineups, maxPoints, userLineups } = useMemo(() => {
    const sorted = [...(allMatchLineups ?? [])].sort(
      (a, b) => (b.total_points ?? 0) - (a.total_points ?? 0)
    );

    const max = sorted.length > 0
      ? Math.max(...sorted.map((l) => l.total_points ?? 0), 1)
      : 1;

    const userLs = sorted.filter(
      (l) => l.created_by === currentUserEmail
    );

    return { sortedLineups: sorted, maxPoints: max, userLineups: userLs };
  }, [allMatchLineups, currentUserEmail]);
  

  return (
    <Link href={`/MatchResults?matchId=${lineup.match_id}`}>
      <Card className="bg-slate-900/50 border-slate-800 glow-border hover:border-[#9945FF] transition-all cursor-pointer group">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl text-white mb-2 group-hover:text-[#00FF88] transition-colors">
                {lineup.name ?? "Unnamed Lineup"}
              </CardTitle>

              {match && (
                <p className="text-slate-400 text-sm mb-1">
                  {match.team_a} vs {match.team_b}
                </p>
              )}

              {createdDateStr && (
                <p className="text-slate-500 text-xs">Created {createdDateStr}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(lineup.status)}>
                {lineup.status ?? "unknown"}
              </Badge>
              <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-[#00FF88] transition-colors" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* ---- POINTS BAR ---- */}
          {sortedLineups.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {sortedLineups.length} entries
                </span>
                <span className="text-slate-400">Max: {maxPoints} pts</span>
              </div>

              {/* BAR */}
              <div className="relative">
                {/* background */}
                <div className="h-4 bg-slate-800/70 rounded-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-[#9945FF]/30 to-[#00FF88]/30 opacity-50" />
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#00FF88]" />
                </div>

                {/* markers */}
                {userLineups.map((userLineup) => {
                  const percent = maxPoints
                    ? ((userLineup.total_points ?? 0) / maxPoints) * 100
                    : 0;

                  const isCurrent = userLineup.id === lineup.id;

                  return (
                    <div
                      key={userLineup.id}
                      className="absolute top-0 transform -translate-x-1/2"
                      style={{ left: `${Math.min(Math.max(percent, 2), 98)}%` }}
                    >
                      <div className={`relative flex flex-col items-center ${isCurrent ? "z-10" : "z-5"}`}>
                        <div
                          className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] ${
                            isCurrent ? "border-t-[#00FF88]" : "border-t-[#9945FF]"
                          }`}
                        />
                        <div className={`w-0.5 h-4 ${isCurrent ? "bg-[#00FF88]" : "bg-[#9945FF]"}`} />
                        <div
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold whitespace-nowrap mt-0.5 ${
                            isCurrent
                              ? "bg-[#00FF88] text-slate-950"
                              : "bg-[#9945FF] text-white"
                          }`}
                        >
                          {userLineup.total_points ?? 0}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-between text-[10px] text-slate-500 mt-6">
                <span>0 pts</span>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#00FF88]" />
                    <span>This entry</span>
                  </div>

                  {userLineups.length > 1 && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#9945FF]" />
                      <span>Your other entries</span>
                    </div>
                  )}
                </div>

                <span>{maxPoints} pts</span>
              </div>
            </div>
          )}

          {/* ---- PLAYERS ---- */}
          <div className="space-y-2">
            {(lineup.players ?? []).map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded bg-slate-800/30 border border-slate-800"
              >
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-medium">{p.role}</span>
                  {p.is_captain && (
                    <Star className="w-4 h-4 text-[#00FF88] fill-[#00FF88]" />
                  )}
                </div>

                <span className="text-slate-400 text-xs">{`Player ${i + 1}`}</span>
              </div>
            ))}
          </div>

          {/* ---- STATS ---- */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <DollarSign className="w-3 h-3 text-slate-500" />
                <p className="text-slate-500 text-xs">Salary</p>
              </div>
              <p className="text-white font-semibold">
                ${Number(lineup.total_salary ?? 0).toLocaleString()}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-1 mb-1">
                <TrendingUp className="w-3 h-3 text-slate-500" />
                <p className="text-slate-500 text-xs">Points</p>
              </div>
              <p className="text-white font-semibold">{lineup.total_points ?? 0}</p>
            </div>

            <div>
              <div className="flex items-center gap-1 mb-1">
                <DollarSign className="w-3 h-3 text-slate-500" />
                <p className="text-slate-500 text-xs">Entry</p>
              </div>
              <p className="text-white font-semibold">${Number(lineup.entry_fee ?? 0)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
