import React, { useEffect, useState } from "react";
import SettingsForm from "./SettingsForm";

const Setting = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const initialTheme = storedTheme || "light";
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const setAppTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    document.documentElement.classList.toggle("dark", selectedTheme === "dark");
  };

  return (
    <div className="bg-surface text-on-surface mt-4 min-h-screen">
      <main className="ml-64 p-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-bold text-primary tracking-[0.2em] uppercase mb-2">
              Settings
            </p>
            <h2 className="text-4xl font-extrabold text-on-surface tracking-tight">
              System Configuration
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <section className="md:col-span-2 bg-surface-container-lowest rounded-xl p-8 transition-all">
              <SettingsForm />
            </section>

            <section className="bg-surface-container-low rounded-xl p-8 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="material-symbols-outlined text-primary"
                  data-icon="palette"
                >
                  palette
                </span>
                <h3 className="font-bold text-lg">Visuals</h3>
              </div>
              <div className="space-y-6 flex-grow">
                <div>
                  <p className="text-xs font-semibold text-on-secondary-container mb-3">
                    Theme Mode
                  </p>
                  <div className="flex bg-surface-container-high p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setAppTheme("light")}
                      className={`flex-1 py-2 flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all ${
                        theme === "light"
                          ? "bg-surface-container-lowest text-primary shadow-sm"
                          : "text-outline hover:text-on-surface"
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-lg"
                        data-icon="light_mode"
                      >
                        light_mode
                      </span>
                      Light
                    </button>
                    <button
                      type="button"
                      onClick={() => setAppTheme("dark")}
                      className={`flex-1 py-2 flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all ${
                        theme === "dark"
                          ? "bg-surface-container-lowest text-primary shadow-sm"
                          : "text-outline hover:text-on-surface"
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-lg"
                        data-icon="dark_mode"
                      >
                        dark_mode
                      </span>
                      Dark
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Setting;
