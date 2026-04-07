import React from "react";

const Tasks = () => {
  return (
    <main class="flex-1 ml-64 flex flex-col">
      {/* <!-- TopNavBar --> */}

      {/* <!-- Content Area --> */}
      <div class="px-12 py-10 max-w-7xl mt-20">
        {/* <!-- Hero Header --> */}
        <div class="mb-12 flex justify-between items-end">
          <div>
            <p class="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2">
              Editorial Workspace
            </p>
            <h2 class="text-4xl font-extrabold tracking-tight text-on-surface">
              Active Assignments
            </h2>
          </div>
          <div class="flex items-center gap-4 p-1.5 rounded-xl">
            <button className="w-full bg-blue-800 from-primary to-primary-container text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/10 active:scale-95 transition-transform">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="add"
              >
                add
              </span>
              <span>New Task</span>
            </button>
          </div>
        </div>
        {/* <!-- Filters and Sorting Bento --> */}
        <div class="grid grid-cols-12 gap-6 mb-12">
          <div class="col-span-12 md:col-span-8 bg-surface-container-low rounded-xl p-6 flex flex-wrap gap-8 items-center">
            <div class="space-y-1">
              <p class="text-[10px] font-black text-outline uppercase tracking-widest">
                Filter by Priority
              </p>
              <div class="flex gap-2">
                <span class="px-3 py-1 bg-surface-container-highest rounded-full text-[11px] font-bold text-tertiary-container cursor-pointer hover:bg-tertiary-fixed transition-colors border border-transparent">
                  High
                </span>
                <span class="px-3 py-1 bg-surface-container-highest rounded-full text-[11px] font-bold text-on-secondary-container cursor-pointer hover:bg-secondary-container transition-colors border border-transparent">
                  Medium
                </span>
                <span class="px-3 py-1 bg-surface-container-highest rounded-full text-[11px] font-bold text-on-surface-variant cursor-pointer hover:bg-surface-variant transition-colors border border-transparent">
                  Low
                </span>
              </div>
            </div>
            <div class="h-8 w-[1px] bg-outline-variant/30"></div>
            <div class="space-y-1">
              <p class="text-[10px] font-black text-outline uppercase tracking-widest">
                Filter by Status
              </p>
              <div class="flex gap-2">
                <span class="px-3 py-1 bg-primary text-on-primary rounded-full text-[11px] font-bold cursor-pointer">
                  To Do
                </span>
                <span class="px-3 py-1 bg-surface-container-highest rounded-full text-[11px] font-bold text-on-surface-variant cursor-pointer hover:bg-surface-variant transition-colors">
                  In Progress
                </span>
                <span class="px-3 py-1 bg-surface-container-highest rounded-full text-[11px] font-bold text-on-surface-variant cursor-pointer hover:bg-surface-variant transition-colors">
                  Done
                </span>
              </div>
            </div>
          </div>
          <div class="col-span-12 md:col-span-4 bg-surface-container-low rounded-xl p-6 flex flex-col justify-center">
            <p class="text-[10px] font-black text-outline uppercase tracking-widest mb-2">
              Sort Order
            </p>
            <div class="relative">
              <select class="w-full bg-surface-container-highest border-none rounded-lg text-sm font-semibold py-2 px-4 appearance-none focus:ring-1 focus:ring-primary">
                <option>Closest Due Date</option>
                <option>Highest Priority</option>
                <option>Alphabetical</option>
              </select>
              <span
                class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant"
                data-icon="expand_more"
              >
                expand_more
              </span>
            </div>
          </div>
        </div>
        {/* <!-- Task Grid --> */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* <!-- Task Card 1 (Urgent/High) --> */}
          <div class="group bg-surface-container-lowest rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-on-surface/5 flex flex-col border border-outline-variant/10 cursor-pointer">
            <div class="flex justify-between items-start mb-6">
              <span class="px-2.5 py-1 bg-error-container text-on-error-container text-[10px] font-black uppercase tracking-tighter rounded">
                HIGH PRIORITY
              </span>
            </div>
            <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
              Q4 Editorial Calendar Audit
            </h3>
            <p class="text-on-secondary-container text-sm line-clamp-2 mb-6">
              Review all pending content for the next quarter. Ensure brand
              alignment across all vertical channels...
            </p>
            <div class="mt-auto pt-6 flex items-center justify-between border-t border-surface-container">
              <div class="flex items-center gap-2 text-on-surface-variant">
                <span
                  class="material-symbols-outlined text-sm"
                  data-icon="calendar_month"
                >
                  calendar_month
                </span>
                <span class="text-xs font-medium">Oct 24, 2024</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-primary"></div>
                <span class="text-xs font-bold text-primary uppercase">
                  To Do
                </span>
              </div>
            </div>
          </div>
          {/* <!-- Task Card 2 (In Progress) --> */}
          <div class="group bg-surface-container-lowest rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-on-surface/5 flex flex-col border border-outline-variant/10">
            <div class="flex justify-between items-start mb-6">
              <span class="px-2.5 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-black uppercase tracking-tighter rounded">
                MEDIUM
              </span>
            </div>
            <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
              User Interview Synthesis
            </h3>
            <p class="text-on-secondary-container text-sm line-clamp-2 mb-6">
              Compiling notes from 12 separate sessions regarding the new mobile
              kinetic navigation system.
            </p>
            <div class="mt-auto pt-6 flex items-center justify-between border-t border-surface-container">
              <div class="flex items-center gap-2 text-on-surface-variant">
                <span
                  class="material-symbols-outlined text-sm"
                  data-icon="calendar_month"
                >
                  calendar_month
                </span>
                <span class="text-xs font-medium">Oct 26, 2024</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-tertiary"></div>
                <span class="text-xs font-bold text-tertiary uppercase">
                  In Progress
                </span>
              </div>
            </div>
          </div>
          {/* <!-- Task Card 3 (Done) --> */}
          <div class="group bg-surface-dim opacity-70 rounded-xl p-6 transition-all duration-300 flex flex-col">
            <div class="flex justify-between items-start mb-6">
              <span class="px-2.5 py-1 bg-surface-container-highest text-outline text-[10px] font-black uppercase tracking-tighter rounded">
                LOW
              </span>
              <span
                class="material-symbols-outlined text-outline"
                data-icon="check_circle"
                style={{ fontVariationSettings: "'FILL' 1;" }}
              >
                check_circle
              </span>
            </div>
            <h3 class="text-xl font-bold mb-2 line-through text-outline leading-tight">
              Sync Branding Assets
            </h3>
            <p class="text-outline text-sm line-clamp-2 mb-6">
              Upload latest logo variations and typeface files to the shared
              Kinetic Archive server.
            </p>
            <div class="mt-auto pt-6 flex items-center justify-between border-t border-outline-variant/30">
              <div class="flex items-center gap-2 text-outline">
                <span
                  class="material-symbols-outlined text-sm"
                  data-icon="calendar_month"
                >
                  calendar_month
                </span>
                <span class="text-xs font-medium">Oct 20, 2024</span>
              </div>
              <span class="text-[10px] font-black text-outline uppercase">
                Completed
              </span>
            </div>
          </div>

          {/* <!-- Task Card 4 --> */}
          <div class="group bg-surface-container-lowest rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-on-surface/5 flex flex-col border border-outline-variant/10">
            <div class="flex justify-between items-start mb-6">
              <span class="px-2.5 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-black uppercase tracking-tighter rounded">
                MEDIUM
              </span>
            </div>
            <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
              Newsletter Draft
            </h3>
            <p class="text-on-secondary-container text-sm line-clamp-2 mb-6">
              Drafting the weekly 'Kinetic Flow' update for our 50k subscribers.
              Focusing on focus-work.
            </p>
            <div class="mt-auto pt-6 flex items-center justify-between border-t border-surface-container">
              <div class="flex items-center gap-2 text-on-surface-variant">
                <span
                  class="material-symbols-outlined text-sm"
                  data-icon="calendar_month"
                >
                  calendar_month
                </span>
                <span class="text-xs font-medium">Oct 28, 2024</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-primary"></div>
                <span class="text-xs font-bold text-primary uppercase">
                  To Do
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Tasks;
