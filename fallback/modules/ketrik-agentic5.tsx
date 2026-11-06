"use client";
import React, { useState, useEffect, useRef } from "react";
import type { SxProps, Theme } from "@repo/ui/mui";
import {
	Box,
	Typography,
	Grid,
	Paper,
	Button,
	Chip,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Avatar,
	Tooltip,
	CircularProgress,
} from "@repo/ui/mui";
import { ActionButton, IconButton } from "@repo/ui/mui/@extended";
import { DynamicIcon } from "@repo/ui/elements/dynamic-icon";
import { sx } from "@repo/ui/helpers/sx";


const COLOR_TEXT_SECONDARY_SX = { color: "text.secondary" } as const satisfies SxProps<Theme>;

const FONT_SIZE_1REM_SX = { fontSize: "1rem" } as const satisfies SxProps<Theme>;
export type AgentIconKey = "dossier" | "kpi" | "news" | "knowledge" | "default";
export type LogType = "narration" | "tool_call" | "info" | "success" | "error";

export interface AgentLog {
	timestamp: string;
	message: string;
	type?: LogType;
	toolName?: string;
	durationMs?: number;
	args?: Record<string, any>;
}

export interface WorkspaceAgent {
	id: string;
	name: string;
	moduleTarget: string;
	description: string;
	iconKey?: AgentIconKey;
	icon?: React.ReactNode;
	isReady: boolean;
	runCount?: number;
	lastRunAt?: string;
	lastUpdated: string;
	currentNarration?: string;
	logs: AgentLog[];
}

export interface WorkspaceAgentsSummary {
	totalAgents: number;
	readyAgents: number;
	isAllReady: boolean;
}

/**
 * Single document schema stored at: users/{uid}/workspaces_agents/data
 */
export interface UserWorkspaceAgentsDataDoc {
	workspaceId?: string;
	status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";
	activeAgentId: string;
	currentNarration: string;
	updatedAt: string;
	summary?: WorkspaceAgentsSummary;
	agents: Record<string, WorkspaceAgent> | WorkspaceAgent[];
}

export const AGENT_ICON_MAP: Record<AgentIconKey, React.ReactNode> = {
	dossier: <DynamicIcon name="CorporateFare" fontSize="small" />,
	kpi: <DynamicIcon name="Timeline" fontSize="small" />,
	news: <DynamicIcon name="Public" fontSize="small" />,
	knowledge: <DynamicIcon name="MenuBook" fontSize="small" />,
	default: <DynamicIcon name="Terminal" fontSize="small" />,
};

