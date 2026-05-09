"use client";

import { useEffect } from "react";

interface SiteAnalyticsProps {
	googleAnalyticsId?: string;
	enableVercelAnalytics: boolean;
	enableVercelSpeedInsights: boolean;
}

declare global {
	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
}

const onIdle = (callback: () => void) => {
	if ("requestIdleCallback" in window) {
		window.requestIdleCallback(callback, { timeout: 3000 });
		return;
	}

	globalThis.setTimeout(callback, 2500);
};

const injectGoogleAnalytics = (gaId: string) => {
	window.dataLayer = window.dataLayer ?? [];
	window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
	window.gtag("js", new Date());
	window.gtag("config", gaId);

	const script = document.createElement("script");
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
	document.head.appendChild(script);
};

export function SiteAnalytics({
	googleAnalyticsId,
	enableVercelAnalytics,
	enableVercelSpeedInsights,
}: SiteAnalyticsProps) {
	useEffect(() => {
		onIdle(() => {
			if (googleAnalyticsId) {
				injectGoogleAnalytics(googleAnalyticsId);
			}

			if (enableVercelAnalytics) {
				void import("@vercel/analytics").then(({ inject }) => inject());
			}

			if (enableVercelSpeedInsights) {
				void import("@vercel/speed-insights").then(({ injectSpeedInsights }) =>
					injectSpeedInsights(),
				);
			}
		});
	}, [enableVercelAnalytics, enableVercelSpeedInsights, googleAnalyticsId]);

	return null;
}
