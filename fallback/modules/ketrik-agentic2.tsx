"use client";
import React, { useState, useEffect, useRef } from "react";
import type { SxProps, Theme } from "@repo/ui/mui";
import {
	Box,
	Container,
	Typography,
	Grid,
	Card,
	CardContent,
	Avatar,
	Chip,
	LinearProgress,
	Button,
	Paper,
	Drawer,
} from "@repo/ui/mui";
import { ActionButton, IconButton } from "@repo/ui/mui/@extended";
import { DynamicIcon } from "@repo/ui/elements/dynamic-icon";
import { sx } from "@repo/ui/helpers/sx";

export interface LogEntry {
	timestamp: string;
	level: "INFO" | "SUCCESS" | "WARN" | "EXEC";
	message: string;
}

export interface AgentTask {
	id: string;
	name: string;
	role: string;
	targetModule: string;
	progress: number;
	status: "Synthesizing" | "Indexing" | "Analyzing" | "Streaming";
	currentLog: string;
	icon: React.ReactNode;
	logs: LogEntry[];
}

const INITIAL_AGENTS: readonly AgentTask[] = [
	{
		id: "1",
		name: "Aura-Dossier",
		role: "Corporate Intelligence",
		targetModule: "Company Dossier",
		progress: 78,
		status: "Synthesizing",
		currentLog: "Reconciling SEC 10-K filings with global org chart...",
		icon: <DynamicIcon name="Business" />,
		logs: [
			{ timestamp: "10:41:02", level: "EXEC", message: "Spawning worker node for EDGAR SEC pipeline" },
			{ timestamp: "10:41:05", level: "INFO", message: "Fetched 10-K & 10-Q documents for FY25/FY26" },
			{ timestamp: "10:41:12", level: "INFO", message: "Resolving corporate entity hierarchy & subsidiary tree" },
			{ timestamp: "10:41:20", level: "SUCCESS", message: "Parsed 14 executive profiles and governance structures" },
			{ timestamp: "10:41:28", level: "EXEC", message: "Reconciling SEC 10-K filings with global org chart..." },
		],
	},
	{
		id: "2",
		name: "Vektor-KPI",
		role: "Quantitative Analytics",
		targetModule: "Company KPIs",
		progress: 92,
		status: "Analyzing",
		currentLog: "Computing LTV/CAC cohorts and ARR growth trajectory...",
		icon: <DynamicIcon name="Insights" />,
		logs: [
			{ timestamp: "10:40:15", level: "INFO", message: "Connected to primary telemetry warehouse" },
			{ timestamp: "10:40:30", level: "EXEC", message: "Aggregating monthly gross billings and recurring revenue" },
			{ timestamp: "10:40:48", level: "SUCCESS", message: "Calculated baseline net retention rate (NRR) at 124%" },
			{ timestamp: "10:41:10", level: "EXEC", message: "Computing LTV/CAC cohorts and ARR growth trajectory..." },
		],
	},
	{
		id: "3",
		name: "Sentinel-Pulse",
		role: "Market & News Feed",
		targetModule: "Industry Signals & News",
		progress: 45,
		status: "Streaming",
		currentLog: "Clustering 140+ industry feeds & competitor patent filings...",
		icon: <DynamicIcon name="Feed" />,
		logs: [
			{ timestamp: "10:41:18", level: "INFO", message: "Subscribing to global wire RSS & regulatory trackers" },
			{ timestamp: "10:41:22", level: "INFO", message: "Detected 4 major competitor product launch announcements" },
			{ timestamp: "10:41:35", level: "EXEC", message: "Clustering 140+ industry feeds & competitor patent filings..." },
		],
	},
	{
		id: "4",
		name: "Nexus-Graph",
		role: "Semantic Knowledge Base",
		targetModule: "Knowledge Base",
		progress: 88,
		status: "Indexing",
		currentLog: "Vectorizing internal SOPs, playbooks, and meeting notes...",
		icon: <DynamicIcon name="Hub" />,
		logs: [
			{ timestamp: "10:39:50", level: "INFO", message: "Syncing Notion, Confluence, and internal shared drives" },
			{ timestamp: "10:40:12", level: "EXEC", message: "Chunking 1,420 markdown and PDF source files" },
			{ timestamp: "10:40:40", level: "SUCCESS", message: "Generated dense embeddings via text-embedding-3" },
			{ timestamp: "10:41:25", level: "EXEC", message: "Vectorizing internal SOPs, playbooks, and meeting notes..." },
		],
	},
	{
		id: "5",
		name: "Oracle-Scenario",
		role: "Predictive Intelligence",
		targetModule: "Simulation Lab",
		progress: 60,
		status: "Synthesizing",
		currentLog: "Modeling Q3 market share against supply chain variance...",
		icon: <DynamicIcon name="Psychology" />,
		logs: [
			{ timestamp: "10:41:00", level: "EXEC", message: "Initializing Monte Carlo simulation engine (N=10,000)" },
			{ timestamp: "10:41:15", level: "INFO", message: "Applying macroeconomic interest rate sensitivity bounds" },
			{ timestamp: "10:41:30", level: "EXEC", message: "Modeling Q3 market share against supply chain variance..." },
		],
	},
];

