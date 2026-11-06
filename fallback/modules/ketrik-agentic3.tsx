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
	LinearProgress,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
} from "@repo/ui/mui";
import { ActionButton, IconButton } from "@repo/ui/mui/@extended";
import { DynamicIcon } from "@repo/ui/elements/dynamic-icon";
import { sx } from "@repo/ui/helpers/sx";


const TEXT_ALIGN_RIGHT_SX = { textAlign: "right" } as const satisfies SxProps<Theme>;

const COLOR_64748B_DISPLAY_BLOCK_MB_0_5_SX = { color: "#64748B", display: "block", mb: 0.5 } as const satisfies SxProps<Theme>;
export interface LogEntry {
	timestamp: string;
	level: "EXEC" | "INFO" | "SYNC" | "WARN";
	text: string;
}

export interface AgentNode {
	id: string;
	code: string;
	name: string;
	domain: string;
	targetDashboard: string;
	status: "SYNTHESIZING" | "INDEXING" | "OPTIMIZING" | "READY";
	load: string;
	tokensSec: number;
	progress: number;
	currentStep: string;
	logs: LogEntry[];
}

const INITIAL_AGENTS: readonly AgentNode[] = [
	{
		id: "agent-01",
		code: "DOSSIER-X1",
		name: "Aura Entity Resolver",
		domain: "Corporate Structure & SEC",
		targetDashboard: "Company Dossier",
		status: "SYNTHESIZING",
		load: "1.42 GB",
		tokensSec: 840,
		progress: 82,
		currentStep: "Reconciling FY25 10-K disclosures with active subsidiaries...",
		logs: [
			{
				timestamp: "21:18:02",
				level: "INFO",
				text: "Initializing EDGAR SEC live feed pipeline",
			},
			{
				timestamp: "21:18:14",
				level: "EXEC",
				text: "Extracting executive compensation & committee charts",
			},
			{
				timestamp: "21:18:31",
				level: "SYNC",
				text: "Mapped 18 global subsidiaries and tax entities",
			},
			{
				timestamp: "21:18:48",
				level: "EXEC",
				text: "Reconciling FY25 10-K disclosures with active subsidiaries...",
			},
		],
	},
	{
		id: "agent-02",
		code: "KPI-VEKTOR",
		name: "Vektor Quant Core",
		domain: "Unit Economics & Telemetry",
		targetDashboard: "KPI Command Grid",
		status: "OPTIMIZING",
		load: "890 MB",
		tokensSec: 1240,
		progress: 94,
		currentStep: "Aggregating cohort CAC-to-LTV payback velocity...",
		logs: [
			{
				timestamp: "21:17:40",
				level: "INFO",
				text: "Ingested 4.2M telemetry rows from primary warehouse",
			},
			{
				timestamp: "21:18:05",
				level: "SYNC",
				text: "Reconciled MRR vs GAAP net subscription revenue",
			},
			{
				timestamp: "21:18:22",
				level: "EXEC",
				text: "Aggregating cohort CAC-to-LTV payback velocity...",
			},
		],
	},
	{
		id: "agent-03",
		code: "SENTINEL-09",
		name: "Sentinel Global Pulse",
		domain: "Industry Wire & Signals",
		targetDashboard: "News & Market Signals",
		status: "INDEXING",
		load: "620 MB",
		tokensSec: 610,
		progress: 58,
		currentStep: "Vectorizing competitor patent applications & PR wires...",
		logs: [
			{
				timestamp: "21:18:10",
				level: "INFO",
				text: "Established socket with 18 international wire feeds",
			},
			{
				timestamp: "21:18:25",
				level: "WARN",
				text: "Anomalous regulatory filing detected in EU-West-1 jurisdiction",
			},
			{
				timestamp: "21:18:40",
				level: "EXEC",
				text: "Vectorizing competitor patent applications & PR wires...",
			},
		],
	},
	{
		id: "agent-04",
		code: "NEXUS-KG",
		name: "Nexus Semantic Graph",
		domain: "Internal Wiki & Files",
		targetDashboard: "Knowledge Base & SOPs",
		status: "READY",
		load: "2.10 GB",
		tokensSec: 0,
		progress: 100,
		currentStep: "Knowledge graph compilation complete. Ready for queries.",
		logs: [
			{
				timestamp: "21:16:50",
				level: "INFO",
				text: "Fetched 850 Notion docs and 120 PDF engineering specs",
			},
			{
				timestamp: "21:17:15",
				level: "SYNC",
				text: "Built cross-document semantic reference matrix",
			},
			{
				timestamp: "21:17:45",
				level: "INFO",
				text: "Knowledge graph compilation complete. Ready for queries.",
			},
		],
	},
];

