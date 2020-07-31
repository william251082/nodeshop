import * as path from "path";

declare global {
    namespace NodeJS {
        interface Process {
            mainModule: {filename: string};
        }
    }
}

export const rootDir = path.dirname(process.mainModule.filename);