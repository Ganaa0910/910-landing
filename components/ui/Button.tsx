"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold disabled:pointer-events-none disabled:opacity-50 outline-none",
  {
    variants: {
      variant: {
        default:
          "relative bg-gradient-to-b from-accent-500 to-accent-600 text-white border-2 border-base-black active:from-accent-600 active:to-accent-700 rounded-md shadow-[4px_4px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_rgba(255,255,255,1)] active:shadow-[2px_2px_0px_rgba(255,255,255,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,1)] dark:hover:shadow-[6px_6px_0px_rgba(255,255,255,1)] dark:active:shadow-[2px_2px_0px_rgba(255,255,255,1)] transition-shadow duration-200",
        outline:
          "bg-transparent text-accent-500 border-2 border-accent-500 active:bg-accent-500/10 rounded-md shadow-[4px_4px_0px_rgba(15,118,110,0.5)] hover:shadow-[6px_6px_0px_rgba(15,118,110,0.5)] active:shadow-[2px_2px_0px_rgba(15,118,110,0.5)] dark:shadow-[4px_4px_0px_rgba(115,115,115,0.8)] dark:hover:shadow-[6px_6px_0px_rgba(115,115,115,0.8)] dark:active:shadow-[2px_2px_0px_rgba(115,115,115,0.8)] transition-shadow",
        ghost:
          "text-gray-800 hover:bg-gray-200 hover:text-accent-600 active:bg-gray-300 rounded-md dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-accent-500 dark:active:bg-gray-900 transition-colors",
        secondary:
          "bg-gray-100 text-base-black border-2 border-base-black active:bg-gray-300 rounded-md shadow-[4px_4px_0px_rgba(10,10,10,1)] hover:shadow-[6px_6px_0px_rgba(10,10,10,1)] active:shadow-[2px_2px_0px_rgba(10,10,10,1)] dark:bg-gray-800 dark:text-gray-100 dark:border-gray-300 dark:shadow-[4px_4px_0px_rgba(115,115,115,1)] dark:hover:shadow-[6px_6px_0px_rgba(115,115,115,1)] dark:active:shadow-[2px_2px_0px_rgba(115,115,115,1)] dark:active:bg-gray-700 transition-shadow",
        glow: "bg-gradient-to-b from-purple-500 to-purple-600 text-white rounded-lg shadow-none hover:shadow-[0_0_60px_rgba(168,85,247,0.8),0_0_120px_rgba(255,255,255,0.4)] hover:[text-shadow:0_0_20px_rgba(255,255,255,0.8),0_0_40px_rgba(216,180,254,0.6)] active:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300",
      },
      size: {
        sm: "h-10 px-4 text-xs",
        md: "h-12 px-5 text-sm",
        lg: "h-14 px-7 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref,
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const isMagnetic = variant === "default" || variant === undefined;

    React.useImperativeHandle(ref, () => buttonRef.current!);

    React.useEffect(() => {
      if (!isMagnetic || !buttonRef.current) return;

      const button = buttonRef.current;
      const strength = 20;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = rect.width;

        if (distance < maxDistance) {
          const intensity = 1 - distance / maxDistance;
          const moveX = (deltaX / maxDistance) * strength * intensity;
          const moveY = (deltaY / maxDistance) * strength * intensity;

          gsap.to(button, {
            x: moveX,
            y: moveY,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      };

      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, [isMagnetic]);

    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={buttonRef}
        {...props}
      >
        {iconLeft && <span className="inline-flex shrink-0">{iconLeft}</span>}
        {children}
        {iconRight && <span className="inline-flex shrink-0">{iconRight}</span>}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
