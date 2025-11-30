"use client";

import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { parseISO, isSameDay } from "date-fns";

import RoleSlot from "../components/lineup/RoleSlot";
import PlayerSelection from "../components/lineup/PlayerSelection";
import BudgetDisplay from "../components/lineup/BudgetDisplay";

import matchesData from "@/data/matches.json";
import eventsData from "@/data/events.json";
import playersData from "@/data/players.json";
import { Player } from "../types/types";

const SALARY_CAP_PICK6 = 50000;
const SALARY_CAP_PICK4 = 20000;
const ROLES_PICK6 = ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5"];
const PICK4_SLOTS = ["Player 1", "Player 2", "Player 3"];

export default function LineupBuilder() {
  const router = useRouter();
  const params = useSearchParams();
  const matchId = params.get("matchId");
  const filterMode = params.get("filterMode") || "day";

  const match = matchesData.find(m => m.id === matchId);
  const event = eventsData.find(e => e.id === match?.event_id);

  const isPick4Mode = filterMode === "game";
  const salaryCap = isPick4Mode ? SALARY_CAP_PICK4 : SALARY_CAP_PICK6;
  const roles = isPick4Mode ? PICK4_SLOTS : ROLES_PICK6;

  const [selectedPlayers, setSelectedPlayers] = useState<Record<string, any>>({});
  const [captainId, setCaptainId] = useState<string | null>(null);
  const [selectingRole, setSelectingRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const allPlayers = playersData;

  const availablePlayers = useMemo(() => {
    if (!match) return [];
    if (filterMode === "game") {
      return allPlayers.filter(p => p.team === match.team_a || p.team === match.team_b);
    } else if (filterMode === "day") {
      const matchesOnSameDay = matchesData.filter(m =>
        isSameDay(parseISO(m.match_date), parseISO(match.match_date))
      );
      const eligibleTeams = matchesOnSameDay.flatMap(m => [m.team_a, m.team_b]);
      return allPlayers.filter(p => eligibleTeams.includes(p.team));
    } else {
      const eligibleTeams = matchesData.flatMap(m => [m.team_a, m.team_b]);
      return allPlayers.filter(p => eligibleTeams.includes(p.team));
    }
  }, [match, allPlayers, filterMode]);

  const totalSalary = Object.values(selectedPlayers).reduce((sum, player) => {
    if (!player) return sum;
    const multiplier = player.id === captainId ? 1.5 : 1;
    return sum + player.salary * multiplier;
  }, 0);

  const remainingBudget = salaryCap - totalSalary;
  const requiredPlayerCount = isPick4Mode ? 4 : 6;
  const isLineupComplete = Object.keys(selectedPlayers).length === requiredPlayerCount && !!captainId;

  const handlePlayerSelect = (player: any) => {
    if (!selectingRole) return;
    setError(null);

    setSelectedPlayers(prev => ({ ...prev, [selectingRole]: player }));
    setSelectingRole(null);

    if (selectingRole === "Captain") {
      setCaptainId(player.id);
    }
  };

  const handleCaptainToggle = (playerId: string) => {
    setError(null);
    if (captainId === playerId) {
      setCaptainId(null);
    } else {
      setCaptainId(playerId);
    }
  };

  const handleSaveLineup = () => {
    if (!isLineupComplete) {
      setError(`Please fill all ${requiredPlayerCount} slots and select a captain.`);
      return;
    }

    // Save logic here (replace with your API call)
    console.log("Lineup saved:", { selectedPlayers, captainId });
    router.push("/my-lineups");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.back()}
              className="bg-slate-900/50 border-slate-800 hover:bg-slate-800 text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <p className="text-slate-400 text-sm mb-2">
                {event?.name} | {match?.team_a} vs {match?.team_b}
              </p>
              <h1 className="text-4xl font-bold text-white neon-text">
                Build Your {isPick4Mode ? "Pick4" : "Pick6"} Lineup
              </h1>
            </div>
          </div>

          <BudgetDisplay totalSalary={totalSalary} remainingBudget={remainingBudget} salaryCap={salaryCap} />
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 bg-red-900/20 border-red-900/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <RoleSlot
            key="Captain"
            role="Captain"
            player={selectedPlayers["Captain"]}
            isCaptain={true}
            onSelect={() => setSelectingRole("Captain")}
            onCaptainToggle={() => handleCaptainToggle(selectedPlayers["Captain"]?.id)}
          />
          {roles.map(role => (
            <RoleSlot
              key={role}
              role={role}
              player={selectedPlayers[role]}
              isCaptain={false}
              onSelect={() => setSelectingRole(role)}
              onCaptainToggle={() => handleCaptainToggle(selectedPlayers[role]?.id)}
            />
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <Button
            onClick={handleSaveLineup}
            disabled={!isLineupComplete}
            className="bg-gradient-to-r from-[#9945FF] to-[#00FF88] text-white hover:opacity-90 transition-opacity px-8"
            size="lg"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Lineup
          </Button>
        </div>
      </div>

      {selectingRole && (
        <PlayerSelection
          role={selectingRole}
          availablePlayers={availablePlayers}
          selectedPlayers={selectedPlayers}
          onSelect={handlePlayerSelect}
          onClose={() => setSelectingRole(null)}
          remainingBudget={remainingBudget + (selectedPlayers[selectingRole]?.salary || 0)}
        />
      )}
    </div>
  );
}