const ROOT_CONTAINER_SX = {
	minHeight: "100vh",
	bgcolor: "#0B0F19",
	color: "#F3F4F6",
	py: 8,
} as const satisfies SxProps<Theme>;

const HERO_SECTION_SX = {
	textAlign: "center",
	mb: 8,
	alignItems: "center",
} as const satisfies SxProps<Theme>;

const HERO_CHIP_ICON_SX = {
	color: "#60A5FA !important",
	fontSize: 18,
} as const satisfies SxProps<Theme>;

const HERO_CHIP_SX = {
	color: "#93C5FD",
	borderColor: "rgba(96, 165, 250, 0.3)",
	bgcolor: "rgba(59, 130, 246, 0.08)",
	fontWeight: 500,
	py: 0.5,
} as const satisfies SxProps<Theme>;

const HERO_TITLE_SX = {
	fontWeight: 800,
	letterSpacing: "-0.03em",
	background: "linear-gradient(180deg, #FFFFFF 0%, #94A3B8 100%)",
	WebkitBackgroundClip: "text",
	WebkitTextFillColor: "transparent",
	fontSize: { xs: "2.5rem", md: "3.75rem" },
} as const satisfies SxProps<Theme>;

const HERO_DESCRIPTION_SX = {
	color: "#94A3B8",
	maxWidth: 640,
	fontSize: "1.1rem",
} as const satisfies SxProps<Theme>;

const MESH_SECTION_SX = {
	mb: 6,
} as const satisfies SxProps<Theme>;

const MESH_HEADER_ROW_SX = {
	justifyContent: "space-between",
	mb: 3,
} as const satisfies SxProps<Theme>;

const MESH_TITLE_ICON_SX = {
	color: "#38BDF8",
} as const satisfies SxProps<Theme>;

const MESH_TITLE_TEXT_SX = {
	fontWeight: 600,
	color: "#F1F5F9",
} as const satisfies SxProps<Theme>;

const MESH_PROTOCOL_TEXT_SX = {
	color: "#64748B",
	fontFamily: "monospace",
} as const satisfies SxProps<Theme>;

const AGENT_CARD_SX = {
	bgcolor: "#111827",
	border: "1px solid rgba(255, 255, 255, 0.08)",
	borderRadius: 3,
	cursor: "pointer",
	transition: "all 0.2s ease-in-out",
	"&:hover": {
		transform: "translateY(-4px)",
		borderColor: "#38BDF8",
		boxShadow: "0 8px 30px rgba(56, 189, 248, 0.12)",
	},
} as const satisfies SxProps<Theme>;

const AGENT_CARD_CONTENT_SX = {
	p: 3,
} as const satisfies SxProps<Theme>;

const CARD_HEADER_ROW_SX = {
	justifyContent: "space-between",
	mb: 2,
} as const satisfies SxProps<Theme>;

const AGENT_AVATAR_SX = {
	bgcolor: "rgba(56, 189, 248, 0.12)",
	color: "#38BDF8",
	width: 44,
	height: 44,
} as const satisfies SxProps<Theme>;

const AGENT_NAME_SX = {
	fontWeight: 700,
	color: "#F8FAFC",
} as const satisfies SxProps<Theme>;

