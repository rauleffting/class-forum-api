export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string) {
    return new Slug(slug)
  }

  /**
   * Receives a string and normalize it as a slug.
   *
   * Example: "An example title" => "an-example-title"
   *
   * @param text {string}
   */
  static createFromText(text: string): Slug {
    const slugText = text
      .normalize('NFKD') // remove accent from string
      .toLowerCase()
      .trim() // remove white spaces from start and end
      .replace(/\s+/g, '-') // remove white space
      .replace(/[^\w-]+/g, '') // remove all that isn't a letter
      .replace(/_/g, '-') // change underline by hyphen
      .replace(/--+/g, '-') // change two hyphens by one hyphen
      .replace(/-$/g, '') // remove hyphen from the end of the string

    return new Slug(slugText)
  }
}
