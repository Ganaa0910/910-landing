"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { LineArt } from "@/components/ui/line-art";

const PROJECT_TYPES = [
  "design system",
  "web application",
  "creative development",
  "brand identity",
  "other",
] as const;

const BUDGETS = [
  "< $5k",
  "$5k – $15k",
  "$15k – $50k",
  "$50k+",
  "not sure yet",
] as const;

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          projectType: data.get("projectType"),
          budget: data.get("budget"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to send");
      }

      setFormState("success");
      form.reset();
    } catch (err) {
      setFormState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (formState === "success") {
    return (
      <main className="relative flex min-h-screen items-center justify-center bg-base-black px-8 pt-14 overflow-hidden">
        <div className="pointer-events-none absolute -inset-20 -z-0">
          <LineArt
            variant="scribble"
            color="#14b8a6"
            strokeWidth={10}
            className="absolute -left-10 top-1/4 w-64 opacity-15"
            delay={0.3}
            loop
          />
          <LineArt
            variant="star"
            color="#14b8a6"
            strokeWidth={7}
            className="absolute right-20 top-1/3 w-20 opacity-25"
            delay={0.5}
          />
        </div>

        <div className="relative z-10 text-center">
          <span className="font-bebas text-8xl text-accent sm:text-9xl">*</span>
          <h1 className="mt-2 font-bebas text-6xl uppercase tracking-wide text-zinc-50 sm:text-7xl">
            message sent.
          </h1>
          <p className="mt-4 text-sm text-zinc-500">
            expect a response within 24 hours.
          </p>
          <Link
            href="/"
            className="cartoon-shadow mt-10 inline-block bg-base-black px-8 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-200"
          >
            back to home -&gt;
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base-black pt-14">
      {/* Hero */}
      <div className="relative mx-auto max-w-[1120px] px-8 pt-24 pb-16">
        <div className="pointer-events-none absolute -inset-20 -z-0">
          <LineArt
            variant="twist"
            color="#14b8a6"
            strokeWidth={10}
            className="absolute -right-10 top-10 w-72 opacity-15 sm:w-96"
            delay={0.3}
            loop
          />
          <LineArt
            variant="vertical"
            color="#e4e4e7"
            strokeWidth={7}
            className="absolute -left-16 top-0 h-[120%] opacity-8"
            delay={0.6}
          />
        </div>

        <p className="relative z-10 mb-6 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
          [ contact ]
        </p>
        <h1 className="relative z-10 font-bebas text-7xl uppercase tracking-wide text-zinc-50 sm:text-8xl lg:text-9xl">
          got an idea?
          <br />
          <span className="text-accent">spill it.</span>
        </h1>
      </div>

      {/* Info bar */}
      <div className="mx-auto max-w-[1120px] px-8 pb-16">
        <div className="flex flex-wrap gap-x-16 gap-y-4 text-xs">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">response time</span>
            <p className="mt-1 text-zinc-300">&lt; 24 hours</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">timezone</span>
            <p className="mt-1 text-zinc-300">utc+8</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">status</span>
            <p className="mt-1 text-accent">open for Q3 2026</p>
          </div>
        </div>
      </div>

      {/* Form — full width, not split layout */}
      <div className="relative mx-auto max-w-[1120px] px-8 pb-32">
        <LineArt
          variant="zigzag"
          color="#e4e4e7"
          strokeWidth={6}
          className="absolute -right-8 bottom-20 w-48 opacity-8 sm:w-64"
          delay={0.8}
        />

        <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
          {/* Name + Email row */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-3 block text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full border-b-2 border-zinc-800 bg-transparent pb-3 text-lg text-zinc-200 outline-none transition-colors placeholder:text-zinc-700 focus:border-accent"
                placeholder="your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-3 block text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full border-b-2 border-zinc-800 bg-transparent pb-3 text-lg text-zinc-200 outline-none transition-colors placeholder:text-zinc-700 focus:border-accent"
                placeholder="you@company.com"
              />
            </div>
          </div>

          {/* Project Type */}
          <div>
            <label className="mb-4 block text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              what do you need?
            </label>
            <div className="flex flex-wrap gap-2">
              {PROJECT_TYPES.map((type) => (
                <label key={type} className="group cursor-pointer">
                  <input type="radio" name="projectType" value={type} className="peer sr-only" />
                  <span className="cartoon-shadow-sm block bg-base-black px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 peer-checked:!border-accent peer-checked:!text-accent peer-checked:!shadow-[3px_3px_0px_#14b8a6]">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="mb-4 block text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              budget range
            </label>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((budget) => (
                <label key={budget} className="group cursor-pointer">
                  <input type="radio" name="budget" value={budget} className="peer sr-only" />
                  <span className="cartoon-shadow-sm block bg-base-black px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 peer-checked:!border-accent peer-checked:!text-accent peer-checked:!shadow-[3px_3px_0px_#14b8a6]">
                    {budget}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="mb-3 block text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              tell us everything
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full resize-none border-b-2 border-zinc-800 bg-transparent pb-3 text-lg text-zinc-200 outline-none transition-colors placeholder:text-zinc-700 focus:border-accent"
              placeholder="what are you building? what's the vision? what's the timeline?"
            />
          </div>

          {/* Error */}
          {formState === "error" && (
            <p className="text-xs text-error">{errorMsg}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={formState === "submitting"}
            className="cartoon-shadow-accent bg-accent px-12 py-5 font-bebas text-2xl uppercase tracking-wider text-base-black disabled:opacity-40"
          >
            {formState === "submitting" ? "sending..." : "send it"}
          </button>
        </form>
      </div>
    </main>
  );
}
