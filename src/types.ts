import { EventHandler } from '@create-figma-plugin/utilities'

export interface InsertCodeHandler extends EventHandler {
  name: 'INSERT_IMAGES'
  handler: (SVGs: string[]) => void
}
