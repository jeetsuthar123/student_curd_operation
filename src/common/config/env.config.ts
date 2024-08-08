/* eslint-disable prettier/prettier */
import { plainToInstance } from 'class-transformer';
import { EnvConfig } from './env.schema';
import { validateSync } from 'class-validator';

const validate = (config: Record<string, unknown>) => {
    const validatedConfig = plainToInstance(
        EnvConfig,
        objectifyValues(config),
        {
            enableImplicitConversion: true,
        },
    );

    // validate the config values
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
        forbidUnknownValues: true,
    });

    // throw error if validation fails
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
};

function objectifyValues(config: Record<string, unknown>): EnvConfig {
    return {
        port: config.PORT as number,
        db: {
            connectionString: config.CONNECTION_STRING as string,
        },
        jwtConfig: {
            secret: config.JWT_SECRET as string,
            expiresIn: config.JWT_VALIDITY as string,
            issuer: config.JWT_ISSUER as string,
            audience: config.JWT_AUD as string,
            jwtResetPasswordSecret: config.JWT_RESET_PWD_SECRET as string,
            jwtResetPasswordExpiresIn: config.JWT_RESET_PWD_VALIDITY as string,
            refreshTokenExpiresIn: config.JWT_REFRESH_TOKEN_VALIDITY as string,
            refreshTokenSecret: config.JWT_REFRESH_TOKEN_SECRET as string,
        },
        // s3Config: {
        //     accessKeyId: config.AWS_S3_ACCESS_KEY_ID as string,
        //     secretAccessKey: config.AWS_S3_SECRET as string,
        //     bucketName: config.AWS_S3_BUCKET_NAME as string,
        //     region: config.AWS_S3_REGION as string,
        // },
    };
}

export { validate };
