import { SetMetadata } from '@nestjs/common';
import { TokenType } from 'shared/src/authorization';

export const TOKENTYPE_KEY = 'tokenType';
export const EnforceTokenType = (tokenType: TokenType) => SetMetadata(TOKENTYPE_KEY, tokenType);
