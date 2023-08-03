import { PaginationInput, RemoveResult } from "./types.js";

export abstract class BaseDomainItem<Persistant = unknown, DTO = Persistant> {
  protected persistant: Persistant;

  constructor(persistant: Persistant) {
    this.persistant = persistant;
  }

  abstract get dto(): Readonly<DTO>;
}

/** This provide a simple way to transform multiple domain item to DTO, reduce the controller layer's code */
export class DomainArray<
  TItem extends BaseDomainItem = BaseDomainItem,
> extends Array<TItem> {
  static from<TItem2 extends BaseDomainItem = BaseDomainItem>(
    arr: ArrayLike<TItem2>,
  ) {
    return new DomainArray(...super.from(arr));
  }

  get dtos() {
    return this.map((domain) => domain.dto);
  }
}

export abstract class BaseService<TItem extends BaseDomainItem> {
  /** Save domain item */
  abstract saveItem(item: TItem): Promise<TItem>;

  /** Update item by raw data */
  abstract updateItem(...args: unknown[]): Promise<TItem>;

  abstract createItem(...args: unknown[]): Promise<TItem>;

  abstract getItem(...args: unknown[]): Promise<TItem | undefined>;

  abstract getItems(
    paginationInput: PaginationInput,
    ...args: unknown[]
  ): Promise<{ items: DomainArray<TItem>; cursor: string | null }>;

  abstract removeItem(...args: unknown[]): Promise<RemoveResult>;
}
