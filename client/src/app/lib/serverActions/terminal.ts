"use server";

import logger from "@app/lib/logger";

export async function printInfo(msg: string): Promise<void> {
    logger.info(msg);
}

export async function printSuccess(msg: string): Promise<void> {
    logger.success(msg);
}

export async function printError(msg: string): Promise<void> {
    logger.error(msg);
}
