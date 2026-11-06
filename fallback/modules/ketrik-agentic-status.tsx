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
	TableRow,
	Avatar,
	Tooltip,
	CircularProgress,
} from "@repo/ui/mui";
import { IconButton, Link } from "@repo/ui/mui/@extended";
import { sx } from "@repo/ui/helpers/sx";
import { formatTimeAgo } from "@repo/ui/helpers/time";
import { DynamicIcon } from "@repo/ui/elements/dynamic-icon";


const COLOR_TEXT_SECONDARY_SX = { color: "text.secondary" } as const satisfies SxProps<Theme>;

const FONT_SIZE_1REM_SX = { fontSize: "1rem" } as const satisfies SxProps<Theme>;

const FONT_SIZE_13PX_IMPORTANT_ML_0_5_SX = { fontSize: "13px !important", ml: 0.5 } as const satisfies SxProps<Theme>;
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
	icon?: string;
	iconKey?: string;
	isReady: boolean;
	status?:
		| "pending"
		| "processing"
		| "running"
		| "done"
		| "ready"
		| "error"
		| "failed"
		| "stuck"
		| string;
	runCount?: number;
	lastRunAt?: string;
	lastUpdated: string;
	currentNarration?: string;
	logs: AgentLog[];
}

export type UserWorkspaceAgentsDataDoc =
	Record<string, WorkspaceAgent> | { agents?: Record<string, WorkspaceAgent> | WorkspaceAgent[] };

const EMPTY_STATE_CONTAINER_SX = {
	p: 4,
	textAlign: "center",
	bgcolor: "background.paper",
	borderRadius: 2,
	borderColor: "divider",
	alignItems: "center",
	justifyContent: "center",
	minHeight: 280,
	position: "relative",
	overflow: "hidden",
} as const satisfies SxProps<Theme>;

const RADAR_PULSE_CONTAINER_SX = {
	position: "relative",
	width: 64,
	height: 64,
	mb: 2.5,
	alignItems: "center",
	justifyContent: "center",
} as const satisfies SxProps<Theme>;

const RADAR_RING_OUTER_SX = {
	position: "absolute",
	inset: 0,
	borderRadius: "50%",
	bgcolor: "primary.main",
	opacity: 0.15,
	animation: "agentRadarPulse 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite",
	"@keyframes agentRadarPulse": {
		"0%": {
			transform: "scale(0.8)",
			opacity: 0.5,
		},
		"100%": {
			transform: "scale(1.8)",
			opacity: 0,
		},
	},
} as const satisfies SxProps<Theme>;

const RADAR_RING_INNER_SX = {
	position: "absolute",
	inset: 4,
	borderRadius: "50%",
	bgcolor: "primary.main",
	opacity: 0.25,
	animation: "agentRadarPulse 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite",
	animationDelay: "0.8s",
	"@keyframes agentRadarPulse": {
		"0%": {
			transform: "scale(0.8)",
			opacity: 0.5,
		},
		"100%": {
			transform: "scale(1.8)",
			opacity: 0,
		},
	},
} as const satisfies SxProps<Theme>;

const EMPTY_STATE_ICON_BOX_SX = {
	width: 48,
	height: 48,
	borderRadius: "50%",
	bgcolor: "primary.main",
	color: "primary.contrastText",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	zIndex: 1,
	boxShadow: (theme: Theme) =>
		`0 0 16px ${theme.palette.mode === "dark" ? "rgba(25, 118, 210, 0.5)" : "rgba(25, 118, 210, 0.3)"}`,
} as const satisfies SxProps<Theme>;

const EMPTY_STATE_STATUS_BADGE_SX = {
	alignItems: "center",
	mb: 1,
} as const satisfies SxProps<Theme>;

