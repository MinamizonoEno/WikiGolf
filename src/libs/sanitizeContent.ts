const DISABLED_SECTION_IDS = ['脚注']

export function sanitizeContent(container: HTMLDivElement | null) {
  if (!container) return

  // 不要な要素（カテゴリーとnavbox）を削除
  container.querySelectorAll('.mw-category-generated, .navbox').forEach(el => el.remove())

  // 特定のセクション内のリンクを無効化
  DISABLED_SECTION_IDS.forEach(id => {
    const head = container.querySelector<HTMLElement>(`[id="${id}"]`)
    const section = head?.closest('section')
    if (!section) return
    section.querySelectorAll('a').forEach(a => {
      const span = document.createElement('span')
      span.innerHTML = a.innerHTML
      span.className = a.className
      a.replaceWith(span)
    })
  })
}
