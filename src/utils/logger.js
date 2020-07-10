export const Logger = (fileName, functionName) => {
    console.log('============ [START REPORT] ============');
    console.info(`File: ${fileName}`);
    console.info(`Function: ${functionName}`);
    const logError = (errorMsg, additionalInfoMsg) => {
    console.info(`Type: Error`);
    console.error(`Message: ${errorMsg}`);
    console.info('Additional Info:', additionalInfoMsg);
    console.log('============ [END REPORT] ============');
    }

    return {
        logError,
    }
}