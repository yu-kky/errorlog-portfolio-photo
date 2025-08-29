export type GalleryItem = {
  id: number
  title: string
  category: string
  location: PhotoLocation
  date: string
  imgDir: string
  imgNumber: number
  work?: string
  costume?: string
  characters?: string[]
  cast?: PhotoCast[]
  photographer: string[]
  editor: string
  objectPosition?: string
}

export type PhotoLocation = {
  prefecture: string
  name: string
  type: 'studio' | 'event' | 'outside'
}

export type PhotoCast = {
  character: string
  name: string
  account: string
}

export async function loadGallery(): Promise<GalleryItem[]> {
  const base = import.meta.env.BASE_URL || '/'
  const url = `${base.replace(/\/$/, '')}/data.json`

  const res = await fetch(url, { cache: 'no-store' })

  const ct = res.headers.get('content-type') || ''
  if (!res.ok || !ct.includes('application/json')) {
    const text = await res.text()
    throw new Error(
      `JSON取得失敗 url=${url} status=${res.status} ` +
        `content-type=${ct} head=${text.slice(0, 60)}`,
    )
  }
  return res.json()
}

const database = await loadGallery()

type Callback<T> = (result: T) => void

export function getListWithPagination(
  category: string,
  page: number,
  callback: (items: GalleryItem[], isMoreAvailable: boolean) => void,
): void {
  const offset = 12
  setTimeout(() => {
    if (category === 'all') {
      const start = (page - 1) * offset
      const end = page * offset
      callback(database.slice(start, end), end < database.length)
    } else {
      const filtered = database.filter((el) => el.category === category)
      const start = (page - 1) * offset
      const end = page * offset
      callback(filtered.slice(start, end), end < filtered.length)
    }
  }, 250)
}

export function getLatest(callback: Callback<GalleryItem[]>): void {
  setTimeout(() => {
    const result = database.slice(0, 6)
    callback(result)
  }, 250)
}

export function findById(id: number, callback: Callback<GalleryItem | undefined>): void {
  setTimeout(() => {
    const item = database.find((el) => el.id === id)
    callback(item)
  }, 250)
}