const AGENT_ROLE_SX = {
	color: "#64748B",
} as const satisfies SxProps<Theme>;

const STATUS_CHIP_SX = {
	bgcolor: "rgba(34, 197, 94, 0.1)",
	color: "#4ADE80",
	fontWeight: 600,
	fontSize: "0.72rem",
} as const satisfies SxProps<Theme>;

const LOG_PAPER_SX = {
	p: 1.5,
	bgcolor: "rgba(0, 0, 0, 0.3)",
	borderColor: "rgba(255, 255, 255, 0.05)",
	borderRadius: 2,
	mb: 2.5,
} as const satisfies SxProps<Theme>;

const LOG_LABEL_SX = {
	color: "#94A3B8",
	display: "block",
	mb: 0.5,
} as const satisfies SxProps<Theme>;

const LOG_TARGET_MODULE_SX = {
	color: "#E2E8F0",
	fontWeight: 700,
} as const satisfies SxProps<Theme>;

const LOG_CODE_SX = {
	color: "#38BDF8",
	fontFamily: "monospace",
	display: "block",
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
} as const satisfies SxProps<Theme>;

const PROGRESS_CONTAINER_SX = {
	width: "100%",
} as const satisfies SxProps<Theme>;

const PROGRESS_HEADER_ROW_SX = {
	justifyContent: "space-between",
	mb: 0.8,
} as const satisfies SxProps<Theme>;

const PROGRESS_LABEL_SX = {
	color: "#64748B",
} as const satisfies SxProps<Theme>;

const PROGRESS_PERCENT_SX = {
	color: "#E2E8F0",
	fontWeight: 600,
} as const satisfies SxProps<Theme>;

const PROGRESS_BAR_SX = {
	height: 6,
	borderRadius: 3,
	bgcolor: "rgba(255, 255, 255, 0.05)",
	"& .MuiLinearProgress-bar": {
		background: "linear-gradient(90deg, #38BDF8 0%, #818CF8 100%)",
		borderRadius: 3,
	},
} as const satisfies SxProps<Theme>;

const CTA_PAPER_SX = {
	p: 4,
	borderRadius: 4,
	bgcolor: "rgba(30, 41, 59, 0.4)",
	border: "1px solid rgba(255, 255, 255, 0.08)",
	flexDirection: { xs: "column", md: "row" },
	alignItems: "center",
	justifyContent: "space-between",
} as const satisfies SxProps<Theme>;

const CTA_TITLE_SX = {
	fontWeight: 700,
	color: "#F8FAFC",
} as const satisfies SxProps<Theme>;

const CTA_BODY_SX = {
	color: "#94A3B8",
} as const satisfies SxProps<Theme>;

const CTA_BUTTON_SX = {
	bgcolor: "#38BDF8",
	color: "#0F172A",
	fontWeight: 700,
	textTransform: "none",
	px: 3,
	py: 1.2,
	borderRadius: 2,
	"&:hover": { bgcolor: "#7DD3FC" },
} as const satisfies SxProps<Theme>;

const DRAWER_PAPER_SX = {
	width: { xs: "100%", sm: 540, md: 620 },
	bgcolor: "#0D1117",
	color: "#E6EDF3",
	borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
	display: "flex",
	flexDirection: "column",
} as const satisfies SxProps<Theme>;

const DRAWER_HEADER_SX = {
	p: 2.5,
	bgcolor: "#161B22",
	borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
} as const satisfies SxProps<Theme>;

const DRAWER_HEADER_ROW_SX = {
	justifyContent: "space-between",
} as const satisfies SxProps<Theme>;

const DRAWER_AVATAR_SX = {
	bgcolor: "rgba(56, 189, 248, 0.15)",
	color: "#38BDF8",
	width: 36,
	height: 36,
} as const satisfies SxProps<Theme>;

const DRAWER_TITLE_SX = {
	fontWeight: 700,
	lineHeight: 1.2,
} as const satisfies SxProps<Theme>;

const DRAWER_SUBTITLE_SX = {
	color: "#8B949E",
} as const satisfies SxProps<Theme>;

const DRAWER_CLOSE_BUTTON_SX = {
	color: "#8B949E",
} as const satisfies SxProps<Theme>;

