import * as I from "./interfaces";

export function lambdaResponse(code: number, body: string): I.LambdaResponse {
  console.log(`Responding with code ${code} and body ${body}`);
  return { statusCode: code, body: body || "" };
}

export async function logError(errorMsg: string): Promise<void> {
  console.error(errorMsg);
}