const INITIAL_AGENTS: readonly WorkspaceAgent[] = [
	{
		id: "agent-1",
		name: "Dossier Builder",
		moduleTarget: "Company Dossier",
		description: "SEC filings, executive leadership & entity structure",
		isReady: true,
		lastUpdated: "1 min ago",
		currentNarration: "Reconciled all public corporate leadership charts and board structures.",
		icon: <DynamicIcon name="CorporateFare" fontSize="small" />,
		logs: [
			{
				timestamp: "10:24:12",
				type: "narration",
				message: "Fetching company profile and SEC EDGAR database connections.",
			},
			{
				timestamp: "10:24:13",
				type: "tool_call",
				toolName: "fetch_sec_filings",
				durationMs: 142,
				message: "fetch_sec_filings(cik: '0001018724', formType: '10-K')",
			},
			{
				timestamp: "10:24:45",
				type: "narration",
				message: "Reconciling 10-K disclosures and leadership charts.",
			},
			{
				timestamp: "10:24:46",
				type: "tool_call",
				toolName: "save_workspace_entity_layout",
				durationMs: 98,
				message: "save_workspace_entity_layout(entity: 'leadership')",
			},
			{
				timestamp: "10:25:01",
				type: "success",
				message: "Company Dossier module ready",
			},
		],
	},
	{
		id: "agent-2",
		name: "KPI & Metrics Engine",
		moduleTarget: "Financial & Product KPIs",
		description: "Revenue cohorts, ARR velocity, retention & CAC payback",
		isReady: false,
		lastUpdated: "In progress",
		currentNarration:
			"Querying telemetry data warehouse to calculate ARR expansion velocity and net retention rates.",
		icon: <DynamicIcon name="Timeline" fontSize="small" />,
		logs: [
			{
				timestamp: "10:25:10",
				type: "narration",
				message: "Connecting to billing provider and telemetry data warehouse.",
			},
			{
				timestamp: "10:25:11",
				type: "tool_call",
				toolName: "query_telemetry_cohorts",
				durationMs: 310,
				message: "query_telemetry_cohorts(interval: 'monthly', lookback: 12)",
			},
			{
				timestamp: "10:25:32",
				type: "narration",
				message: "Computing multi-region revenue runs and retention curves.",
			},
			{
				timestamp: "10:25:33",
				type: "tool_call",
				toolName: "save_workspace_metrics",
				durationMs: 240,
				message: "save_workspace_metrics(manifest: 'kpi_engine_v1')",
			},
		],
	},
	{
		id: "agent-3",
		name: "Industry Pulse Monitor",
		moduleTarget: "News & Market Signals",
		description: "Competitor PR, market shifts & global regulatory updates",
		isReady: true,
		lastUpdated: "Just now",
		currentNarration:
			"Indexed real-time earnings call transcripts and competitive press releases.",
		icon: <DynamicIcon name="Public" fontSize="small" />,
		logs: [
			{
				timestamp: "10:23:05",
				type: "narration",
				message: "Subscribing to 14 live industry news and regulatory syndication feeds.",
			},
			{
				timestamp: "10:23:06",
				type: "tool_call",
				toolName: "subscribe_rss_feeds",
				durationMs: 85,
				message: "subscribe_rss_feeds(sources: 14)",
			},
			{
				timestamp: "10:24:18",
				type: "narration",
				message: "Indexing latest earnings transcripts and market signals.",
			},
			{
				timestamp: "10:24:19",
				type: "tool_call",
				toolName: "vector_index_news",
				durationMs: 195,
				message: "vector_index_news(batchSize: 45)",
			},
			{
				timestamp: "10:24:30",
				type: "success",
				message: "News & Market Signals module ready",
			},
		],
	},
	{
		id: "agent-4",
		name: "Knowledge Base Synthesizer",
		moduleTarget: "Knowledge Base & SOPs",
		description: "Internal documentation, policy manuals & team notes",
		isReady: false,
		lastUpdated: "In progress",
		currentNarration:
			"Generating semantic vector embeddings for synced Notion & Google Drive runbooks.",
		icon: <DynamicIcon name="MenuBook" fontSize="small" />,
		logs: [
			{
				timestamp: "10:25:02",
				type: "narration",
				message: "Syncing internal Notion workspaces and Google Drive team repositories.",
			},
			{
				timestamp: "10:25:03",
				type: "tool_call",
				toolName: "sync_workspace_connectors",
				durationMs: 412,
				message: "sync_workspace_connectors(providers: ['notion', 'gdrive'])",
			},
			{
				timestamp: "10:25:40",
				type: "narration",
				message: "Generating semantic vector embeddings for fast semantic recall.",
			},
		],
	},
];

const ROOT_BOX_SX = {
	width: "100%",
	py: 2,
} as const satisfies SxProps<Theme>;

const SECTION_HEADER_SX = {
	mb: 3,
} as const satisfies SxProps<Theme>;

const SECTION_TITLE_SX = {
	fontWeight: 700,
	mb: 0.5,
} as const satisfies SxProps<Theme>;

const SECTION_SUBTITLE_SX = {
	color: "text.secondary",
} as const satisfies SxProps<Theme>;

const PANEL_CARD_SX = {
	borderRadius: 2,
	overflow: "hidden",
	bgcolor: "background.paper",
	borderColor: "divider",
	height: "100%",
} as const satisfies SxProps<Theme>;

