import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, Clock } from "lucide-react";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { Match } from "../../types/types";

interface MatchCardProps {
  match: Match;
  onClick?: () => void;
}

export default function MatchCard({ match, onClick }: MatchCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="bg-slate-900/50 border-slate-800 hover:border-[#9945FF] transition-all duration-300 cursor-pointer glow-border group"
        onClick={onClick}
      >
        <CardContent className="p-6">
          {/* Stage Badge */}
          <div className="flex justify-between items-center mb-4">
            <Badge className="bg-gradient-to-r from-[#9945FF]/20 to-[#00FF88]/20 text-[#00FF88] border-[#00FF88]/30">
              {match.stage}
            </Badge>
            <Badge variant="outline" className="text-slate-400 border-slate-700">
              BO{match.best_of}
            </Badge>
          </div>

          {/* Teams */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-16 h-16 rounded-lg bg-slate-800 flex items-center justify-center overflow-hidden">
                {match.team_a_logo ? (
                  <img
                    src={match.team_a_logo}
                    alt={match.team_a}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-white">
                    {match.team_a[0]}
                  </span>
                )}
              </div>
              <p className="text-white font-semibold text-center">
                {match.team_a}
              </p>
            </div>

            <div className="px-4">
              <span className="text-3xl font-bold text-slate-600 group-hover:text-[#9945FF] transition-colors">
                VS
              </span>
            </div>

            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-16 h-16 rounded-lg bg-slate-800 flex items-center justify-center overflow-hidden">
                {match.team_b_logo ? (
                  <img
                    src={match.team_b_logo}
                    alt={match.team_b}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-white">
                    {match.team_b[0]}
                  </span>
                )}
              </div>
              <p className="text-white font-semibold text-center">
                {match.team_b}
              </p>
            </div>
          </div>

          {/* Match Info */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {format(parseISO(match.match_date), "MMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {format(parseISO(match.match_date), "HH:mm")}
                </span>
              </div>
            </div>

            {/* You can replace these with real event JSON later */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#00FF88] font-semibold">
                ${match.buy_in ?? 0} Buy-In
              </span>
              <span className="text-slate-400">
                {match.entries ?? 0}/{match.max_entries ?? 0} Entries
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