const ROOT_BOX_SX = {
	minHeight: "100vh",
	bgcolor: "#05070A",
	color: "#E2E8F0",
	p: 3,
} as const satisfies SxProps<Theme>;

const TOP_HUD_PAPER_SX = {
	bgcolor: "#0A0E17",
	border: "1px solid #1E293B",
	p: 2,
	mb: 3,
	borderRadius: 1.5,
} as const satisfies SxProps<Theme>;

const TOP_HUD_ROW_SX = {
	flexDirection: { xs: "column", md: "row" },
	justifyContent: "space-between",
	alignItems: "center",
} as const satisfies SxProps<Theme>;

const HUB_ICON_CONTAINER_SX = {
	p: 1,
	bgcolor: "rgba(56, 189, 248, 0.1)",
	borderRadius: 1,
} as const satisfies SxProps<Theme>;

const HUB_ICON_SX = {
	color: "#38BDF8",
	fontSize: 28,
} as const satisfies SxProps<Theme>;

const HUD_TITLE_SX = {
	fontWeight: 800,
	letterSpacing: "0.05em",
	color: "#F8FAFC",
} as const satisfies SxProps<Theme>;

const HUD_CHIP_ONLINE_SX = {
	bgcolor: "#064E3B",
	color: "#34D399",
	fontWeight: 800,
	fontSize: "0.65rem",
	height: 20,
} as const satisfies SxProps<Theme>;

const HUD_SESSION_TEXT_SX = {
	color: "#64748B",
	fontFamily: "monospace",
} as const satisfies SxProps<Theme>;

const TELEMETRY_BADGES_ROW_SX = {
	alignItems: "center",
} as const satisfies SxProps<Theme>;

const TELEMETRY_LABEL_SX = {
	color: "#64748B",
	display: "block",
} as const satisfies SxProps<Theme>;

const MEMORY_VALUE_SX = {
	fontFamily: "monospace",
	fontWeight: 700,
	color: "#38BDF8",
} as const satisfies SxProps<Theme>;

const VELOCITY_VALUE_SX = {
	fontFamily: "monospace",
	fontWeight: 700,
	color: "#4ADE80",
} as const satisfies SxProps<Theme>;

const TELEMETRY_ICON_BUTTON_SX = {
	color: "#94A3B8",
	border: "1px solid #1E293B",
} as const satisfies SxProps<Theme>;

const MATRIX_LAYOUT_GRID_SX = {
	flexGrow: 1,
} as const satisfies SxProps<Theme>;

const MATRIX_PANEL_PAPER_SX = {
	bgcolor: "#0A0E17",
	border: "1px solid #1E293B",
	borderRadius: 1.5,
	height: "100%",
} as const satisfies SxProps<Theme>;

const MATRIX_PANEL_HEADER_SX = {
	p: 2,
	borderBottom: "1px solid #1E293B",
	justifyContent: "space-between",
	alignItems: "center",
} as const satisfies SxProps<Theme>;

const MEMORY_ICON_SX = {
	color: "#38BDF8",
	fontSize: 20,
} as const satisfies SxProps<Theme>;

const PANEL_TITLE_SX = {
	fontWeight: 700,
	letterSpacing: "0.04em",
} as const satisfies SxProps<Theme>;

const HINT_CAPTION_SX = {
	color: "#64748B",
	fontFamily: "monospace",
} as const satisfies SxProps<Theme>;

const TABLE_CONTAINER_SX = {
	flexGrow: 1,
} as const satisfies SxProps<Theme>;

const TABLE_HEAD_ROW_SX = {
	bgcolor: "#06090F",
} as const satisfies SxProps<Theme>;

const TABLE_HEADER_CELL_SX = {
	color: "#64748B",
	borderColor: "#1E293B",
	fontSize: "0.75rem",
	fontWeight: 700,
} as const satisfies SxProps<Theme>;

const TABLE_BODY_CELL_SX = {
	borderColor: "#1E293B",
	py: 1.8,
} as const satisfies SxProps<Theme>;

