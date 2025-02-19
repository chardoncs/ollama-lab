import type { Token } from "markdown-it/index.js"

export type ComponentBlock =
  | {
    type: "paragraph",
    children: ComponentBlock[],
  }
  | {
    type: "blockquote",
    children: ComponentBlock[],
  }
  | {
    type: "text",
    content: string,
  }
  | {
    type: "link",
    href?: string,
    content: string,
  }

type ChildParsingResult = [ComponentBlock[], boolean, number]
type InnerTextParsingResult = [string, boolean, number]

function readText(start: number, tokens: Token[], closeToken: string): InnerTextParsingResult {
  let content = ""
  let j = start + 1;

  p_loop: for (; j < tokens.length; j++) {
    const innerToken = tokens[j]

    switch (innerToken.type) {
      case closeToken:
        if (!content) {
          return ["", false, start]
        }
        start = j
        break p_loop

      case "text":
        content = innerToken.content
        break

      default:
        break
    }
  }

  return [content, true, j]
}

function readChildren(start: number, tokens: Token[], closeToken: string): ChildParsingResult {
  let children: ComponentBlock[] = []
  let j = start + 1;

  p_loop: for (; j < tokens.length; j++) {
    const innerToken = tokens[j]

    switch (innerToken.type) {
      case closeToken:
        if (children.length < 1) {
          return [[], false, start]
        }
        start = j
        break p_loop

      case "inline":
        if (innerToken.children) {
          children.push(...convertTokenList(innerToken.children))
        }
        break

      case "text":
        children.push({
          type: "text",
          content: innerToken.content,
        })
        break

      default:
        break
    }
  }

  return [children, true, j]
}

export function* convertTokenList(tokens: Token[]): Generator<ComponentBlock, void, unknown> {
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]

    let curBlock: ComponentBlock | null = null

    switch (token.type) {
      case "paragraph_open":
        curBlock = {
          type: "paragraph",
          children: [],
        }

        {
          const [children, notEmpty, end] = readChildren(i, tokens, "paragraph_close")
          if (!notEmpty) {
            curBlock = null
          } else {
            curBlock.children = children
            i = end
          }
        }

        break

      case "blockquote_open":
        curBlock = {
          type: "blockquote",
          children: [],
        }

        {
          const [children, notEmpty, end] = readChildren(i, tokens, "blockquote_close")
          if (!notEmpty) {
            curBlock = null
          } else {
            curBlock.children = children
            i = end
          }
        }

        break

      case "link_open":
        curBlock = {
          type: "link",
          content: "",
        }

        const [content, _, end] = readText(i, tokens, "link_close")
        curBlock.content = content
        i = end

        break
    
      // TODO: Handling more tokens!

      case "text":
        curBlock = {
          type: "text",
          content: token.content,
        }
        break

      case "inline":
        if (token.children) {
          for (const nested of convertTokenList(token.children)) {
            yield nested
          }
        }
        break

      default:
        break
    }

    if (curBlock) {
      yield curBlock
      curBlock = null
    }
  }
}
