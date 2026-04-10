import React from "react";

const Calendar = () => {
  return (
    <div class="bg-surface text-on-surface mt-7">
      {/* <!-- Main Content Area --> */}
      <main class="ml-64 p-12 min-h-screen flex gap-8">
        {/* <!-- Calendar Grid --> */}
        <div class="flex-1">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-3xl font-extrabold text-on-surface tracking-tight">
                September 2024
              </h2>
              <p class="text-sm font-medium text-on-secondary-container uppercase tracking-widest mt-1">
                Curated Schedule
              </p>
            </div>
            <div class="flex gap-2">
              <button class="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-slate-600 transition-colors">
                <span
                  class="material-symbols-outlined"
                  data-icon="chevron_left"
                >
                  chevron_left
                </span>
              </button>
              <button class="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-slate-600 transition-colors">
                <span
                  class="material-symbols-outlined"
                  data-icon="chevron_right"
                >
                  chevron_right
                </span>
              </button>
            </div>
          </div>
          {/* <!-- Grid Container --> */}
          <div class="grid grid-cols-7 gap-4">
            {/* <!-- Day Labels --> */}
            <div class="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Mon
            </div>
            <div class="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Tue
            </div>
            <div class="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Wed
            </div>
            <div class="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Thu
            </div>
            <div class="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Fri
            </div>
            <div class="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Sat
            </div>
            <div class="text-center py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Sun
            </div>
            {/* <!-- Calendar Cells -->
<!-- Prev Month --> */}
            <div class="h-32 bg-surface-container-low/30 rounded-xl p-3 opacity-40">
              <span class="text-sm font-medium">26</span>
            </div>
            <div class="h-32 bg-surface-container-low/30 rounded-xl p-3 opacity-40">
              <span class="text-sm font-medium">27</span>
            </div>
            <div class="h-32 bg-surface-container-low/30 rounded-xl p-3 opacity-40">
              <span class="text-sm font-medium">28</span>
            </div>
            <div class="h-32 bg-surface-container-low/30 rounded-xl p-3 opacity-40">
              <span class="text-sm font-medium">29</span>
            </div>
            <div class="h-32 bg-surface-container-low/30 rounded-xl p-3 opacity-40">
              <span class="text-sm font-medium">30</span>
            </div>
            <div class="h-32 bg-surface-container-low/30 rounded-xl p-3 opacity-40">
              <span class="text-sm font-medium">31</span>
            </div>
            {/* <!-- Current Month --> */}
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">1</span>
              <div class="mt-2 space-y-1">
                <div class="flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span class="text-[10px] font-medium text-slate-600 truncate">
                    Quarterly Review
                  </span>
                </div>
              </div>
            </div>
            {/* <!-- Repeat Days... (Simplified for Layout) --> */}
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">2</span>
            </div>
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10 border-2 border-primary/20">
              <span class="text-sm font-bold text-primary">3</span>
              <div class="mt-2 space-y-1">
                <div class="bg-primary/10 rounded px-2 py-0.5 border-l-2 border-primary">
                  <span class="text-[10px] font-bold text-primary">
                    Design Audit
                  </span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  <span class="text-[10px] font-medium text-slate-600 truncate">
                    Sync Meeting
                  </span>
                </div>
              </div>
            </div>
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">4</span>
            </div>
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">5</span>
            </div>
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">6</span>
              <div class="mt-2 flex gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-on-secondary-container"></span>
              </div>
            </div>
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">7</span>
            </div>
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">8</span>
            </div>
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">9</span>
            </div>
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">10</span>
            </div>
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">11</span>
            </div>
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">12</span>
            </div>
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">13</span>
              <div class="mt-2 bg-tertiary-fixed rounded px-2 py-0.5">
                <span class="text-[10px] font-bold text-tertiary">
                  Product Launch
                </span>
              </div>
            </div>
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">14</span>
            </div>
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">15</span>
            </div>
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">16</span>
            </div>
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">17</span>
            </div>
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">18</span>
            </div>
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">19</span>
            </div>
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">20</span>
            </div>
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">21</span>
            </div>
            <div class="h-32 bg-surface-container-lowest rounded-xl p-3 transition-all hover:ring-2 hover:ring-primary/10">
              <span class="text-sm font-semibold">22</span>
            </div>
          </div>
        </div>
        {/* <!-- Sidebar Deadlines --> */}
        <aside class="w-80 flex flex-col gap-8">
          <div class="bg-surface-container-low rounded-2xl p-6">
            <h3 class="text-lg font-bold text-on-surface mb-6">
              Upcoming Deadlines
            </h3>
            <div class="space-y-4">
              {/* <!-- Deadline Card --> */}
              <div class="p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10">
                <div class="flex justify-between items-start mb-2">
                  <span class="text-[10px] font-bold text-tertiary uppercase tracking-wider bg-tertiary-fixed px-2 py-0.5 rounded">
                    High Priority
                  </span>
                  <span class="text-xs text-slate-400 font-medium">
                    Tomorrow
                  </span>
                </div>
                <h4 class="text-sm font-bold text-on-surface">
                  Client Proposal Finalization
                </h4>
                <div class="mt-3 flex items-center gap-2">
                  <div class="flex-1 h-1 bg-surface-container-high rounded-full">
                    <div class="h-full w-4/5 bg-tertiary rounded-full"></div>
                  </div>
                  <span class="text-[10px] font-bold text-slate-500">80%</span>
                </div>
              </div>
              <div class="p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10">
                <div class="flex justify-between items-start mb-2">
                  <span class="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary-fixed px-2 py-0.5 rounded">
                    Strategy
                  </span>
                  <span class="text-xs text-slate-400 font-medium">Sep 13</span>
                </div>
                <h4 class="text-sm font-bold text-on-surface">
                  Marketing Q4 Planning
                </h4>
                <div class="mt-3 flex -space-x-2">
                  <img
                    class="w-6 h-6 rounded-full border-2 border-white"
                    data-alt="Small avatar of a team member with glasses"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTF5SuYPnjzxxQrnbuBx-N5WAZUM0KMCMrC2FSBKom-IwwqiW9S-uJ5Awvo06xh0FJrvTotxZU46Ide3PyK9_1mLRxKNuXhDnIFjHu0BE4ujYJXqk4-3RpSnjqN78yVrMZF4QGOQ6rneo81bgy5xAKUYP9H3JvE5kE709y1hQaGTcHKbPr-5_sl_F5Jggh8hXkfWssHJymHpdtzAw8jXLDatbF0NyhgGyKm_rJFZsegGqFGMf4hr5eYMt2iq1p-KLl4yZysEZR5w"
                  />
                  <img
                    class="w-6 h-6 rounded-full border-2 border-white"
                    data-alt="Small avatar of a smiling team member with curly hair"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuALn31mX2LqJ0ZmEVDvqXhP4w5_G0His3DVGJ6UOE14iOnsbTQVv9VtXLxBsLTRk2t2X3H1NV_WiRXdju9gXQ-tPr9YgvTqf5WSo-opAxmn0aq9gNJ3OBCG0TVCg9iJHattOLk_x6wGJW-Dvl2Ivm2R4Dx8jHbQdX4tgmIsWw8WC54A_qEw5nfS2PYqSZJiStz86eeopa6npbpSMo0VVp0JY9DBV7qR3qaNZr-KUxhEA0hMnnYRYRT7CNImrYPwxiAK2-EuyGpcqQ"
                  />
                  <div class="w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center border-2 border-white text-[8px] font-bold text-slate-500">
                    +3
                  </div>
                </div>
              </div>
              <div class="p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10">
                <div class="flex justify-between items-start mb-2">
                  <span class="text-[10px] font-bold text-on-secondary-container uppercase tracking-wider bg-secondary-container px-2 py-0.5 rounded">
                    Maintenance
                  </span>
                  <span class="text-xs text-slate-400 font-medium">Sep 15</span>
                </div>
                <h4 class="text-sm font-bold text-on-surface">
                  Weekly Archive Backup
                </h4>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Calendar;
