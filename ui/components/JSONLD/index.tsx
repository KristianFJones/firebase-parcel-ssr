import { AddTag } from '../HeadProvider'

export interface ItemListElements {
  item: string
  name: string
  position: number
}

export interface BreadCrumbJsonLdProps {
  itemListElements: ItemListElements[]
}

export function useBreadCrumbJsonLd(itemListElements: ItemListElements[] = []) {
  const jslonld = `{
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      ${itemListElements.map(
        (itemListElement) => `{
        "@type": "ListItem",
        "position": ${itemListElement.position},
        "name": "${itemListElement.name}",
        "item": "${itemListElement.item}"
      }`,
      )}
     ]
  }`

  return AddTag({ type: 'script', script: jslonld, texttype: 'application/ld+json' })
}