import React, { ReactPropTypes } from "react";
import { chartOutputItem } from "../../types";
import { formatPercent, formatNumber } from "../../utils/helpers";
import { linearChartProps } from "./types";

export default function LinearChart({ data }: linearChartProps) {
    return (
        <div className="chart">
            <div className="chart__line">
                {data.map((dataItem: chartOutputItem) => {
                    return (
                        <div
                            key={dataItem.label}
                            className="chart__item"
                            style={{
                                width: dataItem.share * 100 + "%",
                                backgroundColor: dataItem.color,
                            }}
                        >
                            {dataItem.amount > 0 && (
                                <div className="chart__popover">
                                    {formatNumber(dataItem.amount)}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="chart__legend">
                {data.map((dataItem: chartOutputItem) => {
                    return (
                        <div key={dataItem.label} className="chart__label">
                            <div
                                className="chart__dot"
                                style={{
                                    backgroundColor: dataItem.color,
                                }}
                            ></div>
                            <span>{dataItem.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