const AGENT_CODE_BADGE_SX = {
	fontFamily: "monospace",
	color: "#64748B",
	bgcolor: "#111827",
	px: 0.8,
	borderRadius: 0.5,
} as const satisfies SxProps<Theme>;

const AGENT_DOMAIN_SX = {
	color: "#94A3B8",
} as const satisfies SxProps<Theme>;

const AGENT_DASHBOARD_TITLE_SX = {
	fontWeight: 600,
	color: "#CBD5E1",
} as const satisfies SxProps<Theme>;

const PROGRESS_CELL_SX = {
	borderColor: "#1E293B",
	py: 1.8,
	width: "25%",
} as const satisfies SxProps<Theme>;

const PROGRESS_PERCENT_TEXT_SX = {
	color: "#94A3B8",
	fontFamily: "monospace",
} as const satisfies SxProps<Theme>;

const LINEAR_PROGRESS_SX = {
	height: 4,
	borderRadius: 1,
	bgcolor: "#1E293B",
	"& .MuiLinearProgress-bar": {
		bgcolor: "#38BDF8",
	},
} as const satisfies SxProps<Theme>;

const LINEAR_PROGRESS_DONE_SX = {
	height: 4,
	borderRadius: 1,
	bgcolor: "#1E293B",
	"& .MuiLinearProgress-bar": {
		bgcolor: "#4ADE80",
	},
} as const satisfies SxProps<Theme>;

const CURRENT_STEP_CONTAINER_SX = {
	p: 2,
	borderTop: "1px solid #1E293B",
	bgcolor: "#06090F",
} as const satisfies SxProps<Theme>;

const CURRENT_STEP_TEXT_SX = {
	fontFamily: "monospace",
	color: "#38BDF8",
} as const satisfies SxProps<Theme>;

const TERMINAL_HEADER_SX = {
	p: 2,
	borderBottom: "1px solid #1E293B",
	bgcolor: "#080C14",
	justifyContent: "space-between",
	alignItems: "center",
} as const satisfies SxProps<Theme>;

const TERMINAL_ICON_SX = {
	color: "#4ADE80",
	fontSize: 18,
} as const satisfies SxProps<Theme>;

const TERMINAL_TITLE_SX = {
	fontWeight: 700,
	fontFamily: "monospace",
} as const satisfies SxProps<Theme>;

const STREAMING_DOT_SX = {
	color: "#4ADE80",
	fontSize: 14,
} as const satisfies SxProps<Theme>;

const STREAMING_TEXT_SX = {
	color: "#4ADE80",
	fontFamily: "monospace",
	fontWeight: 700,
} as const satisfies SxProps<Theme>;

const TERMINAL_BODY_SX = {
	flexGrow: 1,
	p: 2,
	bgcolor: "#04060A",
	fontFamily: 'Consolas, Monaco, "Courier New", monospace',
	fontSize: "0.8rem",
	overflowY: "auto",
	minHeight: 320,
	maxHeight: { xs: 350, lg: "unset" },
} as const satisfies SxProps<Theme>;

const LOG_ENTRY_ROW_SX = {
	display: "flex",
} as const satisfies SxProps<Theme>;

const LOG_TIMESTAMP_SX = {
	color: "#475569",
	fontSize: "inherit",
	fontFamily: "inherit",
} as const satisfies SxProps<Theme>;

const LOG_TEXT_SX = {
	color: "#CBD5E1",
	fontSize: "inherit",
	fontFamily: "inherit",
} as const satisfies SxProps<Theme>;

const LOG_LEVEL_BASE_SX = {
	fontWeight: 700,
	fontSize: "inherit",
	fontFamily: "inherit",
} as const satisfies SxProps<Theme>;

const AGENT_ROW_BASE_SX = {
	cursor: "pointer",
	borderLeft: "3px solid transparent",
	"&:hover": {
		bgcolor: "rgba(255, 255, 255, 0.03)",
	},
} as const satisfies SxProps<Theme>;

const AGENT_ROW_SELECTED_SX = {
	bgcolor: "rgba(56, 189, 248, 0.06)",
	borderLeft: "3px solid #38BDF8",
} as const satisfies SxProps<Theme>;

const AGENT_NAME_BASE_SX = {
	fontWeight: 700,
} as const satisfies SxProps<Theme>;

const AGENT_NAME_SELECTED_SX = {
	color: "#38BDF8",
} as const satisfies SxProps<Theme>;

