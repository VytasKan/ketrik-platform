"use client";
import React, { useState, useEffect } from "react";
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
	Paper,
} from "@repo/ui/mui";
import { ActionButton } from "@repo/ui/mui/@extended";
import { DynamicIcon } from "@repo/ui/elements/dynamic-icon";
import { sx } from "@repo/ui/helpers/sx";

export interface AgentTask {
	id: string;
	name: string;
	role: string;
	targetModule: string;
	progress: number;
	status: "Synthesizing" | "Indexing" | "Analyzing" | "Streaming";
	currentLog: string;
	icon: React.ReactNode;
}

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
	transition: "transform 0.2s, border-color 0.2s",
	"&:hover": {
		transform: "translateY(-4px)",
		borderColor: "rgba(56, 189, 248, 0.4)",
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

const initialAgents: AgentTask[] = [
	{
		id: "1",
		name: "Aura-Dossier",
		role: "Corporate Intelligence",
		targetModule: "Company Dossier",
		progress: 78,
		status: "Synthesizing",
		currentLog: "Reconciling SEC 10-K filings with global org chart...",
		icon: <DynamicIcon name="Business" />,
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
	},
];

export const AgenticWorkspaceLanding: React.FC = () => {
	const [agents, setAgents] = useState<AgentTask[]>(initialAgents);

	useEffect(() => {
		const interval = setInterval(() => {
			setAgents((prev) =>
				prev.map((agent) => ({
					...agent,
					progress: agent.progress >= 100 ? 100 : agent.progress + Math.floor(Math.random() * 4),
				})),
			);
		}, 1800);
		return () => clearInterval(interval);
	}, []);

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
						Behind the scenes, specialized AI agents continuously harvest, audit, and structure your
						organization&apos;s live dossier, financial KPIs, and knowledge networks.
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
								<Card sx={AGENT_CARD_SX}>
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
							</Grid>
						))}
					</Grid>
				</Box>

				{/* Bottom Call to Action */}
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
		</Box>
	);
};

export default AgenticWorkspaceLanding;