const STATUS_BAR_SX = {
	px: 2.5,
	py: 1.5,
	bgcolor: "#090D13",
	borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
	justifyContent: "space-between",
} as const satisfies SxProps<Theme>;

const STATUS_DOT_SX = {
	fontSize: 10,
	color: "#4ADE80",
} as const satisfies SxProps<Theme>;

const STATUS_TEXT_SX = {
	fontFamily: "monospace",
	color: "#8B949E",
} as const satisfies SxProps<Theme>;

const PROGRESS_TEXT_SX = {
	fontFamily: "monospace",
	color: "#38BDF8",
} as const satisfies SxProps<Theme>;

const LOG_CONSOLE_SX = {
	flexGrow: 1,
	p: 2.5,
	overflowY: "auto",
	bgcolor: "#05070A",
	fontFamily: 'Consolas, Monaco, "Courier New", Courier, monospace',
	fontSize: "0.82rem",
	lineHeight: 1.6,
} as const satisfies SxProps<Theme>;

const LOG_ENTRY_ROW_SX = {
	display: "flex",
	alignItems: "flex-start",
} as const satisfies SxProps<Theme>;

const LOG_TIMESTAMP_SX = {
	color: "#6E7681",
	fontFamily: "inherit",
	fontSize: "inherit",
	userSelect: "none",
} as const satisfies SxProps<Theme>;

const LOG_LEVEL_BASE_SX = {
	fontFamily: "inherit",
	fontSize: "inherit",
	fontWeight: 700,
	minWidth: 54,
	userSelect: "none",
} as const satisfies SxProps<Theme>;

const LOG_MESSAGE_SX = {
	color: "#C9D1D9",
	fontFamily: "inherit",
	fontSize: "inherit",
	wordBreak: "break-word",
} as const satisfies SxProps<Theme>;

const DRAWER_FOOTER_SX = {
	p: 2,
	bgcolor: "#161B22",
	borderTop: "1px solid rgba(255, 255, 255, 0.08)",
} as const satisfies SxProps<Theme>;

const DRAWER_FOOTER_ROW_SX = {
	justifyContent: "flex-end",
} as const satisfies SxProps<Theme>;

const CLOSE_CONSOLE_BUTTON_SX = {
	color: "#8B949E",
	borderColor: "rgba(255, 255, 255, 0.1)",
	textTransform: "none",
	"&:hover": { borderColor: "#8B949E" },
} as const satisfies SxProps<Theme>;

const INSPECT_SCHEMA_BUTTON_SX = {
	bgcolor: "#38BDF8",
	color: "#0D1117",
	fontWeight: 600,
	textTransform: "none",
	"&:hover": { bgcolor: "#7DD3FC" },
} as const satisfies SxProps<Theme>;

const getLogLevelColor = (level: LogEntry["level"]): string => {
	switch (level) {
		case "SUCCESS":
			return "#4ADE80";
		case "WARN":
			return "#FACC15";
		case "EXEC":
			return "#38BDF8";
		case "INFO":
		default:
			return "#94A3B8";
	}
};

interface AgentCardItemProps {
	readonly agent: AgentTask;
	readonly onOpenTerminal: (id: string) => void;
}

