import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { CostTrendPoint } from '../types';
import { TrendingUp, Layers, CheckCircle } from 'lucide-react';

interface CostTrendChartProps {
  data: CostTrendPoint[];
  category: string;
}

export const CostTrendChart: React.FC<CostTrendChartProps> = ({
  data,
  category,
}) => {
  // Format Indian Currency in Tooltip
  const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-industrial-700 bg-industrial-950 p-3 shadow-2xl font-mono text-xs">
          <p className="font-bold text-white mb-1.5 border-b border-industrial-800 pb-1">
            Year {label} • {category}
          </p>
          <div className="space-y-1">
            <p className="text-emerald-400 font-semibold flex justify-between gap-4">
              <span>Avg Repair Cost:</span>
              <span>{formatCurrency(payload[0]?.value)}</span>
            </p>
            <p className="text-rose-400 font-semibold flex justify-between gap-4">
              <span>Replacement (New):</span>
              <span>{formatCurrency(payload[1]?.value)}</span>
            </p>
            {payload[0]?.payload?.partsAvailabilityIndex && (
              <p className="text-sky-400 text-[11px] pt-1 border-t border-industrial-800 flex justify-between">
                <span>Spare Parts Availability:</span>
                <span>{payload[0].payload.partsAvailabilityIndex}%</span>
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl border border-industrial-800 bg-industrial-900/90 p-5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-industrial-800/80 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <span>Multi-Year Cost Divergence Trend</span>
              <span className="text-[10px] font-mono text-slate-400 bg-industrial-800 px-2 py-0.5 rounded uppercase">
                {category}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Shift between repair expenditure vs. appliance replacement inflation (2023 - 2026)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-1.5">
            <div className="h-2 w-3 rounded bg-emerald-400" />
            <span>Repair Cost</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="h-2 w-3 rounded bg-rose-400" />
            <span>New Machine Price</span>
          </div>
        </div>
      </div>

      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              dataKey="year" 
              stroke="#64748b" 
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} 
            />
            <YAxis 
              stroke="#64748b" 
              tickFormatter={(v) => `₹${Math.round(v / 1000)}k`} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="repairCostINR"
              name="Avg Repair Cost"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 4, fill: '#22c55e', strokeWidth: 1, stroke: '#fff' }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="replacementCostINR"
              name="Replacement Cost (New)"
              stroke="#f43f5e"
              strokeWidth={3}
              strokeDasharray="4 4"
              dot={{ r: 4, fill: '#f43f5e', strokeWidth: 1, stroke: '#fff' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between rounded-xl bg-industrial-950 p-3 text-xs text-slate-400 border border-industrial-800 font-mono">
        <div className="flex items-center space-x-2">
          <Layers className="h-4 w-4 text-brand-400" />
          <span>Inflation gap widened by <strong className="text-white">+24.8%</strong> since 2023.</span>
        </div>
        <div className="text-[11px] text-brand-400 font-semibold">
          Fixing protects household purchasing power in tier-2 cities.
        </div>
      </div>
    </div>
  );
};
