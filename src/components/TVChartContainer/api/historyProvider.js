var rp = require('request-promise').defaults({ json: true })

const api_root = 'https://min-api.cryptocompare.com'
const history = {}
const api_key = 'a6c625fb5265a4b6b52e6d3034cbc5b0715c5629ff43a8789ed6eefb9b1fa600'

const api_temp_root = 'https://api2.poocoin.app/candles-bsc?to=2021-09-05T13%3A35%3A00.000Z'
const lpAddr = '0xe859b6a32d953A0Ece0027C0fC8575571862c0BB'
const baseLp = '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16'
export default {
	history: history,

	getBars: function (symbolInfo, resolution, from, to, first, limit) {
		var split_symbol = symbolInfo.name.split(/[:/]/)
		const url = resolution === 'D' ? '/data/histoday' : resolution >= 60 ? '/data/histohour' : '/data/histominute'
		const qs = {
			// e: split_symbol[0],
			// fsym: split_symbol[1],
			// tsym: split_symbol[2],
			// toTs: to ? to : '',
			// limit: limit ? limit : 2000,
			// api_key: api_key
			// aggregate: 1//resolution 
			limit: 2000,
			lpAddress: lpAddr,
			interval: '15m',
			baseLp: baseLp
		}
		// console.log({qs})

		return rp({
			// url: `${api_root}${url}`,
			url: `${api_temp_root}`,
			qs,
		})
			.then(data => {
				console.log({ data })
				if (data.Response && data.Response === 'Error') {
					console.log('CryptoCompare API error:', data.Message)
					return []
				}
				if (data.length) {
					// console.log(`Actually returned: ${new Date(data.TimeFrom * 1000).toISOString()} - ${new Date(data.TimeTo * 1000).toISOString()}`)
					var bars = data.map(el => {
						return {
							time: new Date(el.time).getTime(), //TradingView requires bar time in ms
							low: el.low,
							high: el.high,
							open: el.open,
							close: el.close,
							volume: el.volume
						}
					})
					if (first) {
						var lastBar = bars[bars.length - 1]
						history[symbolInfo.name] = { lastBar: lastBar }
					}
					return bars
				} else {
					return []
				}
			})
	}
}
