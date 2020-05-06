import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactApexChart from 'react-apexcharts'
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles"
import { CircularProgress, Typography, Button, ButtonGroup } from "@material-ui/core"
import { palette } from "../../constants/styles";
import bitcoinIcon from '../../assets/Bitcoin.svg'
import { formatCurrency } from '../shared/utils'

const PRICE_CHART_HISTORICAL_DATA_API = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?"
const PRICE_CHART_CURRENT_DATA_API = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies="

const useStyles = makeStyles(theme => ({
    paper: {
        alignItems: "center",
        justifyContent: "center"
    },
    info: {
        boxShadow: "none",
        borderRadius: "5px",
        border: "1px solid",
        borderColor: palette.gray[0],
        margin: "20px",
        display: "flex",
        flexDirection: "row",
        padding: 10
    },
    bitcoinIcon: {
        width: 24,
        height: 24,
        margin: "auto 10px"
    },
    margin: {
        margin: theme.spacing(1),
    },
    dateRangeSelector: {
        position: "absolute",
        right: 20,
        top: 0,
        zIndex: 1
    },
    singleLine: {
        lineHeight: 1.2
    },
    flexGrow: {
        flexGrow: 1
    }
}));

const timeRange = [
    {
        label: "5Y",
        value: 365 * 5
    },
    {
        label: "1Y",
        value: 365
    },
    {
        label: "1M",
        value: 30
    },
    {
        label: "1W",
        value: 7
    },
    {
        label: "1D",
        value: 1
    },
]


const Chart = (props) => {
    const { currency } = props
    const processData = ({ prices }) => {
        return prices.map(item => { return { x: item[0], y: item[1].toFixed(2) } })
    }
    const classes = useStyles();
    const [days, setDays] = useState(7)
    const [historicalData, setHistoricalData] = useState(null)
    const [currentData, setCurrentData] = useState(null)

    const getData = async ({ historical, current, currency, days }) => {
        const historicalDataApi = axios.get(`${PRICE_CHART_HISTORICAL_DATA_API}vs_currency=${currency}&days=${days}`)
        const currentDataApi = axios.get(`${PRICE_CHART_CURRENT_DATA_API}${currency}`)

        if (historical && current) {
            const [historicalDataResults, currentDataResults] = await Promise.all([historicalDataApi, currentDataApi])
            setHistoricalData(processData({ prices: historicalDataResults.data.prices }))
            setCurrentData(currentDataResults.data.bitcoin[currency.toLowerCase()])
        } else if (historical) {
            const historicalDataResults = await historicalDataApi
            setHistoricalData(processData({ prices: historicalDataResults.data.prices }))
        } else if (current) {
            const currentDataResults = await currentDataApi
            setCurrentData(currentDataResults.data.bitcoin[currency.toLowerCase()])
        }
    }

    useEffect(() => {
        getData({ historical: true, current: true, currency, days })
    }, [currency])

    useEffect(() => {
        getData({ historical: true, currency, days })
    }, [days])

    const options = {
        series: [{
            data: historicalData
        }],
        options: {
            chart: {
                type: 'area',
                height: 150,
                toolbar: {
                    show: false
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100]
                },
            },
            stroke: {
                width: 2,
                curve: 'smooth'
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                x: {
                    format: 'dd MMM yy HH:mm'
                },
                y: {
                    formatter: (value) => `$${value.toLocaleString()}`,
                    title: {
                        formatter: () => "Price"
                    }
                }
            },
            grid: {
                show: false,
                borderColor: '#eee',
            },
            xaxis: {
                type: 'datetime',
                tooltip: {
                    enabled: false
                },
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false
                }
            },
            yaxis: {
                type: "",
                tooltip: {
                    enabled: false
                },
                labels: {
                    show: false,
                    formatter: (val) => val.toFixed(2)
                },
            }
        },


    };

    return (
        <Paper className={classes.paper}>
            {(currentData && historicalData) ?
                <>
                    <Paper className={classes.info}>
                        <div className={classes.flexGrow}>
                            <Typography variant="overline" display="block" className={classes.singleLine}>Bitcoin Price:</Typography>
                            <Typography className={classes.singleLine}>
                                {formatCurrency({ value: currentData, currency })}</Typography></div>
                        <img src={bitcoinIcon} className={classes.bitcoinIcon} alt="Bitcoin Logo" />
                    </Paper>
                    <div>
                        <ButtonGroup size="small" className={classes.dateRangeSelector}>
                            {timeRange.map(button => <Button key={button.labelu} onClick={() => setDays(button.value)} color="primary" variant={days === button.value ? "contained" : "outlined"}>{button.label}</Button>)}
                        </ButtonGroup>
                        <ReactApexChart options={options.options} series={options.series} type="area" height={150} /></div>
                </>
                : <CircularProgress />}
        </Paper >
    )
}

Chart.defaultProps = {
    currency: "USD"
}

export default Chart