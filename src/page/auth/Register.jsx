import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import api from "../../components/api/index.js";

const registerSchema = z
  .object({
    email: z.string().email(),
    fullname: z.string().min(6),
    password: z.string().min(6),
    confirm_password: z.string().min(6),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Mật khẩu không khớp",
    path: ["confirm_password"],
  });

const Register = () => {
  const nav = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const { confirm_password, ...userData } = data;
      const res = await api.post("/register", userData);
      nav("/login");
    } catch (error) {
      toast.error(error.response.data || "Error!");
    }
  };
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex items-start justify-center overflow-hidden">
      <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 bg-[#f2f4f6] dark:bg-[#111318] z-40">
        <div className="px-8 mb-12">
          <div className="text-lg font-black text-[#0052cc] dark:text-[#4785ff] font-headline mb-1 mt-5">
            Welcome
          </div>
          <div className="text-[10px] uppercase tracking-widest font-headline text-[#44474e] dark:text-[#c4c6cf]">
            TaskFlow
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          <Link
            className="text-[#44474e] dark:text-[#c4c6cf] py-3 px-6 hover:text-[#0052cc] dark:hover:text-[#4785ff] transition-all duration-300 flex items-center gap-3 font-headline text-sm uppercase tracking-widest"
            to="/login"
          >
            <span className="material-symbols-outlined">login</span> Đăng nhập
          </Link>
          <a className="bg-[#0052cc] text-white dark:bg-[#0052cc] dark:text-white rounded-r-full py-3 px-6 transition-all duration-300 flex items-center gap-3 font-headline text-sm uppercase tracking-widest">
            <span className="material-symbols-outlined">person_add</span> Đăng
            ký
          </a>
        </nav>
      </aside>
      <main className="w-full h-full min-h-screen flex items-start justify-center px-4 md:pl-72 relative overflow-y-auto mt-10">
        <div className="absolute top-10 right-10 w-96 h-96 bg-primary-fixed opacity-20 blur-[100px] rounded-full -z-10"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-secondary-fixed opacity-20 blur-[80px] rounded-full -z-10"></div>

        <div className="w-full max-w-120 space-y-8">
          <div className="glass-panel p-8 rounded-xl shadow-[0_32px_32px_8px_rgba(25,28,30,0.04)] space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5 flex justify-center text-xl">
                Tạo tài khoản
              </div>
              <div className="space-y-1.5">
                <label
                  className="text-sm font-semibold text-on-surface-variant ml-1"
                  htmlFor="name"
                >
                  Họ và tên
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] transition-colors group-focus-within:text-primary ">
                    person
                  </span>
                  <input
                    className="w-full pl-10 pr-4 py-3.5 bg-surface-container-high border-none rounded-lg box-border focus:outline-2 focus:outline-primary transition-all text-on-surface placeholder:text-outline/50"
                    id="name"
                    placeholder="Nguyễn Văn A"
                    type="text"
                    {...register("fullname")}
                  />
                  <div className="h-5">
                    {errors.fullname && (
                      <p className="text-red-600 text-sm">
                        {errors.fullname.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label
                  className="text-sm font-semibold text-on-surface-variant ml-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] transition-colors group-focus-within:text-primary ">
                    mail
                  </span>
                  <input
                    className="w-full pl-10 pr-4 py-3.5 bg-surface-container-high border-none rounded-lg box-border  focus:outline-2 focus:outline-primary transition-all text-on-surface placeholder:text-outline/50"
                    id="email"
                    placeholder="example@gmail.com"
                    type="email"
                    {...register("email")}
                  />
                  <div className="h-5">
                    {errors.email && (
                      <p className="text-red-600 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label
                  className="text-sm font-semibold text-on-surface-variant ml-1"
                  htmlFor="password"
                >
                  Mật khẩu
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] transition-colors group-focus-within:text-primary ">
                    lock
                  </span>
                  <input
                    className="w-full pl-10 pr-4 py-3.5 bg-surface-container-high border-none rounded-lg box-border  focus:outline-2 focus:outline-primary transition-all text-on-surface placeholder:text-outline/50"
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    {...register("password")}
                  />
                  <div className="h-5">
                    {errors.password && (
                      <p className="text-red-600 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label
                  className="text-sm font-semibold text-on-surface-variant ml-1"
                  htmlFor="confirm_password"
                >
                  Xác nhận mật khẩu
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] transition-colors group-focus-within:text-primary ">
                    verified_user
                  </span>
                  <input
                    className="w-full pl-10 pr-4 py-3.5 bg-surface-container-high border-none rounded-lg box-border  focus:outline-2 focus:outline-primary transition-all text-on-surface placeholder:text-outline/50"
                    id="confirm_password"
                    placeholder="••••••••"
                    type="password"
                    {...register("confirm_password")}
                  />
                  <div className="h-5">
                    {errors.confirm_password && (
                      <p className="text-red-600 text-sm">
                        {errors.confirm_password.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <button
                className="w-full kinetic-gradient text-on-primary font-semibold py-4 rounded-full shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 "
                type="submit"
              >
                Đăng ký ngay
              </button>
            </form>
          </div>
          <p className="text-center text-on-surface-variant text-sm">
            Đã có tài khoản?
            <Link
              className="text-primary font-bold hover:underline ml-1"
              to="/login"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