const PANEL_HEADER_SX = {
	p: 2,
	justifyContent: "space-between",
	alignItems: "center",
	borderBottom: 1,
	borderColor: "divider",
} as const satisfies SxProps<Theme>;

const PANEL_TITLE_SX = {
	fontWeight: 700,
} as const satisfies SxProps<Theme>;

const TABLE_CONTAINER_SX = {
	flexGrow: 1,
} as const satisfies SxProps<Theme>;

const TABLE_HEAD_ROW_SX = {
	bgcolor: "action.hover",
} as const satisfies SxProps<Theme>;

const TABLE_HEADER_CELL_SX = {
	fontWeight: 700,
	fontSize: "0.75rem",
	color: "text.secondary",
	borderColor: "divider",
} as const satisfies SxProps<Theme>;

const TABLE_HEADER_CELL_RIGHT_SX = {
	fontWeight: 700,
	fontSize: "0.75rem",
	color: "text.secondary",
	borderColor: "divider",
	textAlign: "right",
} as const satisfies SxProps<Theme>;

const AGENT_ROW_SX = {
	cursor: "pointer",
	"&:hover": {
		bgcolor: "action.hover",
	},
} as const satisfies SxProps<Theme>;

const AGENT_ROW_SELECTED_SX = {
	bgcolor: "action.selected",
} as const satisfies SxProps<Theme>;

const TABLE_BODY_CELL_SX = {
	py: 1.8,
	borderColor: "divider",
} as const satisfies SxProps<Theme>;

const TABLE_BODY_CELL_RIGHT_SX = {
	py: 1.8,
	textAlign: "right",
	borderColor: "divider",
} as const satisfies SxProps<Theme>;

const AGENT_AVATAR_SX = {
	width: 34,
	height: 34,
} as const satisfies SxProps<Theme>;

const AGENT_AVATAR_SELECTED_SX = {
	bgcolor: "primary.main",
	color: "primary.contrastText",
} as const satisfies SxProps<Theme>;

const AGENT_AVATAR_DEFAULT_SX = {
	bgcolor: "action.focus",
} as const satisfies SxProps<Theme>;

const AGENT_TITLE_SX = {
	fontWeight: 600,
} as const satisfies SxProps<Theme>;

const CHIP_READY_ICON_SX = {
	fontSize: "15px !important",
} as const satisfies SxProps<Theme>;

const STATUS_CHIP_SX = {
	fontWeight: 600,
	fontSize: "0.72rem",
} as const satisfies SxProps<Theme>;

const TERMINAL_NARRATION_BOX_SX = {
	p: 1.5,
	bgcolor: "action.hover",
	borderBottom: 1,
	borderColor: "divider",
	alignItems: "flex-start",
} as const satisfies SxProps<Theme>;

const NARRATION_QUOTE_SX = {
	fontWeight: 500,
	fontSize: "0.82rem",
	lineHeight: 1.5,
	fontStyle: "italic",
} as const satisfies SxProps<Theme>;

const TOOL_CHIP_SX = {
	height: 18,
	fontSize: "0.65rem",
	fontFamily: 'Consolas, Monaco, "Courier New", monospace',
	fontWeight: 600,
} as const satisfies SxProps<Theme>;

const TERMINAL_BODY_SX = {
	p: 2,
	flexGrow: 1,
	minHeight: 250,
	maxHeight: 320,
	overflowY: "auto",
	bgcolor: (theme: Theme) => (theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.45)" : "grey.50"),
	borderTop: 0,
	fontFamily: 'Consolas, Monaco, "Courier New", monospace',
	fontSize: "0.8rem",
	lineHeight: 1.6,
} as const satisfies SxProps<Theme>;

const LOG_ENTRY_ROW_SX = {
	display: "flex",
	alignItems: "flex-start",
} as const satisfies SxProps<Theme>;

