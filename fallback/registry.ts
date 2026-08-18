"use client";
import { dynamic } from "@repo/ui/elements/dynamic";

import { ChartjsDemo } from "@repo/chartjs/demo";
import { GoogleChartDemo } from "@repo/google-charts/demo";
import { LWChartDemo } from "@repo/lw-charts/demo";
import { MuiChartsDemo } from "@repo/mui-charts/demo";
import { PlotlyDemo } from "@repo/plotly/demo";
import { RechartDemo } from "@repo/recharts/demo";

export const COMPONENTS = {
	Marketing: dynamic(() => import("@repo/marketing")),

	LWYieldChart: dynamic(() => import("@repo/lw-charts/yield-curve-chart")),
	LWOptionsChart: dynamic(() => import("@repo/lw-charts/options-chart")),
	TWWidget: dynamic(() => import("@repo/lw-charts/widget")),
	LWChart: dynamic(() => import("@repo/lw-charts/chart")),

	Plotly: dynamic(() => import("@repo/plotly")),
	Rechart: dynamic(() => import("@repo/recharts")),
	Muichart: dynamic(() => import("@repo/mui-charts")),
	GoogleChart: dynamic(() => import("@repo/google-charts")),
	Chartjs: dynamic(() => import("@repo/chartjs")),

	Chatbot: dynamic(() => import("@repo/chatbot/chat")),
	Chat: dynamic(() => import("@repo/chat")),
	JsonViewer: dynamic(() => import("@repo/jsonviewer/JsonViewerContent")),
	MonacoEditor: dynamic(() => import("@repo/monaco")),

	NotificationToolbarAction: dynamic(() => import("@repo/notifications")),
	DataForm: dynamic(() => import("@repo/forms")),
};

export const ICONS = {};

export const CHART_DEMOS = {
	GoogleChartDemo,
	ChartjsDemo,
	MuiChartsDemo,
	RechartDemo,
	LWChartDemo,
	PlotlyDemo,
};

export const registry = {
	components: COMPONENTS,
	icons: ICONS,
	chartDemos: CHART_DEMOS,
};
