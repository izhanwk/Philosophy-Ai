"use client";

import Link, { LinkProps } from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useRouteTransition } from "./RouteTransitionProvider";

type AppLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> &
  LinkProps & {
    loadingLabel?: string;
  };

function isModifiedEvent(event: React.MouseEvent<HTMLAnchorElement>) {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

function resolveHref(href: AppLinkProps["href"]) {
  if (typeof href === "string") {
    return href;
  }

  const pathname = href.pathname ?? "";

  const query = href.query
    ? `?${new URLSearchParams(
        Object.entries(href.query).flatMap(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map((entry) => [key, String(entry)]);
          }

          if (value === undefined) {
            return [];
          }

          return [[key, String(value)]];
        }),
      ).toString()}`
    : "";
  const hash = href.hash ?? "";

  return `${pathname}${query}${hash}`;
}

export default function AppLink({
  href,
  onClick,
  loadingLabel,
  ...props
}: AppLinkProps) {
  const pathname = usePathname();
  const { startNavigation } = useRouteTransition();
  const resolvedHref = resolveHref(href);

  return (
    <Link
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        const currentHref = `${window.location.pathname}${window.location.search}`;
        if (
          event.defaultPrevented ||
          isModifiedEvent(event) ||
          props.target === "_blank" ||
          !resolvedHref.startsWith("/") ||
          resolvedHref.startsWith("#") ||
          resolvedHref === currentHref
        ) {
          return;
        }

        startNavigation(loadingLabel, resolvedHref);
      }}
    />
  );
}
