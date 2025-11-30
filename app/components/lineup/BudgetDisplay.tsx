import React from 'react';
import { Card, CardContent } from "../ui/card";
import { DollarSign } from "lucide-react";
import { Progress } from "../ui/progress";

interface BudgetDisplayProps {
  totalSalary: number;
  remainingBudget: number;
  salaryCap: number;
}

export default function BudgetDisplay({
  totalSalary,
  remainingBudget,
  salaryCap
}: BudgetDisplayProps) {
  const percentUsed = Math.min((totalSalary / salaryCap) * 100, 100);
  const isOverBudget = remainingBudget < 0;

  return (
    <Card className="bg-slate-900/50 border-slate-800 glow-border min-w-[280px]">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-5 h-5 text-[#00FF88]" />
          <h3 className="text-white font-semibold">Salary Cap</h3>
        </div>

        <div className="space-y-3">
          {/* Used */}
          <div className="flex justify-between items-baseline">
            <span className="text-slate-400 text-sm">Used</span>
            <span className="text-2xl font-bold text-white">
              ${totalSalary.toLocaleString()}
            </span>
          </div>

          {/* Progress Bar */}
          <Progress
            value={percentUsed}
            className={`h-2 ${isOverBudget ? "bg-red-900/30" : "bg-slate-800"}`}
          />

          {/* Remaining */}
          <div className="flex justify-between items-baseline">
            <span className="text-slate-400 text-sm">Remaining</span>
            <span className={`text-xl font-bold ${isOverBudget ? "text-red-400" : "text-[#00FF88]"}`}>
              ${remainingBudget.toLocaleString()}
            </span>
          </div>

          {/* Total Cap */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Total Cap</span>
              <span className="text-slate-400">${salaryCap.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
