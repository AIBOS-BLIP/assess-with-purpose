"use client";

import { useId, useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";

const RECIPIENT_EMAIL = "Ethancowan.Terblanche@nwu.ac.za";

// Formspree endpoint — no Vercel account, API key, or environment variable
// needed. Get this by going to https://formspree.io, entering the recipient
// email above, and clicking the confirmation link Formspree emails you.
// Paste the resulting form ID (the part after /f/) below. Until it's set,
// the form falls back to opening the visitor's own email app.
const FORMSPREE_FORM_ID = "mlgqkkbn";
const FORMSPREE_ENDPOINT = FORMSPREE_FORM_ID
  ? `https://formspree.io/f/${FORMSPREE_FORM_ID}`
  : null;

interface FormState {
  name: string;
  surname: string;
  email: string;
  phone: string;
  reason: string;
  consent: boolean;
}

const initialState: FormState = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  reason: "",
  consent: false,
};

function validate(state: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!state.name.trim()) errors.name = "Please enter your name.";
  if (!state.surname.trim()) errors.surname = "Please enter your surname.";
  if (!state.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!state.reason.trim()) errors.reason = "Please let us know why you're reaching out.";
  if (!state.consent) errors.consent = "Please confirm you're happy for us to use these details to respond.";
  return errors;
}

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

export default function ContactForm() {
  const idPrefix = useId();
  const [state, setState] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  function openMailtoFallback() {
    const subject = encodeURIComponent(`Assess with Purpose — message from ${state.name} ${state.surname}`);
    const body = encodeURIComponent(
      `Name: ${state.name} ${state.surname}\nEmail: ${state.email}\nPhone: ${state.phone || "—"}\n\n${state.reason}`
    );
    window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(state);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (!FORMSPREE_ENDPOINT) {
      // Not configured yet — fall back to the visitor's own email app.
      openMailtoFallback();
      setStatus("fallback");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: `${state.name} ${state.surname}`,
          email: state.email,
          phone: state.phone || "—",
          message: state.reason,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        return;
      }

      const data = await res.json().catch(() => ({}));
      setErrorMessage(
        data.errors?.[0]?.message || "Something went wrong sending your message."
      );
      setStatus("error");
    } catch {
      openMailtoFallback();
      setStatus("fallback");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-brand-teal/30 bg-brand-teal/5 p-4">
        <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-teal" />
        <div>
          <p className="text-sm font-semibold text-brand-teal">
            Your message has been sent.
          </p>
          <button
            type="button"
            onClick={() => {
              setState(initialState);
              setStatus("idle");
            }}
            className="mt-3 text-xs font-semibold text-brand-purple underline"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  if (status === "fallback") {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-brand-teal/30 bg-brand-teal/5 p-4">
        <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-teal" />
        <div>
          <p className="text-sm font-semibold text-brand-teal">
            Your email app should have opened with your message ready to send.
          </p>
          <p className="mt-1 text-xs text-brand-grey">
            If it didn&apos;t open, email us directly at{" "}
            <a href={`mailto:${RECIPIENT_EMAIL}`} className="underline">
              {RECIPIENT_EMAIL}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => {
              setState(initialState);
              setStatus("idle");
            }}
            className="mt-3 text-xs font-semibold text-brand-purple underline"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <p className="text-xs text-brand-grey">
        Your message is sent directly by email and is not stored anywhere
        else. Fields marked required.
      </p>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-lg border border-accent-red/40 bg-accent-red/5 p-3 text-xs text-foreground">
          <AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-red" />
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-name`} className="text-xs font-semibold uppercase tracking-wide text-brand-grey">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${idPrefix}-name`}
            value={state.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${idPrefix}-name-error` : undefined}
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          />
          {errors.name && (
            <p id={`${idPrefix}-name-error`} className="mt-1 text-xs text-accent-red">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${idPrefix}-surname`} className="text-xs font-semibold uppercase tracking-wide text-brand-grey">
            Surname <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${idPrefix}-surname`}
            value={state.surname}
            onChange={(e) => update("surname", e.target.value)}
            aria-invalid={Boolean(errors.surname)}
            aria-describedby={errors.surname ? `${idPrefix}-surname-error` : undefined}
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          />
          {errors.surname && (
            <p id={`${idPrefix}-surname-error`} className="mt-1 text-xs text-accent-red">
              {errors.surname}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${idPrefix}-email`} className="text-xs font-semibold uppercase tracking-wide text-brand-grey">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${idPrefix}-email`}
            type="email"
            value={state.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${idPrefix}-email-error` : undefined}
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          />
          {errors.email && (
            <p id={`${idPrefix}-email-error`} className="mt-1 text-xs text-accent-red">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${idPrefix}-phone`} className="text-xs font-semibold uppercase tracking-wide text-brand-grey">
            Phone number (optional)
          </label>
          <input
            id={`${idPrefix}-phone`}
            type="tel"
            value={state.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-reason`} className="text-xs font-semibold uppercase tracking-wide text-brand-grey">
          Reason for reaching out <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={`${idPrefix}-reason`}
          value={state.reason}
          onChange={(e) => update("reason", e.target.value)}
          rows={4}
          aria-invalid={Boolean(errors.reason)}
          aria-describedby={errors.reason ? `${idPrefix}-reason-error` : undefined}
          className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
        />
        {errors.reason && (
          <p id={`${idPrefix}-reason-error`} className="mt-1 text-xs text-accent-red">
            {errors.reason}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-2 text-xs text-foreground">
          <input
            type="checkbox"
            checked={state.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${idPrefix}-consent-error` : undefined}
            className="mt-0.5 size-4 shrink-0 accent-brand-purple"
          />
          <span>
            I understand my details will only be used to respond to this
            message, and will not be stored or shared for any other purpose.
          </span>
        </label>
        {errors.consent && (
          <p id={`${idPrefix}-consent-error`} className="mt-1 text-xs text-accent-red">
            {errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="hover-glow-sm flex items-center gap-2 rounded-full bg-brand-purple px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
      >
        {status === "sending" && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
