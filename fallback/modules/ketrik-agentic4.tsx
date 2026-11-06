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
export interface AgentLog {
	timestamp: string;
	message: string;
}

export interface WorkspaceAgent {
	id: string;
	name: string;
	moduleTarget: string;
	description: string;
	isReady: boolean;
	lastUpdated: string;
	icon: React.ReactNode;
	logs: AgentLog[];
}

const INITIAL_AGENTS: readonly WorkspaceAgent[] = [
	{
		id: "agent-1",
		name: "Dossier Builder",
		moduleTarget: "Company Dossier",
		description: "SEC filings, executive leadership & entity structure",
		isReady: true,
		lastUpdated: "1 min ago",
		icon: <DynamicIcon name="CorporateFare" fontSize="small" />,
		logs: [
			{ timestamp: "10:24:12", message: "Connected to corporate repository" },
			{ timestamp: "10:24:45", message: "Reconciled 10-K disclosures and leadership charts" },
			{ timestamp: "10:25:01", message: "Company Dossier module ready" },
		],
	},
	{
		id: "agent-2",
		name: "KPI & Metrics Engine",
		moduleTarget: "Financial & Product KPIs",
		description: "Revenue cohorts, ARR velocity, retention & CAC payback",
		isReady: false,
		lastUpdated: "In progress",
		icon: <DynamicIcon name="Timeline" fontSize="small" />,
		logs: [
			{ timestamp: "10:25:10", message: "Querying telemetry data warehouse" },
			{ timestamp: "10:25:32", message: "Computing multi-region revenue runs..." },
		],
	},
	{
		id: "agent-3",
		name: "Industry Pulse Monitor",
		moduleTarget: "News & Market Signals",
		description: "Competitor PR, market shifts & global regulatory updates",
		isReady: true,
		lastUpdated: "Just now",
		icon: <DynamicIcon name="Public" fontSize="small" />,
		logs: [
			{ timestamp: "10:23:05", message: "Subscribed to 14 industry feeds" },
			{
				timestamp: "10:24:18",
				message: "Indexed latest earnings transcripts and news feeds",
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
		icon: <DynamicIcon name="MenuBook" fontSize="small" />,
		logs: [
			{ timestamp: "10:25:02", message: "Syncing Notion and Drive documentation" },
			{ timestamp: "10:25:40", message: "Generating vector search embeddings..." },
		],
	},
];

const ROOT_BOX_SX = {
	minHeight: "100vh",
	bgcolor: "background.default",
} as const satisfies SxProps<Theme>;

const HEADER_PAPER_SX = {
	py: 1.5,
	px: 3,
	borderBottom: 1,
	borderColor: "divider",
	bgcolor: "background.paper",
	borderRadius: 0,
} as const satisfies SxProps<Theme>;

const HEADER_ROW_SX = {
	justifyContent: "space-between",
	alignItems: "center",
} as const satisfies SxProps<Theme>;

const LOGO_AVATAR_SX = {
	bgcolor: "primary.main",
	color: "primary.contrastText",
	width: 36,
	height: 36,
} as const satisfies SxProps<Theme>;

const HEADER_TITLE_SX = {
	fontWeight: 700,
	lineHeight: 1.2,
} as const satisfies SxProps<Theme>;

const HEADER_SUBTITLE_SX = {
	color: "text.secondary",
} as const satisfies SxProps<Theme>;

const MODULES_READY_CHIP_SX = {
	fontWeight: 600,
	fontSize: "0.75rem",
} as const satisfies SxProps<Theme>;

const USER_AVATAR_SX = {
	width: 32,
	height: 32,
	fontSize: "0.85rem",
	bgcolor: "secondary.main",
} as const satisfies SxProps<Theme>;

const USER_INFO_BOX_SX = {
	display: { xs: "none", sm: "block" },
} as const satisfies SxProps<Theme>;

const USER_NAME_SX = {
	fontWeight: 600,
	lineHeight: 1.2,
} as const satisfies SxProps<Theme>;

const MAIN_BODY_SX = {
	p: { xs: 2, md: 4 },
	maxWidth: 1400,
	width: "100%",
	mx: "auto",
	flexGrow: 1,
} as const satisfies SxProps<Theme>;

const SECTION_TITLE_CONTAINER_SX = {
	mb: 3,
} as const satisfies SxProps<Theme>;

const SECTION_TITLE_SX = {
	fontWeight: 700,
	mb: 0.5,
} as const satisfies SxProps<Theme>;

const SECTION_SUBTITLE_SX = {
	color: "text.secondary",
} as const satisfies SxProps<Theme>;

const MATRIX_CARD_PAPER_SX = {
	borderRadius: 2,
	overflow: "hidden",
	bgcolor: "background.paper",
	height: "100%",
} as const satisfies SxProps<Theme>;

const MATRIX_CARD_HEADER_SX = {
	p: 2,
	justifyContent: "space-between",
	alignItems: "center",
	borderBottom: 1,
	borderColor: "divider",
} as const satisfies SxProps<Theme>;

const MATRIX_CARD_TITLE_SX = {
	fontWeight: 700,
} as const satisfies SxProps<Theme>;

const TABLE_CONTAINER_SX = {
	flexGrow: 1,
} as const satisfies SxProps<Theme>;

const TABLE_HEAD_ROW_SX = {
	bgcolor: (theme: Theme) =>
		theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.02)",
} as const satisfies SxProps<Theme>;

const TABLE_HEADER_CELL_SX = {
	fontWeight: 700,
	fontSize: "0.75rem",
} as const satisfies SxProps<Theme>;

const TABLE_HEADER_CELL_RIGHT_SX = {
	fontWeight: 700,
	fontSize: "0.75rem",
	textAlign: "right",
} as const satisfies SxProps<Theme>;

const TABLE_BODY_CELL_SX = {
	py: 2,
} as const satisfies SxProps<Theme>;

const TABLE_BODY_CELL_RIGHT_SX = {
	py: 2,
	textAlign: "right",
} as const satisfies SxProps<Theme>;

const AGENT_ROW_SX = {
	cursor: "pointer",
	"&:hover": {
		bgcolor: (theme: Theme) =>
			theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)",
	},
} as const satisfies SxProps<Theme>;

