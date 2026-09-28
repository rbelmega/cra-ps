import assert from "node:assert/strict";
import test from "node:test";

async function loadMotionModule() {
	try {
		return await import("../src/app/(uk)/traffic-rules/motion.mjs");
	} catch {
		return null;
	}
}

test("Traffic Rules phone parallax stays subtle and bounded", async () => {
	const motion = await loadMotionModule();

	assert.equal(
		typeof motion?.calculateParallax,
		"function",
		"motion module should export calculateParallax",
	);
	assert.deepEqual(motion.calculateParallax(0, false), { phone: 0 });
	assert.deepEqual(motion.calculateParallax(320, false), { phone: -12.8 });
	assert.deepEqual(motion.calculateParallax(2000, false), { phone: -28 });
});

test("Traffic Rules parallax is disabled for reduced motion", async () => {
	const motion = await loadMotionModule();

	assert.equal(typeof motion?.calculateParallax, "function");
	assert.deepEqual(motion.calculateParallax(800, true), { phone: 0 });
});
