type StatBarProps = {
  label: string;
  value: number;
  color: string;
};

function StatBar({ label, value, color }: StatBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[11px] font-semibold text-[#A09B8C]">
        <span>{label}</span>
        <span>{value}/10</span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={10}
        aria-valuenow={value}
        className="h-1.5 w-full overflow-hidden rounded-full border border-[#785A28]/30 bg-[#010A13]"
      >
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${(value / 10) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default StatBar;