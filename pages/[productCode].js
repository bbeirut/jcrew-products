import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { getImg, FACADE_URL } from './index'
import _ from 'lodash'

import { Card, Divider, Image, List, PageHeader, Skeleton } from 'antd'

export default function Product(props) {
	const router = useRouter()
	const { productCode } = router.query

	const { data: products } = useQuery('products')
	const product = _.find(products, (p) => p.productCode === productCode)
	if (product) {
		const colors = _.map(product.colors, 'colorCode')
		const swath = (
			<List
				grid={{ gutter: 6, column: 10 }}
				dataSource={colors}
				renderItem={(colorCode) => (
					<List.Item>
						<Image
							alt="color"
							width={26}
							src={`${FACADE_URL}/${product.productCode}_${colorCode}_sw`}
						></Image>
					</List.Item>
				)}
			></List>
		)
		return (
			<div>
				<PageHeader
					className="site-page-header"
					title="J.Crew Autumn Collection"
					subTitle={product.productDescription}
					onBack={() => router.push('/')}
				/>
				,
				<div>
					<Card style={{ width: 400 }}>
						<Image alt={product.productDescription} src={getImg(product)} />
						<Card.Meta
							description={product.listPrice.formatted}
							title={product.productDescription}
						/>
						<Divider />
						{colors.length > 1 && swath}
					</Card>
				</div>
			</div>
		)
	}
	return <Card />
}

export async function getStaticProps({ params: { productCode } }) {
	return {
		props: {},
	}
}

export async function getStaticPaths({ params }) {
	return { paths: [], fallback: true }
}