const STATUS_INDICATOR_DOT_SX = {
	width: 8,
	height: 8,
	borderRadius: "50%",
	bgcolor: "primary.main",
	animation: "pulseDot 1.6s ease-in-out infinite alternate",
	"@keyframes pulseDot": {
		"0%": { opacity: 0.4, transform: "scale(0.85)" },
		"100%": { opacity: 1, transform: "scale(1.15)" },
	},
} as const satisfies SxProps<Theme>;

const EMPTY_STATE_TITLE_SX = {
	fontWeight: 600,
	letterSpacing: "0.01em",
} as const satisfies SxProps<Theme>;

const EMPTY_STATE_DESC_SX = {
	color: "text.secondary",
	maxWidth: 440,
} as const satisfies SxProps<Theme>;

const ROOT_BOX_SX = {
	width: "100%",
	py: 2,
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
	minHeight: 320,
	maxHeight: 320,
	overflowY: "auto",
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

const LOG_SUCCESS_TEXT_SX = {
	color: "success.main",
	fontSize: "inherit",
	fontFamily: "inherit",
	wordBreak: "break-word",
	fontWeight: 600,
} as const satisfies SxProps<Theme>;

const LOG_ERROR_TEXT_SX = {
	color: "error.main",
	fontSize: "inherit",
	fontFamily: "inherit",
	wordBreak: "break-word",
	fontWeight: 600,
} as const satisfies SxProps<Theme>;

const LOG_READY_LINK_SX = {
	color: "primary.main",
	fontSize: "inherit",
	fontFamily: "inherit",
	display: "inline-flex",
	alignItems: "center",
	fontWeight: 600,
} as const satisfies SxProps<Theme>;

const WS_LINK_ICON_SX = {
	fontSize: "13px !important",
	ml: 0.5,
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

export interface AgentWorkspaceGatewayProps {
	data?: UserWorkspaceAgentsDataDoc;
	onNavigateToDashboard?: () => void;
}

export const AgentWorkspaceGateway: React.FC<AgentWorkspaceGatewayProps> = ({
	data,
	onNavigateToDashboard,
}) => {
	// Normalize agents from flat root-level keys (or legacy { agents: ... } envelope)
	let agents: WorkspaceAgent[] = [];

	if (data) {
		if ("agents" in data && data.agents) {
			agents = Array.isArray(data.agents) ? data.agents : Object.values(data.agents);
		} else {
			agents = Object.values(data).filter(
				(val): val is WorkspaceAgent =>
					Boolean(val) && typeof val === "object" && "id" in (val as Record<string, unknown>),
			);
		}
	}

	const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0]?.id ?? "");
	const terminalBottomRef = useRef<HTMLDivElement>(null);

	const selectedAgent = agents.find((a) => a.id === selectedAgentId) ?? agents[0];

	useEffect(() => {
		if (agents.length > 0 && !agents.some((a) => a.id === selectedAgentId)) {
			setSelectedAgentId(agents[0]!.id);
		}
	}, [agents, selectedAgentId]);

	useEffect(() => {
		if (selectedAgent?.logs) {
			terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [selectedAgent?.logs]);

	if (agents.length === 0) {
		return (
			<Box sx={ROOT_BOX_SX}>
				<Paper variant="outlined" sx={sx.compose(sx.flexCol, EMPTY_STATE_CONTAINER_SX)}>
					<Box sx={sx.compose(sx.flexRow, RADAR_PULSE_CONTAINER_SX)}>
						<Box sx={RADAR_RING_OUTER_SX} />
						<Box sx={RADAR_RING_INNER_SX} />
						<Box sx={sx.compose(sx.flexRow, EMPTY_STATE_ICON_BOX_SX)}>
							<DynamicIcon name="Terminal" fontSize="medium" />
						</Box>
					</Box>
					<Box sx={sx.compose(sx.flexRow, sx.gapXs, EMPTY_STATE_STATUS_BADGE_SX)}>
						<Box sx={STATUS_INDICATOR_DOT_SX} />
						<Typography variant="subtitle1" sx={EMPTY_STATE_TITLE_SX}>
							Connecting to Workspace Agents...
						</Typography>
					</Box>
					<Typography variant="body2" sx={EMPTY_STATE_DESC_SX}>
						Listening for active background agents. Live telemetry and execution logs
						will stream here automatically as tasks are initiated.
					</Typography>
				</Paper>
			</Box>
		);
	}

	return (
		<Box sx={ROOT_BOX_SX}>
			{/* Main Grid: Agent Table & Live Console */}
			<Grid container spacing={2.5}>
				{/* Agent Task Matrix */}
				<Grid size={{ xs: 12, lg: 7 }}>
					<Paper variant="outlined" sx={sx.compose(sx.flexCol, PANEL_CARD_SX)}>
						<Box sx={sx.compose(sx.flexRow, PANEL_HEADER_SX)}>
							<Typography variant="subtitle2" sx={PANEL_TITLE_SX}>
								Agentic Workflows
							</Typography>
							<Tooltip title="Refresh Agent Tasks">
								<IconButton size="small" color="inherit" icon="Refresh" />
							</Tooltip>
						</Box>

						<TableContainer sx={TABLE_CONTAINER_SX}>
							<Table size="medium">
								<TableBody>
									{agents.map((agent) => {
										const isSelected = agent.id === selectedAgentId;
										const iconName =
											agent.icon ||
											agent.iconKey ||
											agent.id ||
											"TerminalIcon";
										// Determine status accurately:
										// 1. Explicit ready or isReady boolean
										const isDone =
											agent.isReady ||
											agent.status === "done" ||
											agent.status === "ready";
										// 2. Explicit running/processing status (or in-progress timestamp without completion)
										const isProcessing =
											!isDone &&
											(agent.status === "processing" ||
												agent.status === "pending" ||
												agent.status === "running" ||
												agent.lastUpdated === "In progress");
										// 3. Failed status only if explicitly marked as error/failed or terminated with error
										const lastLog =
											agent.logs && agent.logs.length > 0
												? agent.logs[agent.logs.length - 1]
												: undefined;
										const isFailed =
											!isDone &&
											!isProcessing &&
											(agent.status === "error" ||
												agent.status === "failed" ||
												lastLog?.type === "error");

										return (
											<TableRow
												key={agent.id}
												hover
												onClick={() => setSelectedAgentId(agent.id)}
												sx={sx.compose(
													AGENT_ROW_SX,
													isSelected && AGENT_ROW_SELECTED_SX,
												)}
											>
												<TableCell sx={TABLE_BODY_CELL_SX}>
													<Box sx={sx.compose(sx.flexRow, sx.gapSm)}>
														<Avatar
															variant="rounded"
															sx={sx.compose(
																AGENT_AVATAR_SX,
																isSelected
																	? AGENT_AVATAR_SELECTED_SX
																	: AGENT_AVATAR_DEFAULT_SX,
															)}
														>
															<DynamicIcon
																name={iconName}
																fontSize="small"
																fallbackIcon={
																	<DynamicIcon name="Terminal" fontSize="small" />
																}
															/>
														</Avatar>
														<Box>
															<Typography
																variant="body2"
																sx={AGENT_TITLE_SX}
															>
																{agent.id}
															</Typography>
															<Typography
																variant="caption"
																sx={SECTION_SUBTITLE_SX}
															>
																{agent.description}
															</Typography>
														</Box>
													</Box>
												</TableCell>

												<TableCell sx={TABLE_BODY_CELL_SX}>
													{isDone ? (
														<Chip
															icon={
																<DynamicIcon
																	name="CheckCircleOutlined"
																	sx={CHIP_READY_ICON_SX}
																/>
															}
															label="Ready"
															size="small"
															color="success"
															variant="outlined"
															sx={STATUS_CHIP_SX}
														/>
													) : isFailed ? (
														<Chip
															icon={
																<DynamicIcon
																	name="ErrorOutlined"
																	sx={CHIP_READY_ICON_SX}
																/>
															}
															label="Failed"
															size="small"
															color="error"
															variant="outlined"
															sx={STATUS_CHIP_SX}
														/>
													) : (
														<Chip
															icon={
																<CircularProgress
																	size={11}
																	color="inherit"
																/>
															}
															label="Running"
															size="small"
															color="warning"
															variant="outlined"
															sx={STATUS_CHIP_SX}
														/>
													)}
												</TableCell>

												<TableCell sx={TABLE_BODY_CELL_RIGHT_SX}>
													<Typography
														variant="caption"
														sx={SECTION_SUBTITLE_SX}
													>
														{isDone || isFailed
															? formatTimeAgo(agent.lastUpdated)
															: "In progress"}
													</Typography>
												</TableCell>
											</TableRow>
										);
									})}
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
								{selectedAgent.logs.map((log, index) => {
									const isLastLog = index === selectedAgent.logs.length - 1;
									const isWs = selectedAgent.id.startsWith("workspace_");
									const wsSlug = isWs
										? selectedAgent.id.replace(/^workspace_/, "")
										: "";
									const wsHref = isWs ? `/workspace/${wsSlug}` : undefined;
									const showWsLink = isLastLog && selectedAgent.isReady && wsHref;

									return (
										<Box key={index} sx={sx.compose(sx.gapSm, LOG_ENTRY_ROW_SX)}>
											<Typography component="span" sx={LOG_TIMESTAMP_SX}>
												[{log.timestamp}]
											</Typography>
											{log.type === "narration" ? (
												<Typography
													component="span"
													sx={LOG_NARRATION_TEXT_SX}
												>
													💬 {log.message}
												</Typography>
											) : log.type === "success" ? (
												<Box
													sx={sx.compose(sx.flexRow, sx.gapXs, {
														alignItems: "center",
														flexWrap: "wrap",
													})}
												>
													<Typography
														component="span"
														sx={LOG_SUCCESS_TEXT_SX}
													>
														✓ {log.message}
													</Typography>
													{showWsLink && (
														<Link href={wsHref} sx={LOG_READY_LINK_SX}>
															Open {wsHref}
															<DynamicIcon name="OpenInNew" sx={WS_LINK_ICON_SX} />
														</Link>
													)}
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
														sx={LOG_ERROR_TEXT_SX}
													>
														✕ {log.message}
													</Typography>
												</Box>
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
													<Typography
														component="span"
														sx={LOG_MESSAGE_SX}
													>
														{log.message}
													</Typography>
												</Box>
											) : (
												<Box
													sx={sx.compose(sx.flexRow, sx.gapXs, {
														alignItems: "center",
														flexWrap: "wrap",
													})}
												>
													<Typography
														component="span"
														sx={LOG_MESSAGE_SX}
													>
														{log.message}
													</Typography>
													{showWsLink && (
														<Link href={wsHref} sx={LOG_READY_LINK_SX}>
															Open {wsHref}
															<DynamicIcon name="OpenInNew" sx={WS_LINK_ICON_SX} />
														</Link>
													)}
												</Box>
											)}
										</Box>
									);
								})}
								{selectedAgent.isReady &&
									selectedAgent.id.startsWith("workspace_") &&
									selectedAgent.logs.length === 0 && (
										<Box sx={sx.compose(sx.gapSm, LOG_ENTRY_ROW_SX)}>
											<Typography component="span" sx={LOG_SUCCESS_TEXT_SX}>
												✓ Workspace ready:
											</Typography>
											<Link
												href={`/workspace/${selectedAgent.id.replace(/^workspace_/, "")}`}
												sx={LOG_READY_LINK_SX}
											>
												Open /workspace/
												{selectedAgent.id.replace(/^workspace_/, "")}
												<DynamicIcon
													name="OpenInNew"
													sx={FONT_SIZE_13PX_IMPORTANT_ML_0_5_SX}
												/>
											</Link>
										</Box>
									)}
								<div ref={terminalBottomRef} />
							</Box>
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
};

export default AgentWorkspaceGateway;
