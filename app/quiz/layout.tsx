"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { QuizProvider } from "@/context/quiz-context";
import { quizQuestions } from "@/lib/quiz-config";
import Logo from "@/components/Logo";

const TOTAL_STEPS = quizQuestions.length + 1; // + contact form step

function getCurrentStep(pathname: string): number {
  const stepMatch = pathname.match(/\/quiz\/(\d+)$/);
  if (stepMatch) return Number(stepMatch[1]);
  if (pathname.endsWith("/contact")) return quizQuestions.length + 1;
  if (pathname.endsWith("/thank-you")) return TOTAL_STEPS;
  return 1;
}

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isThankYou = pathname.endsWith("/thank-you");
  const currentStep = getCurrentStep(pathname);
  const progress = Math.min(100, Math.round((currentStep / TOTAL_STEPS) * 100));

  return (
    <QuizProvider>
      <div className="flex min-h-screen flex-col bg-white">
        <header className="flex items-center justify-between px-6 py-4">
          <Logo />
          <Link
            href="/"
            className="rounded-lg bg-[#3653e3] px-5 py-2.5 text-sm font-black uppercase text-white"
          >
            Learn more
          </Link>
        </header>

        {!isThankYou && (
          <div className="px-6">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-[#3653e3] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <main className="mx-auto w-full max-w-md flex-1 px-6 py-8 lg:max-w-3xl">{children}</main>
      </div>
    </QuizProvider>
  );
}
