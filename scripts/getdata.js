/* eslint-disable no-console */
import fse from 'fs-extra'
import POSTCONFIG from '../post.config.js'
import customFetcher from './dataFetcher.js'

const getData = async () => {
  const dataToWrite = {
    content: [],
  }
  for (const doc of POSTCONFIG.docs) {
    const data = await customFetcher(doc.id)
    dataToWrite.content.push(data)
  }
  console.log('DATTT___-->', dataToWrite)

  if (dataToWrite) {
    fse.outputFile(POSTCONFIG.dataPath, JSON.stringify(dataToWrite))
  }
}

getData()
