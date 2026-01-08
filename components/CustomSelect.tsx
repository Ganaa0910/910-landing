"use client";

import { useState, useRef, useEffect, useId } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  accentColor: string;
  uiFont: string;
  label: string;
}

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select...",
  accentColor,
  uiFont,
  label,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerId = useId();
  const listboxId = useId();

  const selectedOption = options.find((opt) => opt.value === value);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      {/* Label */}
      <label
        htmlFor={triggerId}
        className="mb-1 block text-xs uppercase tracking-wider"
        style={{ color: accentColor, fontFamily: `var(${uiFont})` }}
      >
        {label}
      </label>

      {/* Trigger */}
      <button
        id={triggerId}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        className="flex w-full items-center justify-between bg-transparent px-3 py-2 text-left transition-colors"
        style={{
          border: `2px solid ${isOpen ? accentColor : `${accentColor}40`}`,
          fontFamily: `var(${uiFont})`,
          color: selectedOption ? "#fff" : `${accentColor}60`,
        }}
      >
        <span>{selectedOption?.label || placeholder}</span>
        <svg
          className="h-4 w-4 transition-transform"
          style={{
            color: accentColor,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto border-2 bg-black"
          style={{
            borderColor: accentColor,
            boxShadow: `0 4px 20px ${accentColor}30`,
          }}
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              tabIndex={0}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChange(option.value);
                  setIsOpen(false);
                }
              }}
              className="block w-full cursor-pointer px-3 py-2 text-left transition-colors"
              style={{
                fontFamily: `var(${uiFont})`,
                color: option.value === value ? accentColor : "#fff",
                backgroundColor: option.value === value ? `${accentColor}20` : "transparent",
              }}
              onMouseEnter={(e) => {
                if (option.value !== value) {
                  e.currentTarget.style.backgroundColor = `${accentColor}10`;
                }
              }}
              onMouseLeave={(e) => {
                if (option.value !== value) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
