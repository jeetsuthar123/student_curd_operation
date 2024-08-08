/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import {
    IsDefined,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';

/**
 * Represents the configuration for the database connection.
 */
export class DbConfig {
    /**
     * The connection string for the database.
     */
    @IsString()
    @IsNotEmpty()
    connectionString: string;
}

/**
 * Represents the configuration for JWT (JSON Web Token).
 */
export class JwtConfig {
    /**
     * The secret key used to sign the JWT.
     */
    @IsString()
    @IsNotEmpty()
    secret: string;

    /**
     * The expiration time for the JWT.
     */
    @IsString()
    @IsNotEmpty()
    expiresIn: string;

    /**
     * The issuer of the JWT.
     */
    @IsString()
    @IsNotEmpty()
    issuer: string;

    /**
     * The audience of the JWT.
     */
    @IsString()
    @IsNotEmpty()
    audience: string;

    /**
     * The secret key to sign reset passwords token.
     */
    @IsString()
    @IsNotEmpty()
    jwtResetPasswordSecret: string;

    /**
     * The expiration time for the JWT used for resetting passwords.
     */
    @IsString()
    @IsNotEmpty()
    jwtResetPasswordExpiresIn: string;

    @IsString()
    @IsNotEmpty()
    refreshTokenExpiresIn: string;

    @IsString()
    @IsNotEmpty()
    refreshTokenSecret: string;
}

/**
 * Represents the configuration for S3.
 */
export class S3Config {
    @IsString()
    @IsNotEmpty()
    accessKeyId: string;

    @IsString()
    @IsNotEmpty()
    secretAccessKey: string;

    @IsString()
    @IsNotEmpty()
    bucketName: string;

    @IsString()
    @IsNotEmpty()
    region: string;
}

/**
 * Represents the configuration for the environment.
 */
export class EnvConfig {
    /**
     * The port number for the server.
     */
    @IsNumber(
        {
            allowNaN: false,
            allowInfinity: false,
            maxDecimalPlaces: 0,
        },
        {
            message: 'Port must be an integer',
        },
    )
    @IsDefined({
        message: 'Port is required',
    })
    port: number;

    /**
     * The configuration for the database.
     */
    @ValidateNested()
    @IsDefined()
    @Type(() => DbConfig)
    db: DbConfig;

    /**
     * The configuration for JWT (JSON Web Tokens).
     */
    @ValidateNested()
    @IsDefined()
    @Type(() => JwtConfig)
    jwtConfig: JwtConfig;

    /**
     * The configuration for S3.
     */
    // @ValidateNested()
    // @IsDefined()
    // @Type(() => S3Config)
    // s3Config: S3Config;
}
