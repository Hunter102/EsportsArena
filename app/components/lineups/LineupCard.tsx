"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { DollarSign, Star, TrendingUp } from "lucide-react";
import { format } from "date-fns";

export type Player = {
  name?: string;
  role?: string;
  is_captain?: boolean;
};

export type Lineup = {
  id: string;
  name?: string;
  status?: "active" | "completed" | string;
  created_date?: string;
  entry_fee?: number;
  total_salary?: number;
  total_points?: number;
  event?: string;
  players?: Player[];
};

type Props = {
  lineup: Lineup;
};

export default function LineupCard({ lineup }: Props) {
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

  const createdDateStr =
    lineup.created_date && !Number.isNaN(new Date(lineup.created_date).getTime())
      ? format(new Date(lineup.created_date), "MMM d, yyyy")
      : null;

  return (
    <Card className="bg-slate-900/50 border-slate-800 glow-border hover:border-[#9945FF] transition-all">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl text-white mb-2">
              {lineup.name ?? "Unnamed Lineup"}
            </CardTitle>

            {createdDateStr && <p className="text-slate-400 text-sm">Created {createdDateStr}</p>}
          </div>

          <Badge className={getStatusColor(lineup.status)}>{lineup.status ?? "unknown"}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Players */}
        <div className="space-y-2">
          {(lineup.players ?? []).map((player: Player, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded bg-slate-800/30 border border-slate-800"
            >
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-medium">{player.role ?? "Player"}</span>

                {player.is_captain && (
                  <Star className="w-4 h-4 text-[#00FF88] fill-[#00FF88]" />
                )}
              </div>

              <span className="text-slate-400 text-xs">{player.name ?? `Player ${index + 1}`}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
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
  );
}
