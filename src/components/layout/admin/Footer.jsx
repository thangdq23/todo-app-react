import React from "react";

const Footer = () => {
  return (
    <footer className="ml-64 flex items-center justify-between px-12 py-6 mt-auto w-[calc(100%-16rem)] bg-slate-50 dark:bg-slate-900 border-t border-slate-200/20">
      <div className="text-xs font-medium Inter text-slate-400 dark:text-slate-500">
        © 2024 Focused Editorial. All rights reserved.
      </div>
      <div className="flex gap-8">
        <a
          className="text-xs font-medium Inter text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
          href="#"
        >
          Help
        </a>
        <a
          className="text-xs font-medium Inter text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
          href="#"
        >
          Privacy
        </a>
        <a
          className="text-xs font-medium Inter text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
          href="#"
        >
          Terms
        </a>
      </div>
    </footer>
  );
};

export default Footer;
