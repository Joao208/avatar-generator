import { once, showUI } from '@create-figma-plugin/utilities'

import { InsertCodeHandler } from './types'

export default function () {
  once<InsertCodeHandler>('INSERT_IMAGES', async function (SVGs: string[]) {
    const nodes: Array<FrameNode> = []

    for (const index in SVGs) {
      const svg = SVGs[index]

      const img = figma.createNodeFromSvg(svg)

      img.x = parseFloat(index) * 150

      figma.currentPage.appendChild(img)
      nodes.push(img)
    }

    figma.currentPage.selection = nodes
    figma.viewport.scrollAndZoomIntoView(nodes)

    figma.closePlugin()
  })

  showUI({})
}
