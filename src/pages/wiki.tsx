import GetWikiPage from '@/hooks/getWikiPage'
import { sanitizeContent } from '@/libs/sanitizeContent'
import { useState, useRef, useEffect, useCallback } from 'react'

export default function Wiki() {
  const [currentPage, setCurrentPage] = useState('円周率')
  const [html, setHtml] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.scrollTo({ top: 0, behavior: 'smooth' })
    sanitizeContent(container)
  }, [html])

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href =
      'https://ja.wikipedia.org/w/load.php?modules=mediawiki.skinning.content.parsoid,mediawiki.skinning.interface&only=styles&skin=vector'
    document.head.appendChild(link)

    return () => {
      link.remove()
    }
  }, [])

  useEffect(() => {
    const prevHtml = document.documentElement.style.overflowY
    document.documentElement.style.overflowY = 'hidden'
    return () => {
      document.documentElement.style.overflowY = prevHtml
    }
  }, [])

  const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(e => {
    const target = e.target as HTMLElement
    const link = target.closest('a')
    if (!link) return

    e.preventDefault()
    const href = link.getAttribute('href') ?? ''
    const title = decodeURIComponent(href.split('/').pop() || '')
    if (title) setCurrentPage(title)
  }, [])

  return (
    <main ref={containerRef} className="flex h-screen w-full overflow-hidden" onClick={handleClick}>
      <GetWikiPage title={currentPage} onLoaded={setHtml} />
      <div className="mw-parser-output overflow-auto max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  )
}
