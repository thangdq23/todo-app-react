import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full top-0 sticky bg-[#f7f9fb] dark:bg-slate-950 z-50">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-extrabold tracking-tighter text-[#0052CC] dark:text-blue-500 font-headline">
          TaskFlow
        </div>
        <nav className="hidden md:flex items-center gap-8 font-['Manrope'] font-bold text-sm tracking-tight">
          <a
            className="text-slate-600 dark:text-slate-400 font-medium hover:text-[#0052CC] transition-colors"
            href="#"
          >
            Sản Phẩm
          </a>
          <a
            className="text-slate-600 dark:text-slate-400 font-medium hover:text-[#0052CC] transition-colors"
            href="#"
          >
            Giải Pháp
          </a>
          <a
            className="text-slate-600 dark:text-slate-400 font-medium hover:text-[#0052CC] transition-colors"
            href="#"
          >
            Giá cả
          </a>
          <a
            className="text-slate-600 dark:text-slate-400 font-medium hover:text-[#0052CC] transition-colors"
            href="#"
          >
            Tài Nguyên
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 text-slate-600 dark:text-slate-400 font-bold text-sm hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-300 rounded-full cursor-pointer"
          >
            Đăng nhập
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2.5 hero-gradient text-white font-bold text-sm rounded-full scale-95 hover:scale-100 duration-200 ease-in-out cursor-pointer shadow-lg shadow-primary/20 bg-blue-700"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
