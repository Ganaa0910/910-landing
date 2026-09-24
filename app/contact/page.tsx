"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

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
      <main className="contact-page sent">
        <div className="contact-wrap">
          <p className="eyebrow">Received</p>
          <h1>
            That&rsquo;s <i>landed.</i>
          </h1>
          <p>
            We read every one of these ourselves — no queue, no triage desk.
            You&rsquo;ll hear back within 24 hours, usually sooner.
          </p>
          <Link className="back" href="/">
            ← Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="contact-page">
      <div className="contact-wrap">
        <p className="eyebrow">Contact</p>
        <h1>
          Tell us what you&rsquo;re
          <br />
          <i>building.</i>
        </h1>

        <div className="contact-meta">
          <div>
            <span>Response time</span>
            <p>Under 24 hours</p>
          </div>
          <div>
            <span>Timezone</span>
            <p>Ulaanbaatar · UTC+8</p>
          </div>
          <div>
            <span>Status</span>
            <p className="live">Accepting projects — Q3 2026</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate={false}>
          <div className="row2">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" required placeholder="Your name" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required placeholder="you@company.com" />
            </div>
          </div>

          <div className="field">
            <p className="label">What do you need?</p>
            <div className="chips">
              {PROJECT_TYPES.map((type) => (
                <label key={type}>
                  <input type="radio" name="projectType" value={type} />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="field">
            <p className="label">Budget range</p>
            <div className="chips">
              {BUDGETS.map((budget) => (
                <label key={budget}>
                  <input type="radio" name="budget" value={budget} />
                  <span>{budget}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="field">
            <label htmlFor="message">Tell us everything</label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder="What are you building? What's the vision? What's the timeline?"
            />
          </div>

          {formState === "error" && <p className="form-error">{errorMsg}</p>}

          <button type="submit" className="submit" disabled={formState === "submitting"}>
            {formState === "submitting" ? "Sending…" : "Send it →"}
          </button>
        </form>
      </div>
    </main>
  );
}
