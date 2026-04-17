import React from "react";

const ProjectProgressList = ({ segments }) => {
  return (
    <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
      <h3 className="text-lg font-bold font-headline mb-6">Archive Segments</h3>
      <div className="space-y-6">
        {segments.map((segment) => (
          <div key={segment.id}>
            <div className="flex justify-between text-xs font-bold mb-2">
              <span>{segment.title}</span>
              <span>{segment.progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${segment.color || "bg-primary"}`}
                style={{ width: `${segment.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectProgressList;
