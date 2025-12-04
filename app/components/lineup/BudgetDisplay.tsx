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
    <Card className="bg-slate-900/50 border-slate-800 min-w-[280px]">
      <CardContent>
        <div className="flex items-center gap-2 mb-3">
          {/* <DollarSign className="w-5 h-5 text-[#00FF88]" /> */}
          <h3 className="text-white font-semibold">Salary Cap | ${salaryCap.toLocaleString()}</h3>
        </div>

        <div className="space-y-3">
          {/* Used */}
          <div className="flex justify-between items-baseline">
            <span className="text-slate-400 text-sm">Used</span>
            <span className="text-xl font-bold text-white">
              ${totalSalary.toLocaleString()}
            </span>
          </div>

          {/* Remaining */}
          <div className="flex justify-between items-baseline">
            <span className="text-slate-400 text-sm">Remaining</span>
            <span className={`text-xl font-bold ${isOverBudget ? "text-red-400" : "text-[#00FF88]"}`}>
              ${remainingBudget.toLocaleString()}
            </span>
          </div>

          {/* Progress Bar */}
          <Progress
            value={percentUsed}
            className={`h-2 ${isOverBudget ? "bg-red-900/30" : "bg-[#00FF88]"}`}
          />
        </div>
      </CardContent>
    </Card>
  );
}
