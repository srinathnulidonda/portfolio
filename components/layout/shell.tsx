// components/layout/shell.tsx
import Nav from "./nav";
import Footer from "./footer";
import ChatWidget from "@/components/chat/chat-widget";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="fixed left-[max(1rem,env(safe-area-inset-left))] top-[max(0.75rem,env(safe-area-inset-top))] z-100 inline-flex h-11 -translate-y-24 items-center whitespace-nowrap rounded-full bg-primary px-5 text-sm font-medium text-on-primary shadow-[0_8px_30px_rgb(0_0_0/0.15)] focus:translate-y-0"
      >
        Skip to main content
      </a>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}