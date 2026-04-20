import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <header className="fixed top-0 ml-64 w-[calc(100%-16rem)] h-20 flex justify-between items-center px-12 py-4 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl z-10">
      <div className="flex items-center flex-1 max-w-md"></div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-on-surface-variant hover:opacity-80 transition-opacity">
            <span
              className="material-symbols-outlined"
              data-icon="notifications"
            >
              notifications
            </span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-tertiary rounded-full border-2 border-surface"></span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <img
              alt="User profile picture"
              className="w-10 h-10 rounded-full object-cover"
              data-alt="Close-up portrait of a professional man with a clean haircut and modern glasses, soft office window lighting"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmcRW3T8Rnlmo5Q-yT0lHXB40mfSVUym11epiuOj6IE4xQZdo01OWXWXN0p31SNLkDs7imv3mcMCa0cREo28_qRIcqmGWtAtLbjknlw5xD4rEiQPBVVy5YS1LR3DYOKJR0gdgD1qBnJvBpaNgM0LyK_y4mIl1_iNH3PEi33XMozfCwJUklKmn-NvL-Eju1YYzS9ANVjWJm4ZCozN4mPeWdaIycs2xoOC-IeUTyOirCbTEye3Dy4zMctKDyeP-e0UqiwDo81vHbGA"
            />
          </div>
          <button
            onClick={handleLogout}
            className="bg-blue-300 hover:bg-blue-600 text-white px-2 py-2 rounded-lg text-sm"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
