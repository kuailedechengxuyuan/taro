import * as path from 'path'

import { Kernel } from '@tarojs/service'

export default function build ({
  platform,
  appPath,
  isWatch,
  envHasBeenSet = false
}: {
  platform: string,
  appPath: string,
  isWatch: boolean,
  envHasBeenSet?: boolean
}) {
  let isProduction = false
  if (!envHasBeenSet) {
    isProduction = process.env.NODE_ENV === 'production' || !isWatch
  }
  const kernel = new Kernel({
    appPath,
    isWatch,
    isProduction,
    presets: [
      path.resolve(__dirname, '..', 'presets', 'index.js')
    ]
  })
  kernel.run({
    name: 'build',
    opts: {
      platform
    }
  })
}
