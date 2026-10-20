export const API = {
	connections: () => import("@repo/service-connections/api"),
	chat: () => import("@repo/chatbot/api"),
	mcp: () => import("@repo/mcp/api"),
};
