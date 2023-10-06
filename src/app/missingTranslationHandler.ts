import { Injectable } from '@angular/core';
import { MissingTranslationHandlerParams, MissingTranslationHandler } from '@ngx-translate/core';

@Injectable()
export class SystemMissingTranslationHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams): string {
      return params.key;
    }
}