const AGENT_NAME_DEFAULT_SX = {
	color: "#F8FAFC",
} as const satisfies SxProps<Theme>;

const TERMINAL_FOOTER_SX = {
	p: 1.5,
	borderTop: "1px solid #1E293B",
	bgcolor: "#080C14",
	justifyContent: "space-between",
} as const satisfies SxProps<Theme>;

const BOTTOM_BAR_PAPER_SX = {
	bgcolor: "#0A0E17",
	border: "1px solid #1E293B",
	p: 2.5,
	mt: 3,
	borderRadius: 1.5,
} as const satisfies SxProps<Theme>;

const BOTTOM_BAR_ROW_SX = {
	flexDirection: { xs: "column", sm: "row" },
	justifyContent: "space-between",
	alignItems: "center",
} as const satisfies SxProps<Theme>;

const TUNE_ICON_SX = {
	color: "#38BDF8",
} as const satisfies SxProps<Theme>;

const BOTTOM_TITLE_SX = {
	fontWeight: 700,
	color: "#F8FAFC",
} as const satisfies SxProps<Theme>;

const BOTTOM_SUBTITLE_SX = {
	color: "#94A3B8",
} as const satisfies SxProps<Theme>;

const EXPORT_GRAPH_BUTTON_SX = {
	color: "#94A3B8",
	borderColor: "#1E293B",
	textTransform: "none",
	fontFamily: "monospace",
	fontWeight: 600,
	"&:hover": { borderColor: "#475569", bgcolor: "transparent" },
} as const satisfies SxProps<Theme>;

const LAUNCH_BUTTON_SX = {
	bgcolor: "#38BDF8",
	color: "#05070A",
	fontWeight: 800,
	textTransform: "none",
	px: 3,
	"&:hover": { bgcolor: "#7DD3FC" },
} as const satisfies SxProps<Theme>;

const DIVIDER_VERTICAL_SX = {
	height: 28,
	width: "1px",
	bgcolor: "#1E293B",
} as const satisfies SxProps<Theme>;

const CHIP_ICON_READY_SX = {
	fontSize: "14px !important",
} as const satisfies SxProps<Theme>;

const CHIP_ICON_DOT_SX = {
	fontSize: "10px !important",
} as const satisfies SxProps<Theme>;

const CHIP_READY_SX = {
	bgcolor: "rgba(34, 197, 94, 0.15)",
	color: "#4ADE80",
	fontWeight: 700,
	fontSize: "0.7rem",
} as const satisfies SxProps<Theme>;

const CHIP_SYNTH_SX = {
	bgcolor: "rgba(56, 189, 248, 0.15)",
	color: "#38BDF8",
	fontWeight: 700,
	fontSize: "0.7rem",
} as const satisfies SxProps<Theme>;

const CHIP_OPT_SX = {
	bgcolor: "rgba(168, 85, 247, 0.15)",
	color: "#C084FC",
	fontWeight: 700,
	fontSize: "0.7rem",
} as const satisfies SxProps<Theme>;

const CHIP_INDEX_SX = {
	bgcolor: "rgba(250, 204, 21, 0.15)",
	color: "#FACC15",
	fontWeight: 700,
	fontSize: "0.7rem",
} as const satisfies SxProps<Theme>;

const getStatusChip = (status: AgentNode["status"]) => {
	switch (status) {
		case "READY":
			return (
				<Chip
					size="small"
					icon={<DynamicIcon name="CheckCircleOutlined" sx={CHIP_ICON_READY_SX} />}
					label="READY"
					sx={CHIP_READY_SX}
				/>
			);
		case "SYNTHESIZING":
			return (
				<Chip
					size="small"
					icon={<DynamicIcon name="FiberManualRecord" sx={CHIP_ICON_DOT_SX} />}
					label="SYNTHESIZING"
					sx={CHIP_SYNTH_SX}
				/>
			);
		case "OPTIMIZING":
			return (
				<Chip
					size="small"
					icon={<DynamicIcon name="FiberManualRecord" sx={CHIP_ICON_DOT_SX} />}
					label="OPTIMIZING"
					sx={CHIP_OPT_SX}
				/>
			);
		case "INDEXING":
		default:
			return (
				<Chip
					size="small"
					icon={<DynamicIcon name="FiberManualRecord" sx={CHIP_ICON_DOT_SX} />}
					label="INDEXING"
					sx={CHIP_INDEX_SX}
				/>
			);
	}
};

