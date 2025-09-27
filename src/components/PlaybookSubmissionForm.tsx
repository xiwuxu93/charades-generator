"use client";

import { useState } from "react";

interface PlaybookSubmissionFormProps {
  email: string;
  formCopy: {
    nameLabel: string;
    emailLabel: string;
    scenarioLabel: string;
    playersLabel: string;
    difficultyLabel: string;
    detailsLabel: string;
    permissionLabel: string;
    submit: string;
    subject: string;
    mailtoIntro: string;
    scenarioPlaceholder: string;
    playersPlaceholder: string;
    detailsPlaceholder: string;
    confirmation: string;
  };
}

export default function PlaybookSubmissionForm({ email, formCopy }: PlaybookSubmissionFormProps) {
  const [name, setName] = useState("");
  const [replyEmail, setReplyEmail] = useState("");
  const [scenario, setScenario] = useState("");
  const [players, setPlayers] = useState("");
  const [favouriteDifficulty, setFavouriteDifficulty] = useState("");
  const [details, setDetails] = useState("");
  const [allowPublish, setAllowPublish] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const lines = [
      formCopy.mailtoIntro,
      "",
      `Name: ${name || "(not provided)"}`,
      `Reply-to: ${replyEmail || "(not provided)"}`,
      `Scenario: ${scenario || "(not provided)"}`,
      `Group size: ${players || "(not provided)"}`,
      `Favourite categories/difficulties: ${favouriteDifficulty || "(not provided)"}`,
      "",
      "Playbook details:",
      details || "(please add details here)",
      "",
      allowPublish ? "Permission granted to feature this playbook." : "Do not publish without checking back with me.",
    ];

    const mailto = `mailto:${email}?subject=${encodeURIComponent(formCopy.subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    if (typeof window !== "undefined") {
      window.location.href = mailto;
      setSubmitted(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {formCopy.nameLabel}
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {formCopy.emailLabel}
          <input
            type="email"
            value={replyEmail}
            onChange={(event) => setReplyEmail(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {formCopy.scenarioLabel}
          <input
            type="text"
            value={scenario}
            placeholder={formCopy.scenarioPlaceholder}
            onChange={(event) => setScenario(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {formCopy.playersLabel}
          <input
            type="text"
            value={players}
            placeholder={formCopy.playersPlaceholder}
            onChange={(event) => setPlayers(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {formCopy.difficultyLabel}
          <input
            type="text"
            value={favouriteDifficulty}
            onChange={(event) => setFavouriteDifficulty(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {formCopy.detailsLabel}
          <textarea
            value={details}
            placeholder={formCopy.detailsPlaceholder}
            onChange={(event) => setDetails(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
          />
        </label>
      </div>
      <label className="flex items-start gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={allowPublish}
          onChange={(event) => setAllowPublish(event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span>{formCopy.permissionLabel}</span>
      </label>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          {formCopy.submit}
        </button>
        {submitted && (
          <span aria-live="polite" className="text-xs text-gray-500">
            {formCopy.confirmation}
          </span>
        )}
      </div>
    </form>
  );
}
