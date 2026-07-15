"use client";
import { dynamic } from "@repo/ui";
import {
	AreaChart,
	BarChart3,
	Bot,
	Boxes,
	CheckSquare,
	Code2,
	FileCode,
	Image,
	Layers,
	LayoutDashboard,
	LineChart,
	List,
	MessageSquare,
	MousePointerClick,
	Table,
} from "@repo/ui-icons/lucide";

export const COMPONENTS = {
	Marketing: dynamic(() => import("@repo/marketing")),

	Icons: dynamic(() => import("@repo/features/icons")),

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
	DataForm: dynamic(() => import("@repo/forms"))
};
export const ICONS = {
	LayoutDashboard,
	LineChart,
	Table,
	CheckSquare,
	MousePointerClick,
	Image,
	List,
	AreaChart,
	MessageSquare,
	Bot,
	Code2,
	FileCode,
	Layers,
	Boxes,
	BarChart3,
};

export const registry = {
	components: COMPONENTS,
	icons: ICONS,
};