const AGENT_ROW_SELECTED_SX = {
	bgcolor: (theme: Theme) =>
		theme.palette.mode === "dark" ? "rgba(56, 189, 248, 0.08)" : "rgba(2, 132, 199, 0.06)",
} as const satisfies SxProps<Theme>;

const AGENT_ICON_AVATAR_SX = {
	width: 32,
	height: 32,
} as const satisfies SxProps<Theme>;

const AGENT_ICON_SELECTED_SX = {
	bgcolor: "primary.main",
	color: "primary.contrastText",
} as const satisfies SxProps<Theme>;

const AGENT_ICON_DEFAULT_SX = {
	bgcolor: "action.selected",
} as const satisfies SxProps<Theme>;

const AGENT_MODULE_TITLE_SX = {
	fontWeight: 600,
} as const satisfies SxProps<Theme>;

const CHIP_ICON_READY_SX = {
	fontSize: "16px !important",
} as const satisfies SxProps<Theme>;

const STATUS_CHIP_SX = {
	fontWeight: 600,
	fontSize: "0.75rem",
} as const satisfies SxProps<Theme>;

const TERMINAL_CARD_PAPER_SX = {
	borderRadius: 2,
	overflow: "hidden",
	bgcolor: "background.paper",
	height: "100%",
} as const satisfies SxProps<Theme>;

const TERMINAL_CARD_HEADER_SX = {
	p: 2,
	borderBottom: 1,
	borderColor: "divider",
	alignItems: "center",
	justifyContent: "space-between",
} as const satisfies SxProps<Theme>;

const TERMINAL_BODY_CONTAINER_SX = {
	p: 2,
	flexGrow: 1,
	bgcolor: (theme: Theme) => (theme.palette.mode === "dark" ? "#0A0E14" : "#F8FAFC"),
	fontFamily: "monospace",
	fontSize: "0.8rem",
	overflowY: "auto",
	minHeight: 240,
} as const satisfies SxProps<Theme>;

const LOG_ENTRY_ROW_SX = {
	display: "flex",
} as const satisfies SxProps<Theme>;

const LOG_TIMESTAMP_SX = {
	color: "text.disabled",
	fontSize: "inherit",
	fontFamily: "inherit",
} as const satisfies SxProps<Theme>;

const LOG_MESSAGE_SX = {
	fontSize: "inherit",
	fontFamily: "inherit",
} as const satisfies SxProps<Theme>;

