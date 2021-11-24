import * as React from "react";
import "./index.css";
import Datafeed from "./api/";

function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export class TVChartContainer extends React.PureComponent {
  static defaultProps = {
    symbol: "Coinbase:BTC/USD",
    interval: "15",
    containerId: "tv_chart_container",
    libraryPath: "/charting_library/",
    chartsStorageUrl: "https://saveload.tradingview.com",
    chartsStorageApiVersion: "1.1",
    clientId: "tradingview.com",
    userId: "public_user_id",
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  };

  componentDidMount() {
    console.log(Datafeed);
    const widgetOptions = {
      debug: false,
      symbol: this.props.symbol,
      datafeed: Datafeed,
      interval: this.props.interval,
      container_id: this.props.containerId,
      library_path: this.props.libraryPath,
      locale: getLanguageFromURL() || "en",
      // disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      charts_storage_url: this.props.chartsStorageUrl,
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      client_id: this.props.clientId,
      user_id: this.props.userId,
      fullscreen: this.props.fullscreen,
      autosize: this.props.autosize,
      studies_overrides: this.props.studiesOverrides,
      use_localstorage_for_settings: 3,
      overrides: {
        // "mainSeriesProperties.showCountdown": true,
        "paneProperties.background": "#fff",
        "paneProperties.vertGridProperties.color": "#E2E4E7",
        "paneProperties.horzGridProperties.color": "#fff",
        "symbolWatermarkProperties.transparency": 90,
        "scalesProperties.textColor": "#AAA",
        "mainSeriesProperties.candleStyle.wickUpColor": "#E2E4E7",
        "mainSeriesProperties.candleStyle.wickDownColor": "#E2E4E7",
      },
    };

    window.TradingView.onready(() => {
      const widget = (window.tvWidget = new window.TradingView.widget(
        widgetOptions
      ));
      widget.onChartReady(() => {
        console.log("Chart has loaded!");
      });
    });
  }

  render() {
    console.log(window);
    return <div id={this.props.containerId} className={"TVChartContainer"} />;
  }
}
