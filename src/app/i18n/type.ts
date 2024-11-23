import {
  Formats,
  MessageKeys,
  NamespaceKeys,
  NestedKeyOf,
  NestedValueOf,
  RichTranslationValues,
  TranslationValues,
} from 'next-intl';
import { ReactElement, ReactNode } from 'react';

export interface TFunction<
  NestedKey extends NamespaceKeys<
    IntlMessages,
    NestedKeyOf<IntlMessages>
  > = never,
> {
  <
    TargetKey extends MessageKeys<
      NestedValueOf<
        {
          '!': IntlMessages;
        },
        [NestedKey] extends [never] ? '!' : `!.${NestedKey}`
      >,
      NestedKeyOf<
        NestedValueOf<
          {
            '!': IntlMessages;
          },
          [NestedKey] extends [never] ? '!' : `!.${NestedKey}`
        >
      >
    >,
  >(
    key: TargetKey,
    values?: TranslationValues,
    formats?: Partial<Formats>,
  ): string;
  rich<
    TargetKey extends MessageKeys<
      NestedValueOf<
        {
          '!': IntlMessages;
        },
        [NestedKey] extends [never] ? '!' : `!.${NestedKey}`
      >,
      NestedKeyOf<
        NestedValueOf<
          {
            '!': IntlMessages;
          },
          [NestedKey] extends [never] ? '!' : `!.${NestedKey}`
        >
      >
    >,
  >(
    key: TargetKey,
    values?: RichTranslationValues,
    formats?: Partial<Formats>,
  ): string | ReactElement | ReactNode;
  raw<
    TargetKey extends MessageKeys<
      NestedValueOf<
        {
          '!': IntlMessages;
        },
        [NestedKey] extends [never] ? '!' : `!.${NestedKey}`
      >,
      NestedKeyOf<
        NestedValueOf<
          {
            '!': IntlMessages;
          },
          [NestedKey] extends [never] ? '!' : `!.${NestedKey}`
        >
      >
    >,
  >(
    key: TargetKey,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any;
}
