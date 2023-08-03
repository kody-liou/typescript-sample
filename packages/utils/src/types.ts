import type { QuestionDTO } from "@core/question.js";
import {
  LanguageCode,
  CountryCode,
  surportedLocales,
  userGenders,
  questionCategories,
} from "./constants.js";

type RemoveResult = { success: boolean };

type PaginationInput = { limit?: number; cursor?: string };

type InsertItemResult<T> = { item: T; nextItemId?: string };

type SelectItem<TValue extends string = string> = {
  text: string;
  value: TValue;
  selectItems?: SelectItem;
};

type SelectItemMetadata<TValue extends string = string> = {
  [value in TValue]: SelectItem<TValue>;
};

type LocaleCode = `${LanguageCode}_${CountryCode}`;

type SurportedLocale = (typeof surportedLocales)[number];

type UserGender = (typeof userGenders)[number];

export const aa: QuestionDTO = {};

type QuestionCategory = (typeof questionCategories)[number];

export {
  QuestionDTO,
  RemoveResult,
  PaginationInput,
  InsertItemResult,
  SelectItem,
  SelectItemMetadata,
  LocaleCode,
  SurportedLocale,
  UserGender,
  QuestionCategory,
};
