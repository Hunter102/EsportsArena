import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface Player {
  id: string;
  name: string;
  real_name?: string;
  team: string;
  salary: number;
  avatar_url?: string;
  stats?: {
    rating?: number;
  };
}

interface PlayerSelectionProps {
  role: string;
  availablePlayers: Player[];
  selectedPlayers: Record<string, Player>;
  remainingBudget: number;
  onSelect: (player: Player) => void;
  onClose: () => void;
}

export default function PlayerSelection({
  role,
  availablePlayers,
  selectedPlayers,
  remainingBudget,
  onSelect,
  onClose,
}: PlayerSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const selectedPlayerIds = Object.values(selectedPlayers).map(p => p.id);

  const filteredPlayers = availablePlayers
    .filter(p => !selectedPlayerIds.includes(p.id))
    .filter(
      p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.team.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.salary - a.salary);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold neon-text">Select {role}</DialogTitle>
          <p className="text-slate-400">
            Remaining Budget:{" "}
            <span className="text-[#00FF88] font-bold">${remainingBudget.toLocaleString()}</span>
          </p>
        </DialogHeader>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            placeholder="Search players..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700 text-white"
          />
        </div>

        {/* Player List */}
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {filteredPlayers.map(player => {
              const canAfford = player.salary <= remainingBudget;
              return (
                <motion.div
                  key={player.id}
                  whileHover={{ scale: canAfford ? 1.02 : 1 }}
                  whileTap={{ scale: canAfford ? 0.98 : 1 }}
                >
                  <div
                    onClick={() => canAfford && onSelect(player)}
                    className={`p-4 rounded-lg border transition-all ${
                      canAfford
                        ? "bg-slate-800/50 border-slate-700 hover:border-[#9945FF] cursor-pointer"
                        : "bg-slate-900/50 border-slate-800 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                        {player.avatar_url ? (
                          <img
                            src={player.avatar_url}
                            alt={player.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-lg font-bold text-white">{player.name[0]}</span>
                        )}
                      </div>

                      {/* Name & Team */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-white font-semibold">{player.name}</p>
                          {player.real_name && (
                            <span className="text-slate-400 text-sm">({player.real_name})</span>
                          )}
                        </div>
                        <p className="text-slate-400 text-sm">{player.team}</p>
                      </div>

                      {/* Salary & Rating */}
                      <div className="text-right flex flex-col items-end gap-1">
                        <Badge
                          className={
                            canAfford
                              ? "bg-[#9945FF]/20 text-[#9945FF] border-[#9945FF]/30"
                              : "bg-red-500/20 text-red-400 border-red-500/30"
                          }
                        >
                          ${player.salary.toLocaleString()}
                        </Badge>
                        {player.stats?.rating && (
                          <p className="text-slate-500 text-xs mt-1">
                            Rating: {player.stats.rating.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {filteredPlayers.length === 0 && (
              <div className="text-center py-8 text-slate-400">No players available</div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
