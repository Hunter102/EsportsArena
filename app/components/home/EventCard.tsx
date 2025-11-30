"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import { Trophy, ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

type EventType = {
  id: string;
  name: string;
  description?: string;
  logo_url?: string;
  organizer?: string;
  start_date?: string;
};

export default function EventCard({
  event,
  onClick,
}: {
  event: EventType;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="bg-slate-900/50 border border-slate-800 hover:border-[#9945FF] transition-all duration-300 cursor-pointer overflow-hidden group"
        onClick={onClick}
      >
        {/* Banner */}
        <div className="h-32 bg-gradient-to-br from-[#9945FF]/20 to-[#00FF88]/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800')] bg-cover bg-center opacity-20" />

          <div className="absolute inset-0 flex items-center justify-center">
            {event.logo_url != "" ? (
              <img
                src={event.logo_url}
                alt={event.name}
                className="h-16 w-16 object-contain"
              />
            ) : (
              <Trophy className="w-16 h-16 text-[#00FF88]" />
            )}
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00FF88] transition-colors">
            {event.name}
          </h3>

          <p className="text-slate-400 text-sm mb-4 line-clamp-2">
            {event.description || "Compete in this premier CS2 event"}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              {event.organizer && (
                <span className="text-xs text-[#9945FF] font-medium">
                  {event.organizer}
                </span>
              )}

              {event.start_date && (
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {format(new Date(event.start_date), "MMM d, yyyy")}
                  </span>
                </div>
              )}
            </div>

            <ArrowRight className="w-5 h-5 text-[#9945FF] group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
