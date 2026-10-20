export const COMPONENTS = {
	Marketing: () => import("@repo/marketing"),

	LWYieldChart: () => import("@repo/lw-charts/yield-curve-chart"),
	LWOptionsChart: () => import("@repo/lw-charts/options-chart"),
	TWWidget: () => import("@repo/lw-charts/widget"),
	LWChart: () => import("@repo/lw-charts"),

	Plotly: () => import("@repo/plotly"),
	Rechart: () => import("@repo/recharts"),
	Muichart: () => import("@repo/mui-charts"),
	GoogleChart: () => import("@repo/google-charts"),
	Chartjs: () => import("@repo/chartjs"),

	ApexChart: () => import("@repo/apex-charts"),
	ApexChartStreaming: () => import("@repo/apex-charts/apex-content-streaming"),

	Chatbot: () => import("@repo/chatbot/chat"),
	KnowledgeChatbot: () => import("@repo/chatbot/knowledge-chat"),
	KnowledgeChat: () => import("@repo/chatbot/knowledge-chat"),
	Chat: () => import("@repo/chat"),
	JsonViewer: () => import("@repo/jsonviewer/JsonViewerContent"),
	MonacoEditor: () => import("@repo/monaco"),

	NotificationToolbarAction: () => import("@repo/notifications"),
	DataForm: () => import("@repo/forms"),
};

export const API = {
	connections: () => import("@repo/service-connections/api"),
	chat: () => import("@repo/chatbot/api"),
	mcp: () => import("@repo/mcp/api"),
};

export const ICONS = {};

export const registry = {
	components: COMPONENTS,
	icons: ICONS,
};
