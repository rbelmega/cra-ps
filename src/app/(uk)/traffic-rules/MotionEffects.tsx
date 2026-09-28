"use client";

import { useEffect } from "react";

import { calculateParallax } from "./motion.mjs";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

export function MotionEffects() {
	useEffect(() => {
		const root = document.querySelector<HTMLElement>("[data-motion-root]");

		if (!root) {
			return;
		}

		const revealElements = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
		const motionPreference = window.matchMedia(reducedMotionQuery);
		let animationFrame = 0;
		let observer: IntersectionObserver | null = null;

		const revealAll = () => {
			for (const element of revealElements) {
				element.dataset.visible = "true";
			}
		};

		const updateParallax = () => {
			animationFrame = 0;
			const offsets = calculateParallax(window.scrollY, motionPreference.matches);

			root.style.setProperty("--phone-parallax", `${offsets.phone}px`);
		};

		const requestParallaxUpdate = () => {
			if (!animationFrame) {
				animationFrame = window.requestAnimationFrame(updateParallax);
			}
		};

		if (motionPreference.matches || !("IntersectionObserver" in window)) {
			revealAll();
		} else {
			observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) {
							(entry.target as HTMLElement).dataset.visible = "true";
							observer?.unobserve(entry.target);
						}
					}
				},
				{ rootMargin: "0px 0px -10%", threshold: 0.12 },
			);

			for (const element of revealElements) {
				observer.observe(element);
			}
		}

		const handleMotionPreferenceChange = () => {
			if (motionPreference.matches) {
				observer?.disconnect();
				revealAll();
			}

			updateParallax();
		};

		root.dataset.motionReady = "true";
		updateParallax();
		window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
		motionPreference.addEventListener("change", handleMotionPreferenceChange);

		return () => {
			observer?.disconnect();
			window.removeEventListener("scroll", requestParallaxUpdate);
			motionPreference.removeEventListener("change", handleMotionPreferenceChange);

			if (animationFrame) {
				window.cancelAnimationFrame(animationFrame);
			}
		};
	}, []);

	return null;
}
