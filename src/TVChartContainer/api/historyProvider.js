var rp = require("request-promise").defaults({ json: true });

const history = {};

const api_temp_root =
  "https://fapi.binance.com/fapi/v1/continuousKlines?pair=BNBBUSD&contractType=PERPETUAL";
const historyProvider = {
  history: history,

  getBars: function (symbolInfo, first) {
    const qs = {
      interval: "15m",
    };

    return rp({
      url: `${api_temp_root}`,
      qs,
    }).then((data) => {
      console.log({ data });
      if (data.Response && data.Response === "Error") {
        console.log("CryptoCompare API error:", data.Message);
        return [];
      }
      if (data.length) {
        var bars = data.map((el) => {
          return {
            time: new Date(el[0]).getTime(), //TradingView requires bar time in ms
            low: el[3], //low
            high: el[2], //high
            open: el[1], //open
            close: el[4], //close
            volume: el[5], //volumn
          };
        });
        if (first) {
          var lastBar = bars[bars.length - 1];
          history[symbolInfo.name] = { lastBar: lastBar };
        }
        return bars;
      } else {
        return [];
      }
    });
  },
};

export default historyProvider;
