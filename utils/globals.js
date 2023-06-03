export const testResults = {};

export function setTestResult(testId, result) {
	testResults[testId] = result;
}

export function getTestResult(testId) {
	console.log(testResults);
	return testResults[testId];
}
