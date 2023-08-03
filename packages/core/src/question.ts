import { Entity, EntityConfiguration, EntityItem } from "electrodb";
import { BaseDomainItem, BaseService, DomainArray } from "@utils/services.js";
import type { PaginationInput, QuestionCategory } from "@utils/types.js";
import {
  DBGSI,
  DBKeys,
  EntityName,
  ServiceName,
  questionCategories,
} from "@utils/constants.js";

const getQuestionRepository = (entityConfiguration: EntityConfiguration) =>
  new Entity(
    {
      model: {
        version: "1",
        entity: EntityName.Question,
        service: ServiceName.Question,
      },
      attributes: {
        questionID: {
          type: "string",
          required: true,
          readOnly: true,
        },
        category: {
          type: questionCategories,
          required: true,
        },
        // If this question been displayed in current question list (for all user to answer), this lastUsedAt will update.
        // The current question list is create by CORN job ramdomly
        lastUsedAt: {
          type: "number",
          required: true,
        },
      },
      indexes: {
        byID: {
          pk: {
            field: DBKeys.pk,
            composite: [],
          },
          sk: {
            field: DBKeys.sk,
            composite: ["questionID"],
          },
        },
        newQuestion: {
          index: DBGSI.gsi1,
          pk: {
            field: DBKeys.gsi1pk,
            composite: ["category"],
          },
          sk: {
            field: DBKeys.gsi1sk,
            composite: ["lastUsedAt"],
          },
        },
      },
    },
    entityConfiguration,
  );

type QuestionRepository = ReturnType<typeof getQuestionRepository>;

type QuestionPersistant = EntityItem<QuestionRepository>;
class Question extends BaseDomainItem<QuestionPersistant> {
  get dto() {
    return Object.freeze(this.persistant);
  }
}
export type QuestionDTO = Readonly<Question["dto"]>;

export class QuestionService implements BaseService<Question> {
  #repository: QuestionRepository;

  constructor(repository: QuestionRepository) {
    this.#repository = repository;
  }

  saveItem(item: Question): Promise<Question> {
    const { questionID, category, lastUsedAt } = item.dto;
    return this.updateItem(questionID, category, lastUsedAt);
  }

  async updateItem(
    questionID: string,
    category?: QuestionCategory,
    lastUsedAt?: number,
  ) {
    const result = await this.#repository
      .patch({ questionID })
      .set({ category, lastUsedAt })
      .go({ response: "all_new" });
    return new Question(result.data);
  }

  async createItem(questionID: string, category: QuestionCategory) {
    const result = await this.#repository
      .create({
        questionID,
        category,
        lastUsedAt: Date.now(),
      })
      .go();
    return new Question(result.data);
  }

  async getItem(questionID: string) {
    const result = await this.#repository.get({ questionID }).go();
    return result.data ? new Question(result.data) : undefined;
  }

  async getItems(
    { cursor, limit = 100 }: PaginationInput,
    category: QuestionCategory,
    fromLastUsedAt?: number,
    toLastUsedAt?: number,
  ) {
    const result = await this.#repository.query
      .newQuestion({ category })
      .between({ lastUsedAt: fromLastUsedAt }, { lastUsedAt: toLastUsedAt })
      .go({ limit, cursor });
    return {
      items: DomainArray.from(result.data.map((data) => new Question(data))),
      cursor: result.cursor,
    };
  }

  async removeItem(questionID: string) {
    await this.#repository.remove({ questionID }).go();
    return { success: true };
  }
}
