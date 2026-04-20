import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mt-auto bg-[#f2f4f6] dark:bg-slate-900 font-['Inter'] text-sm text-slate-500 dark:text-slate-400">
      <div className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-200/15 dark:border-slate-800/15 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="font-['Manrope'] font-black text-[#0052CC] dark:text-blue-500 text-xl">
            TaskFlow
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            © 2026 TaskFlow. The Kinetic Archive.
          </div>
        </div>
        <nav className="flex flex-wrap justify-center gap-6">
          <a
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            href="#"
          >
            Security
          </a>
          <a
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            href="#"
          >
            Status
          </a>
          <a
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            href="#"
          >
            Contact Us
          </a>
        </nav>
        <div className="flex gap-4">
          <span
            className="material-symbols-outlined text-slate-400 hover:text-[#0052CC] transition-colors cursor-pointer"
            data-icon="language"
          >
            language
          </span>
          <span
            className="material-symbols-outlined text-slate-400 hover:text-[#0052CC] transition-colors cursor-pointer"
            data-icon="share"
          >
            share
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
