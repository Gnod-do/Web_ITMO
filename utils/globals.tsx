export const testResults: any = {};

export function setTestResult(testId: string, result: string | number) {
	testResults[testId] = result;
}

export function getTestResult(testId: string) {
	console.log(testResults);
	return testResults[testId];
}
