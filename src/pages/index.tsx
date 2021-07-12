import { GetServerSideProps } from 'next'
import React from 'react'
import { Client } from '@notionhq/client'
/**
 * Homepage
 */
const HomePage: any = ({ notionDatabase }: any) => {
  const titleList = notionDatabase.results.map((item: any) => {
    return item.properties.Name.title[0]?.['plain_text']
  })
  console.log(notionDatabase, titleList)
  return (
    <main>
      {titleList.map((title: any) => (
        <div>{title}</div>
      ))}
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const notion = new Client({
    auth: process.env.NOTION_ACCESS_TOKEN,
  })
  console.log(notion)
  const notionDatabase = await notion.request({
    path: `databases/${process.env.NOTION_DATABASE_ID}/query`,
    method: 'post',
  })
  console.log(notionDatabase)
  return {
    props: {
      notionDatabase,
    },
  }
}

export default HomePage