interface AgentTableRowProps {
	readonly agent: AgentNode;
	readonly isSelected: boolean;
	readonly onSelect: (id: string) => void;
}

function AgentTableRow({ agent, isSelected, onSelect }: AgentTableRowProps) {
	const handleClick = () => onSelect(agent.id);

	return (
		<TableRow
			hover
			onClick={handleClick}
			sx={sx.compose(AGENT_ROW_BASE_SX, isSelected && AGENT_ROW_SELECTED_SX)}
		>
			<TableCell sx={TABLE_BODY_CELL_SX}>
				<Box sx={sx.flexCol}>
					<Box sx={sx.compose(sx.flexRow, sx.gapXs)}>
						<Typography
							variant="body2"
							sx={sx.compose(
								AGENT_NAME_BASE_SX,
								isSelected ? AGENT_NAME_SELECTED_SX : AGENT_NAME_DEFAULT_SX,
							)}
						>
							{agent.name}
						</Typography>
						<Typography variant="caption" sx={AGENT_CODE_BADGE_SX}>
							{agent.code}
						</Typography>
					</Box>
					<Typography variant="caption" sx={AGENT_DOMAIN_SX}>
						{agent.domain}
					</Typography>
				</Box>
			</TableCell>

			<TableCell sx={TABLE_BODY_CELL_SX}>
				<Typography variant="body2" sx={AGENT_DASHBOARD_TITLE_SX}>
					{agent.targetDashboard}
				</Typography>
				<Typography variant="caption" sx={HINT_CAPTION_SX}>
					{agent.load} | {agent.tokensSec} T/s
				</Typography>
			</TableCell>

			<TableCell sx={TABLE_BODY_CELL_SX}>
				{getStatusChip(agent.status)}
			</TableCell>

			<TableCell sx={PROGRESS_CELL_SX}>
				<Box sx={sx.flexCol}>
					<Box
						sx={sx.compose(sx.flexRow, {
							justifyContent: "space-between",
						})}
					>
						<Typography variant="caption" sx={PROGRESS_PERCENT_TEXT_SX}>
							{agent.progress}%
						</Typography>
					</Box>
					<LinearProgress
						variant="determinate"
						value={agent.progress}
						sx={
							agent.progress === 100
								? PROGRESS_BAR_DONE_SX
								: PROGRESS_BAR_ACTIVE_SX
						}
					/>
				</Box>
			</TableCell>
		</TableRow>
	);
}

const getLogLevelColor = (level: LogEntry["level"]): string => {
	switch (level) {
		case "WARN":
			return "#FACC15";
		case "SYNC":
			return "#C084FC";
		case "EXEC":
		default:
			return "#38BDF8";
	}
};

