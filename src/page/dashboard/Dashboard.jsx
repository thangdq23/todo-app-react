import React from "react";

const Dashboard = () => {
  return (
    <div className="bg-surface font-body text-on-surface">
      <main className="ml-64 pt-28 pb-12 px-12 min-h-screen">
        {/* <!-- Greeting Section --> */}
        <section className="mb-12">
          <span className="Inter uppercase text-xs font-bold tracking-[0.2em] text-primary mb-2 block">
            Daily Briefing
          </span>
          <h2 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface">
            Hi, Julian! Let's get things done today.
          </h2>
        </section>
        {/* <!-- Bento Grid Layout --> */}
        <div className="grid grid-cols-12 gap-8">
          {/* <!-- Quick Stats (Glassmorphism Row) --> */}
          <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/15 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] Inter uppercase font-bold text-on-surface-variant tracking-widest">
                  Total Archive
                </span>
                <span
                  className="material-symbols-outlined text-primary/40"
                  data-icon="inventory_2"
                >
                  inventory_2
                </span>
              </div>
              <div>
                <p className="text-3xl font-extrabold font-headline">42</p>
                <p className="text-xs text-on-surface-variant mt-1">
                  Managed entries this month
                </p>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/15 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] Inter uppercase font-bold text-on-surface-variant tracking-widest">
                  Completed
                </span>
                <span
                  className="material-symbols-outlined text-primary"
                  data-icon="task_alt"
                >
                  task_alt
                </span>
              </div>
              <div>
                <p className="text-3xl font-extrabold font-headline">28</p>
                <p className="text-xs text-on-surface-variant mt-1">
                  Successfully published
                </p>
              </div>
            </div>
            <div className="bg-primary-container p-6 rounded-xl shadow-lg shadow-primary/5 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4 text-on-primary-container">
                <span className="text-[10px] Inter uppercase font-bold tracking-widest">
                  In Progress
                </span>
                <span
                  className="material-symbols-outlined"
                  data-icon="edit_note"
                >
                  edit_note
                </span>
              </div>
              <div className="text-white">
                <p className="text-3xl font-extrabold font-headline">14</p>
                <p className="text-xs opacity-80 mt-1">Currently in editing</p>
              </div>
            </div>
          </div>
          {/* <!-- Today's Tasks (Main Editorial List) --> */}
          <div className="col-span-12 lg:col-span-8">
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-bold font-headline">
                  Today's Tasks
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Asymmetric focus for maximum clarity
                </p>
              </div>
              <button className="text-xs font-bold text-primary hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {/* <!-- Task Item 1 --> */}
              <div className="group flex items-center bg-surface-container-lowest p-5 rounded-xl border border-transparent hover:border-outline-variant/30 transition-all hover:translate-x-1">
                <div className="w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center mr-6 group-hover:border-primary transition-colors cursor-pointer"></div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface">
                    Finalize Q4 Content Strategy
                  </h4>
                  <div className="flex gap-4 mt-1">
                    <span className="flex items-center gap-1 text-[10px] font-medium text-tertiary">
                      <span
                        className="material-symbols-outlined text-xs"
                        data-icon="priority_high"
                      >
                        priority_high
                      </span>{" "}
                      High Priority
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-medium text-on-surface-variant">
                      <span
                        className="material-symbols-outlined text-xs"
                        data-icon="schedule"
                      >
                        schedule
                      </span>{" "}
                      10:30 AM
                    </span>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <span
                    className="material-symbols-outlined text-outline-variant hover:text-primary cursor-pointer"
                    data-icon="more_horiz"
                  >
                    more_horiz
                  </span>
                </div>
              </div>
              {/* <!-- Task Item 2 --> */}
              <div className="group flex items-center bg-surface-container-lowest p-5 rounded-xl border border-transparent hover:border-outline-variant/30 transition-all hover:translate-x-1">
                <div className="w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center mr-6 group-hover:border-primary transition-colors cursor-pointer"></div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface">
                    Review Weekly Newsletter Draft
                  </h4>
                  <div className="flex gap-4 mt-1">
                    <span className="flex items-center gap-1 text-[10px] font-medium text-primary">
                      <span
                        className="material-symbols-outlined text-xs"
                        data-icon="folder"
                      >
                        folder
                      </span>{" "}
                      Editorial
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-medium text-on-surface-variant">
                      <span
                        className="material-symbols-outlined text-xs"
                        data-icon="schedule"
                      >
                        schedule
                      </span>{" "}
                      02:00 PM
                    </span>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <span
                    className="material-symbols-outlined text-outline-variant hover:text-primary cursor-pointer"
                    data-icon="more_horiz"
                  >
                    more_horiz
                  </span>
                </div>
              </div>
              {/* <!-- Task Item 3 (Completed) --> */}
              <div className="group flex items-center bg-surface-dim/30 p-5 rounded-xl border border-transparent transition-all grayscale opacity-60">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-6">
                  <span
                    className="material-symbols-outlined text-white text-[16px]"
                    data-icon="check"
                    style={{ fontVariationSettings: "'FILL' 0, 'wght' 700" }}
                  >
                    check
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface line-through">
                    Standup with Design Team
                  </h4>
                  <p className="text-[10px] text-on-surface-variant mt-1">
                    Completed at 09:15 AM
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Side Bento Area --> */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {/* <!-- Weekly Activity Chart --> */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/15">
              <h3 className="text-lg font-bold font-headline mb-6">
                Weekly Activity
              </h3>
              <div className="flex items-end justify-between h-32 gap-2 mb-4">
                <div className="w-full bg-surface-container-high rounded-t-lg h-[40%] hover:bg-primary-container transition-colors"></div>
                <div className="w-full bg-surface-container-high rounded-t-lg h-[65%] hover:bg-primary-container transition-colors"></div>
                <div className="w-full bg-primary rounded-t-lg h-[90%]"></div>
                <div className="w-full bg-surface-container-high rounded-t-lg h-[30%] hover:bg-primary-container transition-colors"></div>
                <div className="w-full bg-surface-container-high rounded-t-lg h-[55%] hover:bg-primary-container transition-colors"></div>
                <div className="w-full bg-surface-container-high rounded-t-lg h-[75%] hover:bg-primary-container transition-colors"></div>
                <div className="w-full bg-surface-container-high rounded-t-lg h-[45%] hover:bg-primary-container transition-colors"></div>
              </div>
              <div className="flex justify-between text-[10px] Inter uppercase font-bold text-outline">
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span>S</span>
              </div>
            </div>
            {/* <!-- Categories --> */}
            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
              <h3 className="text-lg font-bold font-headline mb-6">
                Archive Segments
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>Project Apollo</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>Q4 Editorial</span>
                    <span>40%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>Brand Guidelines</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                    <div
                      className="h-full bg-tertiary rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
