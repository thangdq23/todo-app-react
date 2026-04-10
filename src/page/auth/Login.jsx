import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import api from "../../components/api/index.js";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Login = () => {
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
      const res = await api.post("/login", data);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/dashboard";
    } catch (error) {
      toast.error(error.response.data || "Error!");
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface antialiased overflow-hidden">
      <main className="flex min-h-screen">
        <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary items-center justify-center">
          <img
            alt="Workspace inspiration"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            data-alt="Minimalist architectural workspace with clean lines, soft natural morning light through a window, a single sleek laptop, and shadows on a white desk"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGMVNGR5Ut6-H_u0K9X3PlPUvaf9vmx5Qkp2WFdm482zbJL2Jf5R4-l_ZKN3UOvK-N0juAO_sVas-NBsWqXhSo3dU1P_pLq8I2lK5Vdj_MlxWaku4SZbpQ5rE7Hs2ZHK5FuDFp_Pwy4sqJBXSthit32CMM2UtpktCEytfNn5YHMCdkUGAvLuGCXo0lVfYapaigZ84_-PA0aYF2y0dcTuD0oVyiTsYunPG8c6fhfEYNAT7E0MFHFVzBuIdPQNhRqhXsHlQqXA3mzA"
          />
          <div className="relative z-10 p-16 max-w-xl">
            <div className="mb-12">
              <span className="font-headline text-on-primary-container bg-primary-container/20 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-6 inline-block">
                Velocity Flux
              </span>
              <h1 className="font-headline text-5xl font-extrabold text-white tracking-tighter leading-tight mb-6">
                Biến đổi cách bạn <br />
                <span className="text-primary-fixed">Quản lý Thời gian.</span>
              </h1>
              <p className="text-primary-fixed/80 text-lg leading-relaxed font-light">
                Trải nghiệm giao diện biên tập tập trung cho các nhiệm vụ hàng
                ngày của bạn. Đơn giản hóa, ưu tiên và đạt được nhiều hơn.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                <span
                  className="material-symbols-outlined text-primary-fixed mb-2"
                  data-icon="auto_awesome"
                >
                  auto_awesome
                </span>
                <h3 className="text-white font-headline font-bold mb-1">
                  Giao diện Sạch
                </h3>
                <p className="text-primary-fixed/60 text-sm">
                  Loại bỏ xao nhãng hoàn toàn.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                <span
                  className="material-symbols-outlined text-primary-fixed mb-2"
                  data-icon="bolt"
                >
                  bolt
                </span>
                <h3 className="text-white font-headline font-bold mb-1">
                  Luồng Kinetic
                </h3>
                <p className="text-primary-fixed/60 text-sm">
                  Tối ưu hóa năng suất tối đa.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-16">
            <p className="text-primary-fixed/40 text-xs font-label tracking-widest uppercase">
              © 2026 The Focused Editorial
            </p>
          </div>
        </section>
        <section className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-surface">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight mb-2">
                Chào mừng
              </h2>
              <p className="text-on-surface-variant font-medium">
                Nhập thông tin để lưu trữ những cột mốc của bạn.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2 ml-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <span
                    className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-sm "
                    data-icon="mail"
                  >
                    mail
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-4 bg-surface-container-high border-none rounded-xl text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-300"
                    id="email"
                    name="email"
                    placeholder="example@gmail.com"
                    required=""
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
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    className="block text-xs font-label uppercase tracking-widest text-on-surface-variant ml-1"
                    htmlFor="password"
                  >
                    Mật khẩu
                  </label>
                  <a
                    className="text-xs font-semibold text-primary hover:text-primary-container transition-colors"
                    href="#"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <div className="relative">
                  <span
                    className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-sm "
                    data-icon="lock"
                  >
                    lock
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-4 bg-surface-container-high border-none rounded-xl text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-300"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required=""
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
              <div className="flex items-center">
                <input
                  className="w-4 h-4 rounded-sm border-outline-variant text-primary focus:ring-primary"
                  id="remember"
                  type="checkbox"
                />
                <label
                  className="ml-2 text-sm text-on-surface-variant font-medium"
                  htmlFor="remember"
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <button
                className="w-full kinetic-gradient text-white py-4 px-6 rounded-full font-headline font-bold text-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-2 group"
                type="submit"
              >
                Đăng nhập
                <span
                  className="material-symbols-outlined group-hover:translate-x-1 transition-transform"
                  data-icon="arrow_forward"
                >
                  arrow_forward
                </span>
              </button>
            </form>
            <div className="mt-8 flex items-center gap-4"></div>

            <p className="mt-10 text-center text-on-surface-variant">
              Chưa có tài khoản?
              <Link
                className="text-primary font-bold hover:underline decoration-2 underline-offset-4 ml-1 transition-all"
                to="/register"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </section>
      </main>
      <footer className="flex justify-center items-center gap-8 py-6 px-4 w-full absolute bottom-0 bg-transparent lg:w-1/2 lg:right-0"></footer>
    </div>
  );
};

export default Login;