export const MissionControlGateway: React.FC = () => {
	const [agents, setAgents] = useState<AgentNode[]>([...INITIAL_AGENTS]);
	const [selectedAgentId, setSelectedAgentId] = useState<string>("agent-01");
	const [isLiveStream, setIsLiveStream] = useState<boolean>(true);
	const terminalEndRef = useRef<HTMLDivElement>(null);

	const activeAgent = agents.find((a) => a.id === selectedAgentId) ?? agents[0]!;

	useEffect(() => {
		if (!isLiveStream) return;
		const interval = setInterval(() => {
			setAgents((prev) =>
				prev.map((agent) => {
					if (agent.progress >= 100) return agent;
					const inc = Math.floor(Math.random() * 3) + 1;
					const nextProg = Math.min(100, agent.progress + inc);
					const isDone = nextProg === 100;

					return {
						...agent,
						progress: nextProg,
						status: isDone ? "READY" : agent.status,
						tokensSec: isDone ? 0 : Math.floor(Math.random() * 400) + 600,
						currentStep: isDone ? "Module compiled & cached." : agent.currentStep,
					};
				}),
			);
		}, 2000);
		return () => clearInterval(interval);
	}, [isLiveStream]);

	useEffect(() => {
		terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [activeAgent.logs]);

	return (
		<Box sx={sx.compose(sx.flexCol, ROOT_BOX_SX)}>
			{/* Top HUD Operations Bar */}
			<Paper sx={TOP_HUD_PAPER_SX}>
				<Box sx={sx.compose(sx.flexRow, sx.gapMd, TOP_HUD_ROW_SX)}>
					<Box sx={sx.compose(sx.flexRow, sx.gapMd)}>
						<Box sx={HUB_ICON_CONTAINER_SX}>
							<DynamicIcon name="Hub" sx={HUB_ICON_SX} />
						</Box>
						<Box>
							<Box sx={sx.compose(sx.flexRow, sx.gapSm)}>
								<Typography variant="subtitle1" sx={HUD_TITLE_SX}>
									MISSION CONTROL // PRE-FLIGHT ORCHESTRATION
								</Typography>
								<Chip label="ONLINE" size="small" sx={HUD_CHIP_ONLINE_SX} />
							</Box>
							<Typography variant="caption" sx={HUD_SESSION_TEXT_SX}>
								SESSION_ID: ORCH-9812-BETA | ACTIVE_MESH: 4 NODES | CLUSTER:
								US-EAST-ENTERPRISE
							</Typography>
						</Box>
					</Box>

					{/* Real-time telemetry badges */}
					<Box sx={sx.compose(sx.flexRow, sx.gapMd, TELEMETRY_BADGES_ROW_SX)}>
						<Box sx={TEXT_ALIGN_RIGHT_SX}>
							<Typography variant="caption" sx={TELEMETRY_LABEL_SX}>
								TOTAL MEMORY
							</Typography>
							<Typography variant="body2" sx={MEMORY_VALUE_SX}>
								5.03 GB ALLOCATED
							</Typography>
						</Box>
						<Box sx={DIVIDER_VERTICAL_SX} />
						<Box sx={TEXT_ALIGN_RIGHT_SX}>
							<Typography variant="caption" sx={TELEMETRY_LABEL_SX}>
								MESH VELOCITY
							</Typography>
							<Typography variant="body2" sx={VELOCITY_VALUE_SX}>
								2,690 TOKENS/S
							</Typography>
						</Box>
						<Box sx={DIVIDER_VERTICAL_SX} />
						<Box sx={sx.compose(sx.flexRow, sx.gapXs)}>
							<Tooltip title={isLiveStream ? "Pause Telemetry" : "Resume Telemetry"}>
								<IconButton
									size="small"
									onClick={() => setIsLiveStream((prev) => !prev)}
									sx={TELEMETRY_ICON_BUTTON_SX}
									icon={isLiveStream ? "Pause" : "PlayArrow"}
								/>
							</Tooltip>
							<Tooltip title="Re-sync All Nodes">
								<IconButton size="small" sx={TELEMETRY_ICON_BUTTON_SX} icon="Refresh" />
							</Tooltip>
						</Box>
					</Box>
				</Box>
			</Paper>

			{/* Main Operations Matrix Layout */}
			<Grid container spacing={3} sx={MATRIX_LAYOUT_GRID_SX}>
				{/* Left Matrix: Agent Nodes Table & Pipeline Grid */}
				<Grid size={{ xs: 12, lg: 7 }}>
					<Paper sx={sx.compose(sx.flexCol, MATRIX_PANEL_PAPER_SX)}>
						<Box sx={sx.compose(sx.flexRow, MATRIX_PANEL_HEADER_SX)}>
							<Box sx={sx.compose(sx.flexRow, sx.gapXs)}>
								<DynamicIcon name="Memory" sx={MEMORY_ICON_SX} />
								<Typography variant="subtitle2" sx={PANEL_TITLE_SX}>
									ACTIVE AGENT WORKSPACE BUILDERS
								</Typography>
							</Box>
							<Typography variant="caption" sx={HINT_CAPTION_SX}>
								CLICK NODE TO STREAM TRACE
							</Typography>
						</Box>

						<TableContainer sx={TABLE_CONTAINER_SX}>
							<Table size="small">
								<TableHead sx={TABLE_HEAD_ROW_SX}>
									<TableRow>
										<TableCell sx={TABLE_HEADER_CELL_SX}>
											NODE / AGENT
										</TableCell>
										<TableCell sx={TABLE_HEADER_CELL_SX}>
											TARGET DASHBOARD
										</TableCell>
										<TableCell sx={TABLE_HEADER_CELL_SX}>STATUS</TableCell>
										<TableCell sx={TABLE_HEADER_CELL_SX}>SYNTHESIS</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{agents.map((agent) => (
										<AgentTableRow
											key={agent.id}
											agent={agent}
											isSelected={agent.id === selectedAgentId}
											onSelect={setSelectedAgentId}
										/>
									))}
								</TableBody>
							</Table>
						</TableContainer>

						{/* Selected Node Realtime Action Bar */}
						<Box sx={CURRENT_STEP_CONTAINER_SX}>
							<Typography
								variant="caption"
								sx={COLOR_64748B_DISPLAY_BLOCK_MB_0_5_SX}
							>
								CURRENT STEP ({activeAgent.code}):
							</Typography>
							<Typography variant="body2" sx={CURRENT_STEP_TEXT_SX}>
								&gt; {activeAgent.currentStep}
							</Typography>
						</Box>
					</Paper>
				</Grid>

				{/* Right Matrix: Dedicated Realtime Telemetry Terminal */}
				<Grid size={{ xs: 12, lg: 5 }}>
					<Paper sx={sx.compose(sx.flexCol, MATRIX_PANEL_PAPER_SX)}>
						<Box sx={sx.compose(sx.flexRow, TERMINAL_HEADER_SX)}>
							<Box sx={sx.compose(sx.flexRow, sx.gapXs)}>
								<DynamicIcon name="Terminal" sx={TERMINAL_ICON_SX} />
								<Typography variant="subtitle2" sx={TERMINAL_TITLE_SX}>
									TRACE://{activeAgent.code}
								</Typography>
							</Box>
							<Box sx={sx.compose(sx.flexRow, sx.gapXs)}>
								<DynamicIcon name="RadioButtonChecked" sx={STREAMING_DOT_SX} />
								<Typography variant="caption" sx={STREAMING_TEXT_SX}>
									STREAMING
								</Typography>
							</Box>
						</Box>

						{/* Terminal Body */}
						<Box sx={TERMINAL_BODY_SX}>
							<Box sx={sx.compose(sx.flexCol, sx.gapXs)}>
								{activeAgent.logs.map((log, idx) => (
									<Box key={idx} sx={sx.compose(sx.gapXs, LOG_ENTRY_ROW_SX)}>
										<Typography component="span" sx={LOG_TIMESTAMP_SX}>
											[{log.timestamp}]
										</Typography>
										<Typography
											component="span"
											sx={sx.compose(LOG_LEVEL_BASE_SX, {
												color: getLogLevelColor(log.level),
											})}
										>
											{log.level}
										</Typography>
										<Typography component="span" sx={LOG_TEXT_SX}>
											{log.text}
										</Typography>
									</Box>
								))}
								<div ref={terminalEndRef} />
							</Box>
						</Box>

						{/* Terminal Footer Info */}
						<Box sx={sx.compose(sx.flexRow, TERMINAL_FOOTER_SX)}>
							<Typography variant="caption" sx={HINT_CAPTION_SX}>
								MEMORY: {activeAgent.load}
							</Typography>
							<Typography variant="caption" sx={HINT_CAPTION_SX}>
								BUFFER: 512KB / FLUSH: AUTO
							</Typography>
						</Box>
					</Paper>
				</Grid>
			</Grid>

			{/* Bottom Mission Launch Trigger Bar */}
			<Paper sx={BOTTOM_BAR_PAPER_SX}>
				<Box sx={sx.compose(sx.flexRow, sx.gapMd, BOTTOM_BAR_ROW_SX)}>
					<Box sx={sx.compose(sx.flexRow, sx.gapSm)}>
						<DynamicIcon name="Tune" sx={TUNE_ICON_SX} />
						<Box>
							<Typography variant="subtitle2" sx={BOTTOM_TITLE_SX}>
								ALL CRITICAL SECTIONS INITIALIZED
							</Typography>
							<Typography variant="caption" sx={BOTTOM_SUBTITLE_SX}>
								4 Agents will continue background synthesis inside the target
								dashboard view.
							</Typography>
						</Box>
					</Box>
					<Box sx={sx.compose(sx.flexRow, sx.gapMd)}>
						<Button variant="outlined" sx={EXPORT_GRAPH_BUTTON_SX}>
							Export System Graph
						</Button>
						<ActionButton
							variant="contained"
							endIcon="RocketLaunch"
							sx={LAUNCH_BUTTON_SX}
						>
							Enter Dashboard Command Center
						</ActionButton>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
};

export default MissionControlGateway;
