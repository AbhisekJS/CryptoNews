import React from 'react'
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Typography, Row, Col, Statistic } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoAPI';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';

const{Title}=Typography
const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats
    console.log(data)

    return (
        <>
         <Title level={2} className="heading">
             Global Crypto Stats
         </Title>
         <Row>
             <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats?.total}/></Col>
             <Col span={12}><Statistic title="Total Exchanges" value={globalStats?.totalExchanges}/></Col>
             <Col span={12}><Statistic title="Total Market" value={globalStats?.totalMarkets}/></Col>
             <Col span={12}><Statistic title="Total 24Hr Volume" value={(globalStats?.total24hVolume)}/></Col>
             <Col span={12}><Statistic title="Total Market Cap" value={globalStats?.totalMarketCap}/></Col>
         </Row>
         <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptos In The World</Title>
        <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
         </div>
         <Cryptocurrencies simplified/>
         <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={3} className="show-more"><Link to="/news">Show more</Link></Title>
         </div>
         <News simplified/>
        </>
    )
}

export default Homepage
