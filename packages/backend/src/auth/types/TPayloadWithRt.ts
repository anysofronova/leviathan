import { TPayload } from '.';

export type TPayloadWithRt = TPayload & { refreshToken: string };
