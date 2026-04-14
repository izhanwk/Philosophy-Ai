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
import { usePathname, useSearchParams } from "next/navigation";
import ThemeLoader from "./ThemeLoader";

type RouteTransitionContextValue = {
  isNavigating: boolean;
  startNavigation: (label?: string) => void;
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

export function RouteTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [label, setLabel] = useState(DEFAULT_LABEL);
  const search = searchParams?.toString() ?? "";

  useEffect(() => {
    setIsNavigating(false);
    setLabel(DEFAULT_LABEL);
  }, [pathname, search]);

  const startNavigation = useCallback((nextLabel = DEFAULT_LABEL) => {
    setLabel(nextLabel);
    setIsNavigating(true);
  }, []);

  const push = useCallback(
    (
      router: AppRouterInstance,
      href: string,
      options?: NavigateOptions,
      nextLabel?: string,
    ) => {
      startNavigation(nextLabel);
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
      startNavigation(nextLabel);
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
