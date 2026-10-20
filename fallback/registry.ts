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


export const APIs = {
	connections: () => import("@repo/service-connections/api"),
	//chat: () => import("@repo/chatbot/api"),
};

export const API = [
	{
		path: "connections/:path*",
		handler: () => import("@repo/service-connections/api"),
	},
	{
		path: "chat/:slug*",
		access: { level: "authenticated", methods: ["POST"] },
		handler: () => import("@repo/chatbot").then((m) => m.api.handleRequest as any),
	},
	{
		path: "mcp/:transport*",
		access: { level: "authenticated", methods: ["GET", "POST", "DELETE"] },
		handler: async () => {
			const { createMcpHttpHandler } = await import("@repo/mcp/http");
			const { createKetrikMcpServer } = await import("@repo/mcp/core");
			const mcpHandler = createMcpHttpHandler({ server: () => createKetrikMcpServer() });
			return ({ request }: any) => mcpHandler(request);
		},
	},



export const ICONS = {};

export const registry = {
	components: COMPONENTS,
	icons: ICONS,
};
