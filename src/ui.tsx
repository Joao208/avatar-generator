import {
  render,
  Container,
  TextboxNumeric,
  VerticalSpace,
  Button,
  Dropdown,
  DropdownOption,
} from '@create-figma-plugin/ui'
import { h } from 'preact'
import { useState } from 'react'
import * as axios from 'axios'
import { InsertCodeHandler } from './types'
import { emit } from '@create-figma-plugin/utilities'

function Plugin() {
  const [quantify, setQuantify] = useState<string>('')
  const [dropDownValue, setDropDownValue] = useState<null | string>(null)
  const options: Array<DropdownOption> = [
    { value: 'adventurer' },
    { value: 'adventurer-neutral' },
    { value: 'avataaars' },
    { value: 'big-ears' },
    { value: 'big-ears-neutral' },
    { value: 'big-smile' },
    { value: 'bottts' },
    { value: 'croodles' },
    { value: 'croodles-neutral' },
    { value: 'identicon' },
    { value: 'initials' },
    { value: 'micah' },
    { value: 'miniavs' },
    { value: 'open-peeps' },
    { value: 'personas' },
    { value: 'pixel-art' },
    { value: 'pixel-art-neutral' },
  ]
  const [size, setSize] = useState<string>('')
  const SVGs = [] as string[]

  async function handleClick(
    event: any,
    count: number = parseFloat(quantify) || 0
  ): Promise<void> {
    if (count === 0) return emit<InsertCodeHandler>('INSERT_IMAGES', SVGs)

    const { data } = await axios.default({
      url: `https://avatars.dicebear.com/api/${dropDownValue || 'pixel-art'}/${
        event.timeStamp
      }.svg?size=${size || 80}`,
      method: 'GET',
    })

    SVGs.push(data)

    return handleClick(event, count - 1)
  }

  return (
    <Container>
      <div style={{ overflow: 'hidden' }}>
        <VerticalSpace space="large" />
        <TextboxNumeric
          value={quantify}
          onInput={(event) => setQuantify(event.currentTarget.value)}
          placeholder="How many icons do you want?"
        />
        <VerticalSpace space="small" />
        <TextboxNumeric
          value={size}
          onInput={(event) => setSize(event.currentTarget.value)}
          placeholder="Size"
        />
        <VerticalSpace space="small" />
        <Dropdown
          onChange={(event: any) => setDropDownValue(event.currentTarget.value)}
          options={options}
          placeholder="What do you want to use?"
          value={dropDownValue}
        />
        <VerticalSpace space="small" />
        <Button onClick={handleClick} fullWidth>
          Generate
        </Button>
        <VerticalSpace space="large" />
      </div>
    </Container>
  )
}

export default render(Plugin)
