"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AppRouterInstance,
  NavigateOptions,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";
import ThemeLoader from "./ThemeLoader";

type RouteTransitionContextValue = {
  isNavigating: boolean;
  startNavigation: (label?: string, targetHref?: string) => void;
  push: (
    router: AppRouterInstance,
    href: string,
    options?: NavigateOptions,
    label?: string,
  ) => void;
  replace: (
    router: AppRouterInstance,
    href: string,
    options?: NavigateOptions,
    label?: string,
  ) => void;
};

const DEFAULT_LABEL = "Loading...";

const RouteTransitionContext =
  createContext<RouteTransitionContextValue | null>(null);

function getCurrentHref() {
  return `${window.location.pathname}${window.location.search}`;
}

export function RouteTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [label, setLabel] = useState(DEFAULT_LABEL);
  const [targetHref, setTargetHref] = useState<string | null>(null);

  useEffect(() => {
    setIsNavigating(false);
    setLabel(DEFAULT_LABEL);
    setTargetHref(null);
  }, [pathname]);

  useEffect(() => {
    if (!isNavigating || !targetHref) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (getCurrentHref() === targetHref) {
        setIsNavigating(false);
        setLabel(DEFAULT_LABEL);
        setTargetHref(null);
      }
    }, 100);

    return () => window.clearInterval(intervalId);
  }, [isNavigating, targetHref]);

  const startNavigation = useCallback(
    (nextLabel = DEFAULT_LABEL, nextHref?: string) => {
      setLabel(nextLabel);
      setTargetHref(nextHref ?? null);
      setIsNavigating(true);
    },
    [],
  );

  const push = useCallback(
    (
      router: AppRouterInstance,
      href: string,
      options?: NavigateOptions,
      nextLabel?: string,
    ) => {
      startNavigation(nextLabel, href);
      router.push(href, options);
    },
    [startNavigation],
  );

  const replace = useCallback(
    (
      router: AppRouterInstance,
      href: string,
      options?: NavigateOptions,
      nextLabel?: string,
    ) => {
      startNavigation(nextLabel, href);
      router.replace(href, options);
    },
    [startNavigation],
  );

  const value = useMemo(
    () => ({
      isNavigating,
      startNavigation,
      push,
      replace,
    }),
    [isNavigating, push, replace, startNavigation],
  );

  return (
    <RouteTransitionContext.Provider value={value}>
      {isNavigating ? <ThemeLoader label={label} /> : null}
      {children}
    </RouteTransitionContext.Provider>
  );
}

export function useRouteTransition() {
  const context = useContext(RouteTransitionContext);

  if (!context) {
    throw new Error(
      "useRouteTransition must be used within a RouteTransitionProvider",
    );
  }

  return context;
}
