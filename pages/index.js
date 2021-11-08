import styles from '../styles/Home.module.css'
import { Card, List, PageHeader, Skeleton, Image } from 'antd'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'
import Link from 'next/link'
import { useQuery, useQueryClient } from 'react-query'

export const FACADE_URL = 'https://www.jcrew.com/s7-img-facade'

const renderProduct = (item) => {
	let itemRendered = null

	if (item) {
		itemRendered = (
			<Card
				hoverable
				cover={<Image alt={item.productDescription} src={getImg(item)} />}
			>
				<Link passHref href={`/${item.productCode}`}>
					<Card.Meta
						description={item.listPrice.formatted}
						title={item.productDescription}
					/>
				</Link>
			</Card>
		)
	} else {
		itemRendered = <Skeleton active height={200} />
	}
	return <List.Item>{itemRendered}</List.Item>
}

export const getImg = (product) => {
	const { productCode, defaultColorCode } = product
	return `${FACADE_URL}/${productCode}_${defaultColorCode}`
}

export default function Home() {
	const { data: products } = useQuery('products', async () => {
		const { data } = await axios.get('http://localhost:8000/')
		const productsAll = data.productList[0].products
		return _.uniqBy(productsAll, 'productCode')
	})

	return (
		<div className="container">
			<Head>
				<title>J.Crew Autumn Collection</title>
			</Head>
			<PageHeader
				className="site-page-header"
				title="J.Crew Autumn Collection"
				subTitle="Bestsellers Autumn 2021"
			/>
			,
			<div className="site-card-border-less-wrapper" style={{ padding: 100 }}>
				<List
					grid={{
						gutter: 32,
						xs: 1,
						sm: 2,
						md: 4,
						lg: 4,
						xl: 6,
						xxl: 3,
					}}
					bordered
					dataSource={products}
					renderItem={renderProduct}
				/>
			</div>
		</div>
	)
}
