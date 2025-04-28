const errorHandler = (err) => {
    const errorCodes = {
        VALIDATION_ERROR: 'VALIDATION_ERROR',
        DATABASE_ERROR: 'DATABASE_ERROR',
        NETWORK_ERROR: 'NETWORK_ERROR',
    };

    const errorTypes = {
        VALIDATION_ERROR: {
            INVALID_ACCESS_KEY: 'INVALID_ACCESS_KEY',
            INVALID_SECRET_ACCESS_KEY: 'INVALID_SECRET_ACCESS_KEY',
        },
        CLOUD_ERROR: {
            CONNECTION_ERROR: 'CONNECTION_ERROR',
            QUERY_ERROR: 'QUERY_ERROR',
        },
        PERMISSION_ERROR: {
            IAM_PERMISSION_ERROR: "IAM_PERMISSION_ERROR",
            S3_PERMISSION_ERROR: "S3_PERMISSION_ERROR",
            EC2_PERMISSIOIN_ERROR: "EC2_PERMISSIOIN_ERROR"
        },
        DEPLOYMENT_ERROR: {
            DEPLOYMENT_TYPE_ERROR: "DEPLOYMENT_TYPE_ERROR"
        }
    };

    const errorMessage = (errorCode, errorType) => {
        switch (errorCode) {
            case errorCodes.VALIDATION_ERROR:
                switch (errorType) {
                    case errorTypes.VALIDATION_ERROR.INVALID_EMAIL:
                        return 'Invalid email address';
                    case errorTypes.VALIDATION_ERROR.INVALID_PASSWORD:
                        return 'Invalid password';
                    default:
                        return 'Unknown validation error';
                }
            case errorCodes.DATABASE_ERROR:
                switch (errorType) {
                    case errorTypes.DATABASE_ERROR.CONNECTION_ERROR:
                        return 'Database connection error';
                    case errorTypes.DATABASE_ERROR.QUERY_ERROR:
                        return 'Database query error';
                    default:
                        return 'Unknown database error';
                }
            default:
                return 'Unknown error';
        }
    };

    const errorCode = err.code;
    const errorType = err.type;

    console.error(`Error ${errorCode} (${errorType}): ${errorMessage(errorCode, errorType)}`);
};

errorHandler({ code: "VALIDATION_ERROR", type: "INVALID_ACCESS_KEY" })

module.exports = { errorHandler }