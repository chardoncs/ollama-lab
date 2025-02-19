class CodeBlock extends HTMLPreElement {
  private static template = (() => {
    const t = document.createElement("template")
    t.shadowRootMode = "open"
    t.innerHTML = `
      <div class="codeblock">
        <div class="header font-sans">
          <span class="code-lang">
            <slot name="lang">plaintext</slot>
          </span>
          <div class="toolbar"></div>
        </div>
        <pre class="code-container">
          <slot name="content"></slot>
        </pre>
      </div>
    `

    return t.content
  })()

  public constructor() {
    super()

    const shadow = this.attachShadow({ mode: "open" })
    const root = CodeBlock.template.cloneNode(true)
    shadow.appendChild(root)

    const lang = this.getAttribute("data-lang")
    if (lang) {
      const codeLang = shadow.querySelector(".codeblock > .header > .code-lang")
      if (codeLang) {
        codeLang.innerHTML = lang
      }
    }
  }
}

customElements.define("code-block", CodeBlock)
