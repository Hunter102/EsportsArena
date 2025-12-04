import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Star, Plus, XIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  salary: number;
  avatar_url?: string;
}

interface RoleSlotProps {
  role: string;
  player?: Player | null;
  isCaptain?: boolean;
  onSelect: () => void;
  onClearPlayer: () => void;
}

export default function RoleSlot({
  role,
  player,
  isCaptain = false,
  onSelect,
  onClearPlayer,
}: RoleSlotProps) {
  return (
    <Card
      onClick={!player ? onSelect : undefined}
      className={`bg-slate-900/50 border-slate-800 w-100 m-5 transition-all ${
        !player ? "cursor-pointer glow-border" : ""
      }`}
    >
      <CardContent className="p-4">
        {/* Role Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-400 uppercase flex items-center justify-between tracking-wider">
            {role} {isCaptain && <Star className="w-4 h-4 text-[#00FF88] fill-current ml-3" />}
          </h3>
          {player ? (
           <Button
              size="icon"
              onClick={player ? onClearPlayer : undefined}
              className="bg-slate-900/50 border-slate-800 hover:bg-slate-900/50 text-white cursor-pointer"
            >
              <XIcon />
            </Button>) : (<></>)}
        </div>

        {/* Player Slot */}
        {player ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3"
          >
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0">
              {player.avatar_url ? (
                <img
                  src={player.avatar_url}
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-lg font-bold text-white">
                  {player.name[0]}
                </span>
              )}
            </div>

            {/* Name & Team */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold truncate">{player.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-slate-400 truncate">{player.team}</p>
                <span className="text-xs text-[#9945FF]">• {player.position}</span>
              </div>
            </div>

            {/* Salary & Actions */}
            <div className="flex flex-row items-end gap-1">
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect();
                  }}
                  className="h-6 px-2 text-xs text-slate-400 hover:bg-slate-800"
                >
                  Change
                </Button>
              </div>
               <p className="text-[#00FF88] font-bold text-sm">
                ${(player.salary * (isCaptain ? 1.5 : 1)).toLocaleString()}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center py-4 text-slate-500 text-sm gap-2">
            <Plus className="w-6 h-6" />
            <span>Select Player</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
