export class Store<Type> {
  #data: Map<string, Type>;

  constructor() {
    this.#data = new Map<string, Type>();
  }

  get(id: string) {
    return this.#data.get(id);
  }

  set(id: string, value: Type) {
    this.#data.set(id, value);
  }
}