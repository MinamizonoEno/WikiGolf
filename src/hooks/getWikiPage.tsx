import { useEffect } from 'react'

interface Props {
  title: string
  onLoaded: (html: string) => void
}

export default function GetWikiPage({ title, onLoaded }: Props) {
  useEffect(() => {
    const controller = new AbortController()

    // Wikipedia APIからページのHTMLを取得
    async function fetchPage() {
      try {
        const res = await fetch(`https://ja.wikipedia.org/api/rest_v1/page/html/${encodeURIComponent(title)}`, {
          signal: controller.signal,
        })
        if (!res.ok) throw new Error('Fetch failed')
        const text = await res.text()
        onLoaded(text)
      } catch (e: unknown) {
        if (e instanceof Error && e.name !== 'AbortError') console.error(e)
      }
    }

    fetchPage()
    return () => controller.abort()
  }, [title, onLoaded])

  return null
}