const LAUNCH_BAR_PAPER_SX = {
	mt: 3,
	p: 2.5,
	borderRadius: 2,
	bgcolor: "background.paper",
	flexDirection: { xs: "column", sm: "row" },
	justifyContent: "space-between",
	alignItems: "center",
} as const satisfies SxProps<Theme>;

const LAUNCH_BUTTON_SX = {
	textTransform: "none",
	fontWeight: 600,
	px: 3,
	py: 1,
} as const satisfies SxProps<Theme>;

interface AgentMatrixRowProps {
	readonly agent: WorkspaceAgent;
	readonly isSelected: boolean;
	readonly onSelect: (id: string) => void;
}

function AgentMatrixRow({ agent, isSelected, onSelect }: AgentMatrixRowProps) {
	const handleClick = () => onSelect(agent.id);

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
							AGENT_ICON_AVATAR_SX,
							isSelected ? AGENT_ICON_SELECTED_SX : AGENT_ICON_DEFAULT_SX,
						)}
					>
						{agent.icon}
					</Avatar>
					<Box>
						<Typography variant="body2" sx={AGENT_MODULE_TITLE_SX}>
							{agent.moduleTarget}
						</Typography>
						<Typography variant="caption" sx={HEADER_SUBTITLE_SX}>
							{agent.description}
						</Typography>
					</Box>
				</Box>
			</TableCell>

			<TableCell sx={TABLE_BODY_CELL_SX}>
				{agent.isReady ? (
					<Chip
						icon={<DynamicIcon name="CheckCircleOutlined" sx={CHIP_ICON_READY_SX} />}
						label="Ready"
						size="small"
						color="success"
						variant="outlined"
						sx={STATUS_CHIP_SX}
					/>
				) : (
					<Chip
						icon={<CircularProgress size={12} color="inherit" />}
						label="Building"
						size="small"
						color="warning"
						variant="outlined"
						sx={STATUS_CHIP_SX}
					/>
				)}
			</TableCell>

			<TableCell sx={TABLE_BODY_CELL_RIGHT_SX}>
				<Typography variant="caption" sx={HEADER_SUBTITLE_SX}>
					{agent.lastUpdated}
				</Typography>
			</TableCell>
		</TableRow>
	);
}

