import React, { useEffect, useState } from "react";
import api from "../../components/api/index.js";

const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const SettingsForm = () => {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      setFullName(parsed.fullname || parsed.fullName || "");
      setEmail(parsed.email || "");
    } catch {
      setUser(null);
    }
  }, []);

  const handleReset = () => {
    setFullName(user?.fullname || user?.fullName || "");
    setEmail(user?.email || "");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!user?.id) {
      setError("Không tìm thấy thông tin người dùng.");
      return;
    }

    if (!fullName.trim()) {
      setError("Full name không được để trống.");
      return;
    }

    if (!email.trim() || !validateEmail(email)) {
      setError("Email không hợp lệ.");
      return;
    }

    if (password || confirmPassword) {
      if (password.length < 6) {
        setError("Password phải ít nhất 6 ký tự.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Mật khẩu và xác nhận mật khẩu không khớp.");
        return;
      }
    }

    try {
      const updatedFields = {
        fullname: fullName,
        email,
        ...(password ? { password, confirm_password: password } : {}),
      };

      const response = await api.patch(`/600/users/${user.id}`, updatedFields);
      const updatedUser = {
        ...user,
        ...response.data,
      };

      const oldEmail = user.email;
      if (oldEmail && oldEmail !== email) {
        const tasksRes = await api.get(`/tasks?userEmail=${oldEmail}`);
        const projectsRes = await api.get(`/projects?userEmail=${oldEmail}`);

        await Promise.all(
          tasksRes.data.map((task) =>
            api.patch(`/tasks/${task.id}`, { userEmail: email }),
          ),
        );

        await Promise.all(
          projectsRes.data.map((project) =>
            api.patch(`/projects/${project.id}`, { userEmail: email }),
          ),
        );
      }

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setPassword("");
      setConfirmPassword("");
      setSuccess("Cập nhật thông tin thành công.");
    } catch (err) {
      setError("Không thể cập nhật thông tin người dùng. Vui lòng thử lại.");
    }
  };

  if (!user) {
    return (
      <div className="rounded-3xl bg-surface-container-high p-8">
        <h3 className="text-xl font-bold text-on-surface mb-2">
          Thông tin tài khoản
        </h3>
        <p className="text-sm text-on-surface-variant">
          Không tìm thấy dữ liệu người dùng. Vui lòng đăng nhập lại.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-on-surface">
            Account Information
          </h3>
          <p className="text-sm text-on-surface-variant mt-2">
            Cập nhật thông tin tài khoản và mật khẩu của bạn.
          </p>
        </div>
      </div>

      <form className="grid gap-6" onSubmit={handleSave}>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-outline uppercase tracking-wider ml-1">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="w-full bg-surface-container-high border-none rounded-lg p-4 text-sm focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all"
            placeholder="Enter full name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-outline uppercase tracking-wider ml-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-surface-container-high border-none rounded-lg p-4 text-sm focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all"
            placeholder="Enter email address"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-outline uppercase tracking-wider ml-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full bg-surface-container-high border-none rounded-lg p-4 text-sm focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all"
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-outline uppercase tracking-wider ml-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full bg-surface-container-high border-none rounded-lg p-4 text-sm focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all"
              placeholder="Confirm new password"
            />
          </div>
        </div>

        {error && (
          <div className="rounded-3xl bg-red-400 border border-error-container px-4 py-3 text-sm text-amber-50">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-3xl bg-primary-container/10 border border-primary px-4 py-3 text-sm text-primary">
            {success}
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-8 py-3 rounded-full text-sm font-semibold text-on-secondary-container hover:bg-surface-container-low transition-colors"
          >
            Discard Changes
          </button>
          <button
            type="submit"
            className="px-10 py-3 rounded-full bg-primary text-on-primary text-sm font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;
