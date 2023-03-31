import Head from 'next/head'
import { GetStaticProps } from 'next/types'
import { useEffect } from 'react'

import { useGoods } from '#/entities'
import { productsService } from '#/shared/api/services'
import { Good } from '#/shared/types'
import { GoodBanner, GoodCells } from '#/shared/ui'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      goods: await productsService.getGoods()
    },
    revalidate: 10
  }
}
type ApplicationStaticInferProps = { goods: Good[] }
const Application = ({ goods }: ApplicationStaticInferProps) => {
  useEffect(() => {
    if (goods) {
      useGoods.setState({ goods })
    }
  }, [goods])
  return (
    <>
      <Head>
        <title>Leviathan</title>
      </Head>
      <div className='flex flex-col bg-[#FF0080] lg:flex-row'>
        <GoodCells />
      </div>
      <GoodBanner />
    </>
  )
}

export default Application
