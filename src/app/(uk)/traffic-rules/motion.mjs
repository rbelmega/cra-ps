/**
 * @typedef {{ phone: number }} ParallaxOffsets
 */

const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);

/**
 * @param {number} scrollY
 * @param {boolean} reducedMotion
 * @returns {ParallaxOffsets}
 */
export function calculateParallax(scrollY, reducedMotion) {
	if (reducedMotion) {
		return { phone: 0 };
	}

	const safeScrollY = Number.isFinite(scrollY) ? Math.max(scrollY, 0) : 0;

	return {
		phone: safeScrollY === 0 ? 0 : clamp(-safeScrollY * 0.04, -28, 0),
	};
}