function AgentCardItem({ agent, onOpenTerminal }: AgentCardItemProps) {
	const handleClick = () => onOpenTerminal(agent.id);

	return (
		<Card onClick={handleClick} sx={AGENT_CARD_SX}>
			<CardContent sx={AGENT_CARD_CONTENT_SX}>
				<Box sx={sx.compose(sx.flexRow, CARD_HEADER_ROW_SX)}>
					<Box sx={sx.compose(sx.flexRow, sx.gapSm)}>
						<Avatar sx={AGENT_AVATAR_SX}>{agent.icon}</Avatar>
						<Box>
							<Typography variant="subtitle1" sx={AGENT_NAME_SX}>
								{agent.name}
							</Typography>
							<Typography variant="caption" sx={AGENT_ROLE_SX}>
								{agent.role}
							</Typography>
						</Box>
					</Box>
					<Chip label={agent.status} size="small" sx={STATUS_CHIP_SX} />
				</Box>

				<Paper variant="outlined" sx={LOG_PAPER_SX}>
					<Typography variant="caption" sx={LOG_LABEL_SX}>
						Building Page: <Typography component="span" sx={LOG_TARGET_MODULE_SX}>{agent.targetModule}</Typography>
					</Typography>
					<Typography variant="caption" sx={LOG_CODE_SX}>
						&gt; {agent.currentLog}
					</Typography>
				</Paper>

				<Box sx={PROGRESS_CONTAINER_SX}>
					<Box sx={sx.compose(sx.flexRow, PROGRESS_HEADER_ROW_SX)}>
						<Typography variant="caption" sx={PROGRESS_LABEL_SX}>
							Compilation State
						</Typography>
						<Typography variant="caption" sx={PROGRESS_PERCENT_SX}>
							{agent.progress}%
						</Typography>
					</Box>
					<LinearProgress variant="determinate" value={agent.progress} sx={PROGRESS_BAR_SX} />
				</Box>
			</CardContent>
		</Card>
	);
}

