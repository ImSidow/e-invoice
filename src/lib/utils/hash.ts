import { createHash } from "crypto";

export const hash = async (text: string) => {
    const hash = createHash("sha256");
    hash.update(text);
    return hash.digest("hex");
};

export const compareHash = async (text: string, hashedText: string) => {
    return (await hash(text)) === hashedText;
};