export const AgentWorkspaceGateway: React.FC = () => {
	const [agents, setAgents] = useState<WorkspaceAgent[]>([...INITIAL_AGENTS]);
	const [selectedAgentId, setSelectedAgentId] = useState<string>("agent-2");
	const terminalBottomRef = useRef<HTMLDivElement>(null);

	const selectedAgent = agents.find((a) => a.id === selectedAgentId) ?? agents[0]!;
	const totalReady = agents.filter((a) => a.isReady).length;

	useEffect(() => {
		terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [selectedAgent.logs]);

	// Simulate pending agents finishing their tasks
	useEffect(() => {
		const timer = setTimeout(() => {
			setAgents((prev) =>
				prev.map((agent) =>
					!agent.isReady && agent.id === "agent-2"
						? {
								...agent,
								isReady: true,
								lastUpdated: "Just now",
								logs: [
									...agent.logs,
									{
										timestamp: new Date().toLocaleTimeString(),
										message: "Cohort metrics successfully compiled.",
									},
								],
							}
						: agent,
				),
			);
		}, 4500);

		return () => clearTimeout(timer);
	}, []);

	return (
		<Box sx={sx.compose(sx.flexCol, ROOT_BOX_SX)}>
			{/* Top Application Header */}
			<Paper elevation={0} sx={HEADER_PAPER_SX}>
				<Box sx={sx.compose(sx.flexRow, HEADER_ROW_SX)}>
					<Box sx={sx.compose(sx.flexRow, sx.gapMd)}>
						<Avatar variant="rounded" sx={LOGO_AVATAR_SX}>
							<DynamicIcon name="AutoMode" fontSize="small" />
						</Avatar>
						<Box>
							<Typography variant="subtitle2" sx={HEADER_TITLE_SX}>
								Acme Enterprises
							</Typography>
							<Typography variant="caption" sx={HEADER_SUBTITLE_SX}>
								Executive Intelligence Workspace
							</Typography>
						</Box>
					</Box>

					<Box sx={sx.compose(sx.flexRow, sx.gapMd)}>
						<Chip
							label={`${totalReady} of ${agents.length} Modules Ready`}
							size="small"
							color={totalReady === agents.length ? "success" : "default"}
							variant="outlined"
							sx={MODULES_READY_CHIP_SX}
						/>
						<Box sx={sx.compose(sx.flexRow, sx.gapSm)}>
							<Avatar sx={USER_AVATAR_SX}>JD</Avatar>
							<Box sx={USER_INFO_BOX_SX}>
								<Typography variant="body2" sx={USER_NAME_SX}>
									Jane Doe
								</Typography>
								<Typography variant="caption" sx={HEADER_SUBTITLE_SX}>
									Logged in as Administrator
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			</Paper>

			{/* Main Workspace Body */}
			<Box sx={MAIN_BODY_SX}>
				<Box sx={SECTION_TITLE_CONTAINER_SX}>
					<Typography variant="h5" sx={SECTION_TITLE_SX}>
						Workspace Setup in Progress
					</Typography>
					<Typography variant="body2" sx={SECTION_SUBTITLE_SX}>
						Background agents are populating your dashboard modules with current data.
						You can inspect logs or proceed directly.
					</Typography>
				</Box>

				<Grid container spacing={3}>
					{/* Agent Task Matrix Table */}
					<Grid size={{ xs: 12, lg: 7 }}>
						<Paper variant="outlined" sx={sx.compose(sx.flexCol, MATRIX_CARD_PAPER_SX)}>
							<Box sx={sx.compose(sx.flexRow, MATRIX_CARD_HEADER_SX)}>
								<Typography variant="subtitle2" sx={MATRIX_CARD_TITLE_SX}>
									Target Dashboard Modules
								</Typography>
								<Tooltip title="Refresh Status">
									<IconButton size="small" icon="Refresh" />
								</Tooltip>
							</Box>

							<TableContainer sx={TABLE_CONTAINER_SX}>
								<Table>
									<TableHead sx={TABLE_HEAD_ROW_SX}>
										<TableRow>
											<TableCell sx={TABLE_HEADER_CELL_SX}>MODULE & AGENT</TableCell>
											<TableCell sx={TABLE_HEADER_CELL_SX}>STATUS</TableCell>
											<TableCell sx={TABLE_HEADER_CELL_RIGHT_SX}>LAST UPDATED</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{agents.map((agent) => (
											<AgentMatrixRow
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

					{/* Live Activity & Log Terminal */}
					<Grid size={{ xs: 12, lg: 5 }}>
						<Paper variant="outlined" sx={sx.compose(sx.flexCol, TERMINAL_CARD_PAPER_SX)}>
							<Box sx={sx.compose(sx.flexRow, TERMINAL_CARD_HEADER_SX)}>
								<Box sx={sx.compose(sx.flexRow, sx.gapXs)}>
									<DynamicIcon name="Terminal" fontSize="small" sx={COLOR_TEXT_SECONDARY_SX} />
									<Typography variant="subtitle2" sx={MATRIX_CARD_TITLE_SX}>
										{selectedAgent.name} Log
									</Typography>
								</Box>
								<Typography variant="caption" sx={HEADER_SUBTITLE_SX}>
									Target: {selectedAgent.moduleTarget}
								</Typography>
							</Box>

							{/* Log View Container */}
							<Box sx={TERMINAL_BODY_CONTAINER_SX}>
								<Box sx={sx.compose(sx.flexCol, sx.gapXs)}>
									{selectedAgent.logs.map((log, index) => (
										<Box key={index} sx={sx.compose(sx.gapSm, LOG_ENTRY_ROW_SX)}>
											<Typography component="span" sx={LOG_TIMESTAMP_SX}>
												[{log.timestamp}]
											</Typography>
											<Typography component="span" sx={LOG_MESSAGE_SX}>
												{log.message}
											</Typography>
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
						<Typography variant="subtitle2" sx={AGENT_MODULE_TITLE_SX}>
							You can proceed to your dashboard at any time
						</Typography>
						<Typography variant="body2" sx={HEADER_SUBTITLE_SX}>
							Pending sections will stream in automatically once their builds complete.
						</Typography>
					</Box>
					<ActionButton variant="contained" endIcon="ArrowForward" sx={LAUNCH_BUTTON_SX}>
						Go to Dashboard
					</ActionButton>
				</Paper>
			</Box>
		</Box>
	);
};

export default AgentWorkspaceGateway;
