export type FormSubmitResponseType<SchemaType> = {
    old?: SchemaType | null;
    status?: string;
    errors?: Record<string, string[]> | null;
    message?: string | null;
};
