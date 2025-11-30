// -----------------------------
// Player
// -----------------------------
export type PlayerStats = {
  kills?: number;
  deaths?: number;
  assists?: number;
  rating?: number;
  [key: string]: number | undefined;
};

export type Player = {
  id: string;
  name: string;
  real_name?: string;
  team?: string;
  position: string; // awper, lurker, rifler, anchor, igl, coach
  salary: number;
  avatar_url?: string;
  stats?: PlayerStats;
  fantasy_points?: number;
};

// -----------------------------
// League
// -----------------------------
export type League = {
  id: string;
  name: string;
  game: string;
  logo_url?: string;
  description?: string;
  active: boolean;
};

// -----------------------------
// Event
// -----------------------------
export type Event = {
  id: string;
  name: string;
  game: string;
  league_id: string;
  organizer?: string;
  logo_url?: string;
  description?: string;
  active: boolean;
  start_date: string;
  end_date: string;
};

// -----------------------------
// Match
// -----------------------------
export type Match = {
  id: string;
  event_id: string;
  team_a: string;
  team_b: string;
  team_a_logo?: string;
  team_b_logo?: string;
  match_date: string;
  stage: string;
  status: string;
  best_of: number;
  // Optional tournament fields
  buy_in?: number;
  entries?: number;
  max_entries?: number;
};

// -----------------------------
// Lineup
// -----------------------------
export type LineupPlayerEntry = {
  player_id: string;
  role: string;
  is_captain?: boolean;
};

export type Lineup = {
  id: string;
  match_id: string;
  lineup_name: string;
  players: LineupPlayerEntry[];
  total_salary: number;
  captain_id?: string;
  entry_fee: number;
  total_points: number;
  status: "active" | "completed" | "cancelled";
};
