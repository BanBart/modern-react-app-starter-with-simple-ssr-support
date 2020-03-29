import { deburr } from 'lodash'

const slugify = string => {
  if (!string) return

  return deburr(string.toString())
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export { slugify }
