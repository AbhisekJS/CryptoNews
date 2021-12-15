import React, { useEffect, useState } from 'react'
import millify from 'millify'
import {Link} from 'react-router-dom'
import {Card, Row, Col, Input} from 'antd'

import { useGetCryptosQuery } from '../services/cryptoAPI'

const Cryptocurrencies = ({simplified}) => {
    const count = simplified ? 10:100
    const{data: cryptoList,isFetching} = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState(cryptoList?.data?.coins)
    const [searchTerm,setSearchTerm]=useState('')

    useEffect(() => {
        const filteredData = cryptoList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));        setCryptos(filteredData)  
        setCryptos(filteredData);
    }, [cryptoList, searchTerm])

    console.log(cryptoList?.data?.coins)
    if(isFetching){
        return (
            'Loading...'
        )
    }
    return (
        <>
        {!simplified && (
        <div className="search-crypto">
            <Input placeholder="Search Cryptocurrency" onChange={e=>setSearchTerm(e.target.value)}/>
        </div>
        )
        }
       
         <Row gutter={[32,32]} className="crypto-card-container">
            {cryptos?.map((currency)=>(
                <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                    <Link to={`/crypto/${currency.id}`}>
                    <Card title={`${currency.rank}. ${currency.name}`}
                    extra={<img className="crypto-image" src={currency.iconUrl} alt=""/>} 
                    hoverable
                    >
                        <p>Price :&nbsp;{millify(currency.price)}</p>
                        <p>MarketCap :&nbsp;{millify(currency.marketCap)}</p>
                        <p>Daily Change :&nbsp;{millify(currency.change)}</p>
                    </Card>
                    </Link>
                </Col>
            ))}
        </Row> 
        </>
    )
}

export default Cryptocurrencies
