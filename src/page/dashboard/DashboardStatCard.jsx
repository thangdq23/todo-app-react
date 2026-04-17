import React from "react";

const DashboardStatCard = ({ title, value, subtitle, icon }) => {
  return (
    <div
      className={`p-6 rounded-xl shadow-sm border border-outline-variant/15 flex flex-col justify-between `}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">
          {title}
        </span>
        <span className="material-symbols-outlined text-primary/40">
          {icon}
        </span>
      </div>
      <div>
        <p className="text-3xl font-extrabold font-headline">{value}</p>
        <p className="text-xs text-on-surface-variant mt-1">{subtitle}</p>
      </div>
    </div>
  );
};

export default DashboardStatCard;