export const AgenticWorkspaceLanding: React.FC = () => {
	const [agents, setAgents] = useState<AgentTask[]>([...INITIAL_AGENTS]);
	const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
	const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
	const terminalEndRef = useRef<HTMLDivElement>(null);

	const activeAgent = agents.find((a) => a.id === selectedAgentId);

	// Auto-scroll inside terminal when drawer is open or logs update
	useEffect(() => {
		if (drawerOpen) {
			terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [drawerOpen, activeAgent?.logs]);

	// Simulate incoming agent execution updates and logs
	useEffect(() => {
		const interval = setInterval(() => {
			setAgents((prev) =>
				prev.map((agent) => {
					const progressDelta = agent.progress >= 100 ? 0 : Math.floor(Math.random() * 3) + 1;
					const newProgress = Math.min(100, agent.progress + progressDelta);

					const updatedLogs = [...agent.logs];
					if (Math.random() > 0.6 && newProgress < 100) {
						const now = new Date();
						const timeStr = now.toTimeString().split(" ")[0] ?? "";
						updatedLogs.push({
							timestamp: timeStr,
							level: Math.random() > 0.3 ? "INFO" : "EXEC",
							message: `Evaluated step checkpoint [progress=${newProgress}%] on node ${agent.name.toLowerCase()}-worker-1`,
						});
					}

					return {
						...agent,
						progress: newProgress,
						logs: updatedLogs,
					};
				}),
			);
		}, 2500);

		return () => clearInterval(interval);
	}, []);

	const handleOpenTerminal = (agentId: string) => {
		setSelectedAgentId(agentId);
		setDrawerOpen(true);
	};

	return (
		<Box sx={ROOT_CONTAINER_SX}>
			<Container maxWidth="lg">
				{/* Hero Section */}
				<Box sx={sx.compose(sx.flexCol, sx.gapMd, HERO_SECTION_SX)}>
					<Chip
						icon={<DynamicIcon name="AutoAwesome" sx={HERO_CHIP_ICON_SX} />}
						label="Autonomous Intelligence Engine Active"
						variant="outlined"
						sx={HERO_CHIP_SX}
					/>
					<Typography variant="h2" sx={HERO_TITLE_SX}>
						Your Executive Intelligence,
						<br />
						Assembled by Autonomous Agents
					</Typography>
					<Typography variant="body1" sx={HERO_DESCRIPTION_SX}>
						Click any active agent below to inspect live reasoning traces, ingestion logs, and
						real-time compilation metrics in the terminal drawer.
					</Typography>
				</Box>

				{/* Live Agent Canvas */}
				<Box sx={MESH_SECTION_SX}>
					<Box sx={sx.compose(sx.flexRow, MESH_HEADER_ROW_SX)}>
						<Box sx={sx.compose(sx.flexRow, sx.gapXs)}>
							<DynamicIcon name="Terminal" sx={MESH_TITLE_ICON_SX} />
							<Typography variant="h6" sx={MESH_TITLE_TEXT_SX}>
								Active Agent Mesh
							</Typography>
						</Box>
						<Typography variant="caption" sx={MESH_PROTOCOL_TEXT_SX}>
							PROTOCOL: v2.4-CONCURRENT
						</Typography>
					</Box>

					<Grid container spacing={3}>
						{agents.map((agent) => (
							<Grid size={{ xs: 12, md: 6, lg: 4 }} key={agent.id}>
								<AgentCardItem agent={agent} onOpenTerminal={handleOpenTerminal} />
							</Grid>
						))}
					</Grid>
				</Box>

				{/* Action Bar */}
				<Paper sx={sx.compose(sx.flexRow, sx.gapMd, CTA_PAPER_SX)}>
					<Box>
						<Typography variant="h6" sx={CTA_TITLE_SX}>
							All 5 Agents are actively compiling your workspace
						</Typography>
						<Typography variant="body2" sx={CTA_BODY_SX}>
							Jump in directly to review generated briefs, edit agent parameters, or export reports.
						</Typography>
					</Box>
					<ActionButton variant="contained" endIcon="ArrowForward" sx={CTA_BUTTON_SX}>
						Enter Mission Control
					</ActionButton>
				</Paper>
			</Container>

			{/* Slide-out Terminal Drawer */}
			{drawerOpen && (
				<Drawer
					anchor="right"
					open={drawerOpen}
					onClose={() => setDrawerOpen(false)}
					slotProps={{
						paper: {
							sx: DRAWER_PAPER_SX,
						},
					}}
				>
					{activeAgent && (
						<>
							{/* Drawer Header */}
							<Box sx={DRAWER_HEADER_SX}>
								<Box sx={sx.compose(sx.flexRow, DRAWER_HEADER_ROW_SX)}>
									<Box sx={sx.compose(sx.flexRow, sx.gapSm)}>
										<Avatar sx={DRAWER_AVATAR_SX}>{activeAgent.icon}</Avatar>
										<Box>
											<Typography variant="subtitle1" sx={DRAWER_TITLE_SX}>
												{activeAgent.name}
											</Typography>
											<Typography variant="caption" sx={DRAWER_SUBTITLE_SX}>
												Target: {activeAgent.targetModule}
											</Typography>
										</Box>
									</Box>
									<IconButton icon="Close" onClick={() => setDrawerOpen(false)} sx={DRAWER_CLOSE_BUTTON_SX} />
								</Box>
							</Box>

							{/* Subheader Status Bar */}
							<Box sx={sx.compose(sx.flexRow, STATUS_BAR_SX)}>
								<Box sx={sx.compose(sx.flexRow, sx.gapXs)}>
									<DynamicIcon name="Circle" sx={STATUS_DOT_SX} />
									<Typography variant="caption" sx={STATUS_TEXT_SX}>
										STATUS: {activeAgent.status.toUpperCase()}
									</Typography>
								</Box>
								<Typography variant="caption" sx={PROGRESS_TEXT_SX}>
									PROGRESS: {activeAgent.progress}%
								</Typography>
							</Box>

							{/* Terminal Log Console */}
							<Box sx={LOG_CONSOLE_SX}>
								<Box sx={sx.compose(sx.flexCol, sx.gapXs)}>
									{activeAgent.logs.map((log, index) => (
										<Box key={index} sx={sx.compose(sx.gapSm, LOG_ENTRY_ROW_SX)}>
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
											<Typography component="span" sx={LOG_MESSAGE_SX}>
												{log.message}
											</Typography>
										</Box>
									))}
									<div ref={terminalEndRef} />
								</Box>
							</Box>

							{/* Drawer Footer Controls */}
							<Box sx={DRAWER_FOOTER_SX}>
								<Box sx={sx.compose(sx.flexRow, sx.gapMd, DRAWER_FOOTER_ROW_SX)}>
									<Button
										size="small"
										variant="outlined"
										onClick={() => setDrawerOpen(false)}
										sx={CLOSE_CONSOLE_BUTTON_SX}
									>
										Close Console
									</Button>
									<ActionButton
										size="small"
										variant="contained"
										startIcon="PlayArrow"
										sx={INSPECT_SCHEMA_BUTTON_SX}
									>
										Inspect Output Schema
									</ActionButton>
								</Box>
							</Box>
						</>
					)}
				</Drawer>
			)}
		</Box>
	);
};

export default AgenticWorkspaceLanding;