const LOG_TIMESTAMP_SX = {
	color: "text.disabled",
	fontSize: "inherit",
	fontFamily: "inherit",
	userSelect: "none",
} as const satisfies SxProps<Theme>;

const LOG_MESSAGE_SX = {
	fontSize: "inherit",
	fontFamily: "inherit",
	wordBreak: "break-word",
} as const satisfies SxProps<Theme>;

const LOG_NARRATION_TEXT_SX = {
	color: "info.main",
	fontSize: "inherit",
	fontFamily: "inherit",
	wordBreak: "break-word",
	fontWeight: 500,
} as const satisfies SxProps<Theme>;

const LAUNCH_BAR_PAPER_SX = {
	mt: 2.5,
	p: 2.5,
	borderRadius: 2,
	bgcolor: "background.paper",
	borderColor: "divider",
	flexDirection: { xs: "column", sm: "row" },
	justifyContent: "space-between",
	alignItems: "center",
} as const satisfies SxProps<Theme>;

const LAUNCH_TITLE_SX = {
	fontWeight: 600,
} as const satisfies SxProps<Theme>;

const LAUNCH_BUTTON_SX = {
	textTransform: "none",
	fontWeight: 600,
	px: 3,
	py: 1,
} as const satisfies SxProps<Theme>;

interface AgentTaskRowProps {
	readonly agent: WorkspaceAgent;
	readonly isSelected: boolean;
	readonly onSelect: (id: string) => void;
}

function AgentTaskRow({ agent, isSelected, onSelect }: AgentTaskRowProps) {
	const handleClick = () => onSelect(agent.id);
	const agentIcon =
		agent.icon ||
		(agent.iconKey && AGENT_ICON_MAP[agent.iconKey]) ||
		AGENT_ICON_MAP.default;

	return (
		<TableRow
			hover
			onClick={handleClick}
			sx={sx.compose(AGENT_ROW_SX, isSelected && AGENT_ROW_SELECTED_SX)}
		>
			<TableCell sx={TABLE_BODY_CELL_SX}>
				<Box sx={sx.compose(sx.flexRow, sx.gapSm)}>
					<Avatar
						variant="rounded"
						sx={sx.compose(
							AGENT_AVATAR_SX,
							isSelected ? AGENT_AVATAR_SELECTED_SX : AGENT_AVATAR_DEFAULT_SX,
						)}
					>
						{agentIcon}
					</Avatar>
					<Box>
						<Typography variant="body2" sx={AGENT_TITLE_SX}>
							{agent.moduleTarget}
						</Typography>
						<Typography variant="caption" sx={SECTION_SUBTITLE_SX}>
							{agent.description}
						</Typography>
					</Box>
				</Box>
			</TableCell>

			<TableCell sx={TABLE_BODY_CELL_SX}>
				{agent.isReady ? (
					<Chip
						icon={<DynamicIcon name="CheckCircleOutlined" sx={CHIP_READY_ICON_SX} />}
						label="Ready"
						size="small"
						color="success"
						variant="outlined"
						sx={STATUS_CHIP_SX}
					/>
				) : (
					<Chip
						icon={<CircularProgress size={11} color="inherit" />}
						label="Building"
						size="small"
						color="warning"
						variant="outlined"
						sx={STATUS_CHIP_SX}
					/>
				)}
			</TableCell>

			<TableCell sx={TABLE_BODY_CELL_RIGHT_SX}>
				<Typography variant="caption" sx={SECTION_SUBTITLE_SX}>
					{agent.lastUpdated}
				</Typography>
			</TableCell>
		</TableRow>
	);
}

export interface AgentWorkspaceGatewayProps {
	data?: UserWorkspaceAgentsDataDoc;
	onNavigateToDashboard?: () => void;
}

