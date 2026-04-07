import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const nav = useNavigate();
  return (
    <div className="bg-surface font-body text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* <!-- Header (Shared Component: TopNavBar) --> */}

      <main>
        {/* <!-- Hero Section --> */}
        <section className="relative pt-20 pb-32 overflow-hidden px-8">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-primary uppercase bg-primary-fixed rounded-full font-label">
              Kho Lưu Trữ
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface tracking-tight max-w-4xl leading-loose mb-8">
              Quản lý công việc hằng ngày của bạn một cách{" "}
              <span className="text-primary italic">chính xác.</span>
            </h1>
            <p className="text-secondary text-lg md:text-xl max-w-2xl mb-12 font-body leading-relaxed">
              Vượt qua sự rối rắm của các công cụ thông thường. Trải nghiệm một
              môi trường tinh tế, nơi sự tập trung của bạn được bảo vệ và năng
              suất được nâng tầm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <button
                onClick={() => nav("/login")}
                className="px-8 py-4 hero-gradient text-white font-bold text-md rounded-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 bg-blue-700"
              >
                Bắt đầu
              </button>
              <button className="px-8 py-4 bg-surface-container-lowest text-primary font-bold text-md rounded-xl border border-outline-variant/15 hover:bg-surface-container-low transition-all duration-300 flex items-center gap-2">
                <span
                  className="material-symbols-outlined"
                  data-icon="play_circle"
                >
                  play_circle
                </span>
                Xem Demo
              </button>
            </div>
            {/* <!-- Product Screenshot Representation --> */}
            <div className="relative w-full max-w-5xl group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-primary-container/10 rounded-2xl blur-2xl group-hover:blur-3xl transition duration-1000"></div>
              <div className="relative bg-surface-container-lowest border border-outline-variant/10 rounded-2xl shadow-2xl overflow-hidden aspect-[16/10] md:aspect-[21/9]">
                <img
                  alt="Product landing page"
                  className="w-full object-cover"
                  data-alt="A clean and modern software landing page interface with minimalist task cards, elegant typography, and plenty of white space in a blue and gray color palette."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDPlII9zCqR3SDv1-UXO40uCIQWhe8Mz9_AoWMr82axamaMfsfKx9io-3CPWKV6hOXTTSzKRtPc2id7cbzXReDW5c0BGsGEIqEBoJjrq-vBAoA_L87zBpZfY7DBivgK7MFyJtpjOu77LMbBdu2Q8KB_mFnJQ9ZPOqS0sF9Sd8qnTuAzliQQ_bZki0n40hf32LYEHcGyKFzaE3W1kvkPE_NEB_1MV4KZJF4KIK9bPaK47e-XOMTRhAC7xauPoCtvn2KpmM2Hi12QQ"
                />
                {/* <!-- Glassmorphism Overlay Elements --> */}
                <div className="absolute top-10 right-10 p-6 glass-panel rounded-xl shadow-xl border border-white/20 w-64 hidden md:block">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span className="text-xs font-bold text-on-surface uppercase tracking-wider font-label">
                      Priority Focus
                    </span>
                  </div>
                  <p className="text-on-surface font-headline font-bold text-lg leading-tight mb-2">
                    Strategy Review
                  </p>
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full">
                    <div className="bg-primary w-2/3 h-full rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Value Propositions: Bento Grid Style --> */}
        <section className="py-24 bg-surface-container-low/50 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center md:text-left">
              <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-4">
                Công cụ tinh gọn cho tư duy hiện đại
              </h2>
              <p className="text-secondary max-w-xl">
                Chúng tôi biến sự hỗn loạn thành rõ ràng thông qua cấu trúc hợp
                lý và thiết kế có chiều sâu.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* <!-- Feature Card 1 --> */}
              <div className="bg-surface-container-lowest p-8 rounded-xl flex flex-col h-full hover:translate-y-[-4px] transition-transform duration-300">
                <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center text-primary mb-6">
                  <span
                    className="material-symbols-outlined"
                    data-icon="dashboard"
                  >
                    dashboard
                  </span>
                </div>
                <h3 className="font-headline text-xl font-bold text-on-surface mb-3">
                  Giao diện trực quan
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Giao diện tinh tế giúp bạn quản lý công việc như một thiết kế
                  cao cấp, loại bỏ mọi sự rối mắt.
                </p>
                <img
                  className="mt-auto rounded-lg w-full h-50 object-cover"
                  data-alt="Abstract minimalist representation of a digital grid with soft shadows and calm blue tones."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuACBMulixcERgK8_KWXX53QBsp94hJCRf6S07oHWILwIZMRNVWoy94LAMkEbf_P8WeUgPULJrSjMcfapD2s01164qRYhieE_VUlP2SzkgASJHBFEVG6VnTthtiuLXZvxVUA8R7Z5SJXHQ1pYmYLYZ-baANvx6vUFlyGA6_kGwmyekDVUZht1ojrKcYLC49VHQZXNn8vLIx3dIiKrbGvmu5pyv0Aq1E2tLL3Fs0aqtFxTUdk_bQQae51DnHLo4Kfxqw8pPIl0QcjaQ"
                />
              </div>
              {/* <!-- Feature Card 2 --> */}
              <div className="bg-surface-container-lowest p-8 rounded-xl flex flex-col h-full hover:translate-y-[-4px] transition-transform duration-300">
                <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center text-primary mb-6">
                  <span
                    className="material-symbols-outlined"
                    data-icon="auto_awesome"
                  >
                    auto_awesome
                  </span>
                </div>
                <h3 className="font-headline text-xl font-bold text-on-surface mb-3">
                  Lập lịch thông minh
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Tự động sắp xếp công việc dựa trên mức độ ưu tiên và nhịp làm
                  việc của bạn.
                </p>
                <img
                  className="mt-auto rounded-lg w-full h-50 object-cover"
                  data-alt="Conceptual image of glowing nodes connected by ethereal light lines representing an intelligent network."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB81UqRC2hY1IKj-ObsSx5hlkvVE_SyYYwkXkc49Nf8wcAsMSz2HygRORRAXD0nKZ2wBOlLv2AFZ1woCGvEeLti-YBEcXYerSHYV5iBle7nZtDVteLoOcpgCFME4UHMX9GKZh0ofCnrwLyqbhvqo4m_H7Qn1cGKeAlxnvwCspmkdxp5eOlRMUdXnAtUhfMPKod2T134h5MkvL7uIO1rr1tQfeB0LVK6BPSu7L03nam7lCoMKCsrd4pEc7O2sNPo0I3--_456F1Afw"
                />
              </div>
              {/* <!-- Feature Card 3 --> */}
              <div className="bg-surface-container-lowest p-8 rounded-xl flex flex-col h-full hover:translate-y-[-4px] transition-transform duration-300">
                <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined" data-icon="group">
                    group
                  </span>
                </div>
                <h3 className="font-headline text-xl font-bold text-on-surface mb-3">
                  Làm việc nhóm
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Cộng tác dễ dàng, theo dõi tiến độ công việc theo thời gian
                  thực.
                </p>
                <img
                  className="mt-auto rounded-lg w-full h-50 object-cover"
                  data-alt="Soft-focus image of diverse professionals working together in a bright, modern open-plan office space."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzBjRASQTaqB71b23Hy0Am3yuxMjO99fk7_7axR3dfU2tUQiPEEYNtherqpny3R2HS1vw5bnTzGDiKMg0e0HviP012O31oZtUfZ2zzB6jsqJ3Nrjk6mAv549QNWP0Xa6WvQ_SSQ8SucTEemJQLWHwlnLETz9NLaR8KjmZFPI5rh7x6L1N10KxeFdD6iQ1Fa1Vaz_L1-bR98AROVLwlAedyJ8qa9Nr005na-p6Iuax4ROG12wQGZxSjfTBgdyramVKBzl3VZp455Q"
                />
              </div>
            </div>
          </div>
        </section>
        {/* <!-- How it Works: Step Process --> */}
        <section className="py-32 px-8 bg-surface">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight">
                Ba bước cốt lõi của hệ thống
              </h2>
            </div>
            <div className="space-y-24 relative">
              {/* <!-- Connector Line (Visual) --> */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-outline-variant/30 hidden md:block"></div>
              {/* <!-- Step 1 --> */}
              <div className="flex flex-col md:flex-row items-center gap-12 relative">
                <div className="flex-1 md:text-right">
                  <h3 className="font-headline text-2xl font-bold text-on-surface mb-4">
                    Ghi nhận
                  </h3>
                  <p className="text-secondary max-w-sm ml-auto">
                    Nhanh chóng ghi lại công việc, ý tưởng và ghi chú mà không
                    làm gián đoạn luồng làm việc.
                  </p>
                </div>
                <div className="w-16 h-16 bg-primary text-white font-headline text-2xl font-black flex items-center justify-center rounded-full z-10 shadow-xl shadow-primary/20">
                  1
                </div>
                <div className="flex-1">
                  <div className="bg-surface-container-low aspect-video rounded-2xl p-4 overflow-hidden">
                    <img
                      className="w-full h-full object-cover rounded-xl"
                      data-alt="A person's hands using a sleek smartphone to quickly type an idea in a bright, modern cafe setting."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkSd49nvNtgylV_arUJvZFk5BHTUyA2848YwH9z76ekPxJSE2NTJL-T7l8-ZqkWpPMOv5xNoYnz8dEuLXWachmwq-Sai7foLobfc_DP2CBcuCcdaRP2Auq1qxSNXAUVaOo3-xzEHXyMh8msg5QfbiGflQ5Cz3Y6wkHgJybF0WiilzjCD12IT7G5dylgSr0OFEpRcM_70Xh3A9RC23i5_QnwU9y7B45Bz7LRp1CKdn26Xt2xJ39kITl-GQqAaa3DjdeE2RVD9doJg"
                    />
                  </div>
                </div>
              </div>
              {/* <!-- Step 2 --> */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-12 relative">
                <div className="flex-1 text-left">
                  <h3 className="font-headline text-2xl font-bold text-on-surface mb-4">
                    Kích hoạt
                  </h3>
                  <p className="text-secondary max-w-sm">
                    Sắp xếp và ưu tiên các nhiệm vụ quan trọng để tối ưu hiệu
                    suất mỗi ngày.
                  </p>
                </div>
                <div className="w-16 h-16 bg-primary text-white font-headline text-2xl font-black flex items-center justify-center rounded-full z-10 shadow-xl shadow-primary/20">
                  2
                </div>
                <div className="flex-1">
                  <div className="bg-surface-container-low aspect-video rounded-2xl p-4 overflow-hidden">
                    <img
                      className="w-full h-full object-cover rounded-xl"
                      data-alt="Close-up of a digital calendar with colorful blocks representing a well-organized and focused daily schedule."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsIgLyp5-iX7O7WtNdWbOI9JbRy4Hcg5qzy511CaFENLBvgmqU6V726pAkRLsWjJBn3sv2izz4iibgKygBMgTUm-fEj8I7E_6q6U6SJnn1Q-FgH52VzIF8DNrqi5gfWeGMLgUoTZAKiXM4BFtyHBiFlyw4Bla70Z2hynTvFJ3nO4fQiTEB85ofaLrVbAPXXFHspKSEiyL1XcJnmurajf_qxiqU9x-emdboZJiSx5wrhc6WhMRcE04bE0UoyGDfGTAL0wrNqP_3Sw"
                    />
                  </div>
                </div>
              </div>
              {/* <!-- Step 3 --> */}
              <div className="flex flex-col md:flex-row items-center gap-12 relative">
                <div className="flex-1 md:text-right">
                  <h3 className="font-headline text-2xl font-bold text-on-surface mb-4">
                    Lưu trữ
                  </h3>
                  <p className="text-secondary max-w-sm ml-auto">
                    Lưu lại những công việc đã hoàn thành, giúp bạn theo dõi
                    hành trình năng suất của mình.
                  </p>
                </div>
                <div className="w-16 h-16 bg-primary text-white font-headline text-2xl font-black flex items-center justify-center rounded-full z-10 shadow-xl shadow-primary/20">
                  3
                </div>
                <div className="flex-1">
                  <div className="bg-surface-container-low aspect-video rounded-2xl p-4 overflow-hidden">
                    <img
                      className="w-full h-full object-cover rounded-xl"
                      data-alt="A stack of high-quality minimalist notebooks and a fountain pen on a clean, light wood desk."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGHcaz0xfyFVAqW0GxPBosYxlVcgkEmumM3WBJI7rBIzZS_YcZbI-QgqmLx0vFgaTbcReca_av8EmLRYW0XSRX_3dZOtUU4BDS9KsEpKJErYqMtaNge6tVXGz44Wd2ysssZNBLNTnkK_S9MjnoTRzdnh8_aNAAOhy0bKNNQnE03TiIgRVWjuJ4h8VkLoSaayC_hi23Vyi1DZybMeKXlJ0YOCAz0XKu07eER4wNt6WNIWi7tnLIRaR9P48t4JAH4dBZjPrRr-5JYQ"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Testimonial Section --> */}
        <section className="py-24 bg-surface-container-lowest px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-10 inline-flex text-tertiary">
              <span
                className="material-symbols-outlined"
                data-icon="star"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span
                className="material-symbols-outlined"
                data-icon="star"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span
                className="material-symbols-outlined"
                data-icon="star"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span
                className="material-symbols-outlined"
                data-icon="star"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span
                className="material-symbols-outlined"
                data-icon="star"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            </div>
            <blockquote className="font-headline text-2xl md:text-3xl font-bold italic text-on-surface leading-tight mb-10">
              "Velocity Flux đã thay đổi hoàn toàn cách chúng tôi làm việc. Đây
              không chỉ là một công cụ quản lý nhiệm vụ mà còn là một môi trường
              hỗ trợ sáng tạo."
            </blockquote>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-primary-fixed">
                <img
                  alt="Sarah Jensen"
                  className="w-full h-full object-cover"
                  data-alt="Portrait of a confident professional woman with a warm smile, neutral background."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlvcMBdp40UCsh7H1Yx9lejK4Cx7IFcVK0gEB7_q-R6-OgoQvA2SogaB4TfNaTfSSCYXdsjxPdvxEC6OGX-my8_n4siMWm_obpLo8G55rVxgZnpDxKzzi440-FU8LqrgAr4tdImvH7QK1ahZl7R9mHGvSb0TEhuZdDlDc6zqyZEzbU3hPIlyCxy5kulwPuAc68XiRbM6GqZX-yO8MubSSyOWyUH9fbXCchqHED_iaDdDvrty2z06dvtXen0S5r41fAyJqTJWOpuw"
                />
              </div>
              <cite className="not-italic">
                <span className="block font-bold text-on-surface font-headline">
                  Sarah Jensen
                </span>
                <span className="block text-secondary text-sm font-label uppercase tracking-widest">
                  Creative Director, Flux Media
                </span>
              </cite>
            </div>
          </div>
        </section>
        {/* <!-- Final CTA Section --> */}
        <section className="py-32 px-8">
          <div className="max-w-5xl mx-auto hero-gradient rounded-3xl p-12 md:p-24 text-center relative overflow-hidden bg-blue-700">
            {/* <!-- Abstract Texture --> */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg
                height="100%"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
                width="100%"
              >
                <circle cx="0" cy="0" fill="white" r="40"></circle>
                <circle cx="100" cy="100" fill="white" r="30"></circle>
              </svg>
            </div>
            <div className="relative z-10">
              <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-white mb-8">
                Sẵn sàng nâng tầm năng suất của bạn?
              </h2>
              <p className="text-primary-fixed text-lg mb-12 max-w-xl mx-auto">
                Tham gia cùng hơn 10.000 người dùng đã tổ chức công việc hiệu
                quả hơn và làm việc thông minh hơn.
              </p>
              <button className="px-10 py-5 bg-white text-primary font-bold text-lg rounded-full shadow-2xl hover:scale-105 transition-all duration-300">
                Bắt đầu dùng thử miễn phí
              </button>
              <p className="mt-6 text-primary-fixed-dim text-xs font-label">
                Không cần thẻ tín dụng. Dùng thử 14 ngày.
              </p>
            </div>
          </div>
        </section>
      </main>
      {/* <!-- Footer (Shared Component) --> */}
    </div>
  );
};

export default LandingPage;
