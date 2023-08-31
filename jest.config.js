const nextJest = require('next/jest');

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
	setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
	testEnvironment: 'jest-environment-jsdom',
	reporters: [
		'default',
		['jest-junit', {outputDirectory: 'coverage', outputName: 'report.xml'}],
	],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async

module.exports = createJestConfig(customJestConfig);