export const AgentWorkspaceGateway: React.FC<AgentWorkspaceGatewayProps> = ({
	data,
	onNavigateToDashboard,
}) => {
	const [localAgents, setLocalAgents] = useState<WorkspaceAgent[]>([...INITIAL_AGENTS]);

	// Normalize agents whether Firestore sends Record<string, WorkspaceAgent> or WorkspaceAgent[]
	const rawAgents = data?.agents;
	const agents: WorkspaceAgent[] = rawAgents
		? Array.isArray(rawAgents)
			? rawAgents
			: Object.values(rawAgents)
		: localAgents;

	const [selectedAgentId, setSelectedAgentId] = useState<string>(
		data?.activeAgentId || "agent-2",
	);
	const terminalBottomRef = useRef<HTMLDivElement>(null);

	const selectedAgent = agents.find((a) => a.id === selectedAgentId) ?? agents[0]!;

	useEffect(() => {
		if (data?.activeAgentId) {
			setSelectedAgentId(data.activeAgentId);
		}
	}, [data?.activeAgentId]);

	useEffect(() => {
		terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [selectedAgent.logs]);

	// Simulate pending agents finishing their execution when no live data is passed
	useEffect(() => {
		if (data?.agents) return;
		const timer = setTimeout(() => {
			setLocalAgents((prev) =>
				prev.map((agent) =>
					!agent.isReady && agent.id === "agent-2"
						? {
								...agent,
								isReady: true,
								lastUpdated: "Just now",
								currentNarration:
									"Cohort metrics and KPI graphs successfully compiled and saved.",
								logs: [
									...agent.logs,
									{
										timestamp: new Date().toTimeString().split(" ")[0] ?? "",
										type: "success",
										message:
											"Cohort metrics and KPI graphs successfully compiled.",
									},
								],
							}
						: agent,
				),
			);
		}, 4000);

		return () => clearTimeout(timer);
	}, [data?.agents]);

	return (
		<Box sx={ROOT_BOX_SX}>
			{/* Section Header */}
			<Box sx={SECTION_HEADER_SX}>
				<Typography variant="h5" sx={SECTION_TITLE_SX}>
					Workspace Setup in Progress
				</Typography>
				<Typography variant="body2" sx={SECTION_SUBTITLE_SX}>
					Autonomous agents are assembling your target workspace sections with live data.
				</Typography>
			</Box>

			{/* Main Grid: Agent Table & Live Console */}
			<Grid container spacing={2.5}>
				{/* Agent Task Matrix */}
				<Grid size={{ xs: 12, lg: 7 }}>
					<Paper variant="outlined" sx={sx.compose(sx.flexCol, PANEL_CARD_SX)}>
						<Box sx={sx.compose(sx.flexRow, PANEL_HEADER_SX)}>
							<Typography variant="subtitle2" sx={PANEL_TITLE_SX}>
								Target Dashboard Modules
							</Typography>
							<Tooltip title="Refresh Agent Tasks">
								<IconButton size="small" color="inherit" icon="Refresh" />
							</Tooltip>
						</Box>

						<TableContainer sx={TABLE_CONTAINER_SX}>
							<Table size="medium">
								<TableHead sx={TABLE_HEAD_ROW_SX}>
									<TableRow>
										<TableCell sx={TABLE_HEADER_CELL_SX}>
											MODULE & AGENT
										</TableCell>
										<TableCell sx={TABLE_HEADER_CELL_SX}>STATUS</TableCell>
										<TableCell sx={TABLE_HEADER_CELL_RIGHT_SX}>
											LAST UPDATED
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{agents.map((agent) => (
										<AgentTaskRow
											key={agent.id}
											agent={agent}
											isSelected={agent.id === selectedAgentId}
											onSelect={setSelectedAgentId}
										/>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</Grid>

				{/* Live Terminal / Log Inspector */}
				<Grid size={{ xs: 12, lg: 5 }}>
					<Paper variant="outlined" sx={sx.compose(sx.flexCol, PANEL_CARD_SX)}>
						<Box sx={sx.compose(sx.flexRow, PANEL_HEADER_SX)}>
							<Box sx={sx.compose(sx.flexRow, sx.gapXs)}>
								<DynamicIcon name="Terminal" fontSize="small" sx={COLOR_TEXT_SECONDARY_SX} />
								<Typography variant="subtitle2" sx={PANEL_TITLE_SX}>
									{selectedAgent.name}
								</Typography>
							</Box>
							<Typography variant="caption" sx={SECTION_SUBTITLE_SX}>
								{selectedAgent.moduleTarget}
							</Typography>
						</Box>

						{/* Live Model Narration Banner */}
						{selectedAgent.currentNarration && (
							<Box sx={sx.compose(sx.flexRow, sx.gapSm, TERMINAL_NARRATION_BOX_SX)}>
								<Typography component="span" sx={FONT_SIZE_1REM_SX}>
									💬
								</Typography>
								<Typography variant="body2" sx={NARRATION_QUOTE_SX}>
									"{selectedAgent.currentNarration}"
								</Typography>
							</Box>
						)}

						{/* Terminal Body */}
						<Box sx={TERMINAL_BODY_SX}>
							<Box sx={sx.compose(sx.flexCol, sx.gapXs)}>
								{selectedAgent.logs.map((log, index) => (
									<Box key={index} sx={sx.compose(sx.gapSm, LOG_ENTRY_ROW_SX)}>
										<Typography component="span" sx={LOG_TIMESTAMP_SX}>
											[{log.timestamp}]
										</Typography>
										{log.type === "narration" ? (
											<Typography component="span" sx={LOG_NARRATION_TEXT_SX}>
												💬 {log.message}
											</Typography>
										) : log.type === "tool_call" ? (
											<Box
												sx={sx.compose(sx.flexRow, sx.gapXs, {
													alignItems: "center",
													flexWrap: "wrap",
												})}
											>
												<Chip
													label={`tool: ${log.toolName || "exec"}`}
													size="small"
													color="primary"
													variant="outlined"
													sx={TOOL_CHIP_SX}
												/>
												{log.durationMs !== undefined && (
													<Typography
														component="span"
														sx={LOG_TIMESTAMP_SX}
													>
														[✓ {log.durationMs}ms]
													</Typography>
												)}
												<Typography component="span" sx={LOG_MESSAGE_SX}>
													{log.message}
												</Typography>
											</Box>
										) : log.type === "error" ? (
											<Box
												sx={sx.compose(sx.flexRow, sx.gapXs, {
													alignItems: "center",
													flexWrap: "wrap",
												})}
											>
												{log.toolName && (
													<Chip
														label={`tool: ${log.toolName}`}
														size="small"
														color="error"
														variant="outlined"
														sx={TOOL_CHIP_SX}
													/>
												)}
												<Typography
													component="span"
													sx={sx.compose(LOG_MESSAGE_SX, { color: "error.main" })}
												>
													✕ {log.message}
												</Typography>
											</Box>
										) : (
											<Typography component="span" sx={LOG_MESSAGE_SX}>
												{log.message}
											</Typography>
										)}
									</Box>
								))}
								<div ref={terminalBottomRef} />
							</Box>
						</Box>
					</Paper>
				</Grid>
			</Grid>

			{/* Action / Launch Bar */}
			<Paper variant="outlined" sx={sx.compose(sx.flexRow, sx.gapMd, LAUNCH_BAR_PAPER_SX)}>
				<Box>
					<Typography variant="subtitle2" sx={LAUNCH_TITLE_SX}>
						You can proceed to your dashboard at any time
					</Typography>
					<Typography variant="body2" sx={SECTION_SUBTITLE_SX}>
						Pending sections will stream in automatically once their builds complete.
					</Typography>
				</Box>
				<ActionButton
					variant="contained"
					endIcon="ArrowForward"
					onClick={onNavigateToDashboard}
					sx={LAUNCH_BUTTON_SX}
				>
					Go to Dashboard
				</ActionButton>
			</Paper>
		</Box>
	);
};

export default AgentWorkspaceGateway;
