"use client";
import type { SxProps, Theme } from "@repo/ui/mui";
import { alpha, Box, Chip, Paper, Typography } from "@repo/ui/mui";
import {
	AltRouteOutlined,
	ComputerOutlined,
	ConfirmationNumberOutlined,
	MarkEmailUnreadOutlined,
	PlayCircleOutlineOutlined,
	RssFeedOutlined,
	SettingsOutlined,
	SmartToyOutlined,
	StorageOutlined,
	VisibilityOutlined,
} from "@repo/ui/icons";
import React from "react";
import { sx } from "@repo/ui/helpers/sx";


const P_1_5_BORDER_RADIUS_1_5_BGCOLOR_BACKGROU_SX = { p: 1.5, borderRadius: 1.5, bgcolor: "background.paper" } as const satisfies SxProps<Theme>;
export interface AgentInputCardData {
	id?: string;
	icon?: React.ReactNode;
	iconName?: string;
	title: string;
	subtitle: string;
}

export interface AgentCoreCardData {
	id?: string;
	icon?: React.ReactNode;
	iconName?: string;
	title: string;
	subtitle: string;
}

export interface ShellNotificationData {
	id?: string;
	text: string;
	type?: "success" | "warning" | "info" | "error";
}

export interface ExternalToolData {
	id?: string;
	iconName?: string;
	label: string;
}

export interface KetrikAgentData {
	inputSection?: {
		chipLabel?: string;
		title?: string;
		subtitle?: string;
		items?: AgentInputCardData[];
	};
	transition1Label?: string;
	coreSection?: {
		chipLabel?: string;
		title?: string;
		subtitle?: string;
		items?: AgentCoreCardData[];
	};
	transition2Label?: string;
	impactSection?: {
		humanSurfaceChipLabel?: string;
		shellTitle?: string;
		notifications?: ShellNotificationData[];
		automatedOutputsChipLabel?: string;
		toolsTitle?: string;
		tools?: ExternalToolData[];
	};
}

export interface KetrikAgentProps {
	data?: KetrikAgentData;
	metadata?: Record<string, unknown>;
}

const DEFAULT_DATA: KetrikAgentData = {
	inputSection: {
		chipLabel: "INPUTS",
		title: "Your Data & Workflows",
		subtitle: "Connect raw event streams & business logic.",
		items: [
			{
				iconName: "StorageOutlined",
				title: "Files & Databases",
				subtitle: "Spreadsheets, CRMs, Warehouses",
			},
			{
				iconName: "SettingsOutlined",
				title: "Internal Logic",
				subtitle: "Scripts, Rules, Custom Models",
			},
			{
				iconName: "RssFeedOutlined",
				title: "Live Telemetry Feeds",
				subtitle: "APIs, Broker Metrics, Webhooks",
			},
		],
	},
	transition1Label: "Agents watch & interpret",
	coreSection: {
		chipLabel: "AGENTIC CORE",
		title: "Ketrik AI Agents",
		subtitle: "Autonomous fleet of managed AI agents",
		items: [
			{
				iconName: "VisibilityOutlined",
				title: "Monitoring Agent",
				subtitle: "Continuously watches streams & identifies anomalies",
			},
			{
				iconName: "AltRouteOutlined",
				title: "Routing & Decision Agent",
				subtitle: "Prioritizes events, evaluates rules & paths",
			},
			{
				iconName: "PlayCircleOutlineOutlined",
				title: "Execution Agent",
				subtitle: "Triggers actions, dispatches webhooks & resolves",
			},
		],
	},
	transition2Label: "Surface & execute",
	impactSection: {
		humanSurfaceChipLabel: "HUMAN SURFACE",
		shellTitle: "Ketrik Shell",
		notifications: [
			{ id: "n1", text: "● Agent Resolved Incident #391", type: "success" },
			{ id: "n2", text: "▲ Agent Escalated Threshold Warning", type: "warning" },
		],
		automatedOutputsChipLabel: "AUTOMATED OUTPUTS",
		toolsTitle: "Your Tools & Systems",
		tools: [
			{ iconName: "ConfirmationNumberOutlined", label: "Ticketing" },
			{ iconName: "MarkEmailUnreadOutlined", label: "Email / Slack" },
			{ iconName: "StorageOutlined", label: "CRMs" },
			{ iconName: "SettingsOutlined", label: "Webhooks" },
		],
	},
};

const CONTAINER_PAPER_SX = {
	p: { xs: 2, sm: 3, md: 4 },
	borderRadius: 3,
	bgcolor: "background.paper",
	border: "2px solid",
	borderColor: (theme: Theme) =>
		alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.8 : 0.7),
	boxShadow: (theme: Theme) =>
		`0 0 24px ${alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.35 : 0.25)}`,
	overflowX: "auto",
	maxWidth: { xs: "100%", sm: 480, md: 520, lg: "none" },
	justifySelf: "center",
	position: "relative",
	width: "100%",
	zIndex: 10,
} as const satisfies SxProps<Theme>;

const MAIN_LAYOUT_SX = {
	flexDirection: { xs: "column", lg: "row" },
	alignItems: "stretch",
	justifyContent: "space-between",
} as const satisfies SxProps<Theme>;

const SECTION_INPUT_SX = {
	flex: 1,
	minWidth: { lg: 200 },
	width: "100%",
	maxWidth: { xs: "100%", sm: 480, md: 520, lg: "none" },
	alignSelf: { xs: "center", lg: "stretch" },
} as const satisfies SxProps<Theme>;

const SECTION_CORE_SX = {
	flex: 1.2,
	minWidth: { lg: 240 },
	width: "100%",
	maxWidth: { xs: "100%", sm: 480, md: 520, lg: "none" },
	alignSelf: { xs: "center", lg: "stretch" },
} as const satisfies SxProps<Theme>;

const SECTION_IMPACT_SX = {
	flex: 1,
	minWidth: { lg: 200 },
	width: "100%",
	maxWidth: { xs: "100%", sm: 480, md: 520, lg: "none" },
	alignSelf: { xs: "center", lg: "stretch" },
} as const satisfies SxProps<Theme>;

const SECTION_STACK_SX = {
	height: "100%",
} as const satisfies SxProps<Theme>;

const CHIP_HEADER_SX = {
	fontSize: "0.65rem",
	fontWeight: 700,
	height: 20,
	bgcolor: "action.hover",
	color: "text.secondary",
	borderRadius: 1,
} as const satisfies SxProps<Theme>;

const CHIP_CORE_HEADER_SX = {
	fontSize: "0.65rem",
	fontWeight: 700,
	height: 22,
	borderRadius: 1,
} as const satisfies SxProps<Theme>;

const CHIP_CORE_ICON_SX = {
	fontSize: "0.85rem !important",
} as const satisfies SxProps<Theme>;

const TITLE_SX = {
	mt: 0.5,
	fontWeight: 700,
} as const satisfies SxProps<Theme>;

const CORE_CONTAINER_PAPER_SX = {
	p: 2.5,
	borderRadius: 3,
	borderColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.4),
	bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.02),
	flexGrow: 1,
} as const satisfies SxProps<Theme>;

const CARD_STACK_SX = {
	flexGrow: 1,
} as const satisfies SxProps<Theme>;

const INPUT_CARD_PAPER_SX = {
	p: 1.5,
	borderRadius: 1.5,
	display: "flex",
	alignItems: "center",
	bgcolor: "background.paper",
} as const satisfies SxProps<Theme>;

const AGENT_CARD_PAPER_SX = {
	p: 1.25,
	borderRadius: 1.5,
	display: "flex",
	alignItems: "center",
	bgcolor: "background.paper",
} as const satisfies SxProps<Theme>;

const SHELL_SURFACE_PAPER_SX = {
	p: 1.5,
	borderRadius: 2,
	bgcolor: (theme: Theme) => alpha(theme.palette.common.black, 0.02),
} as const satisfies SxProps<Theme>;

const NOTIFICATION_ITEM_SX = {
	p: 0.75,
	bgcolor: "background.paper",
	borderRadius: 1,
	border: "1px solid",
	borderColor: "divider",
} as const satisfies SxProps<Theme>;

const NOTIFICATION_TEXT_SUCCESS_SX = {
	fontSize: "0.65rem",
	color: "success.main",
	fontWeight: 700,
	display: "block",
} as const satisfies SxProps<Theme>;

const NOTIFICATION_TEXT_WARNING_SX = {
	fontSize: "0.65rem",
	color: "warning.main",
	fontWeight: 700,
	display: "block",
} as const satisfies SxProps<Theme>;

const NOTIFICATION_TEXT_INFO_SX = {
	fontSize: "0.65rem",
	color: "info.main",
	fontWeight: 700,
	display: "block",
} as const satisfies SxProps<Theme>;

const NOTIFICATION_TEXT_ERROR_SX = {
	fontSize: "0.65rem",
	color: "error.main",
	fontWeight: 700,
	display: "block",
} as const satisfies SxProps<Theme>;

const TOOLS_GRID_SX = {
	display: "grid",
	gridTemplateColumns: "repeat(2, 1fr)",
} as const satisfies SxProps<Theme>;

const TOOL_ITEM_SX = {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
} as const satisfies SxProps<Theme>;

const TOOL_TEXT_SX = {
	fontSize: "0.7rem",
} as const satisfies SxProps<Theme>;

const TOOL_ICON_SX = {
	fontSize: 14,
} as const satisfies SxProps<Theme>;

const CARD_TITLE_SX = {
	lineHeight: 1.2,
	fontWeight: 600,
} as const satisfies SxProps<Theme>;

const SUBTITLE_SECONDARY_SX = {
	color: "text.secondary",
} as const satisfies SxProps<Theme>;

const CARD_SUBTITLE_SX = {
	display: "block",
	mt: 0.25,
	color: "text.secondary",
} as const satisfies SxProps<Theme>;

const CONNECTION_DIVIDER_SX = {
	flexDirection: "column",
	py: { xs: 2, lg: 0 },
	px: { xs: 0, lg: 1.5 },
	minWidth: { xs: "auto", lg: 110 },
	alignSelf: "center",
	position: "relative",
} as const satisfies SxProps<Theme>;

const CONNECTION_LABEL_SX = {
	fontSize: "0.65rem",
	textAlign: "center",
	whiteSpace: "nowrap",
	fontWeight: 700,
	letterSpacing: 0.5,
	textTransform: "uppercase",
	zIndex: 2,
	color: "primary.main",
} as const satisfies SxProps<Theme>;

const FLOW_TRACK_HORIZONTAL_SX = {
	display: { xs: "none", lg: "flex" },
	alignItems: "center",
	position: "relative",
	width: "100%",
	height: 24,
	justifyContent: "center",
} as const satisfies SxProps<Theme>;

const FLOW_TRACK_VERTICAL_SX = {
	display: { xs: "flex", lg: "none" },
	flexDirection: "column",
	alignItems: "center",
	position: "relative",
	width: 24,
	height: 48,
	justifyContent: "center",
} as const satisfies SxProps<Theme>;

const LINE_CONNECT_HORIZONTAL_SX = {
	position: "absolute",
	left: 0,
	right: 0,
	top: "50%",
	height: "2px",
	transform: "translateY(-50%)",
	background: (theme: Theme) =>
		`linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${theme.palette.primary.main} 50%, ${alpha(theme.palette.primary.main, 0.15)} 100%)`,
	zIndex: 0,
} as const satisfies SxProps<Theme>;

const LINE_CONNECT_VERTICAL_SX = {
	position: "absolute",
	top: 0,
	bottom: 0,
	left: "50%",
	width: "2px",
	transform: "translateX(-50%)",
	background: (theme: Theme) =>
		`linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${theme.palette.primary.main} 50%, ${alpha(theme.palette.primary.main, 0.15)} 100%)`,
	zIndex: 0,
} as const satisfies SxProps<Theme>;

const FLOW_DOT_SX = {
	width: 7,
	height: 7,
	borderRadius: "50%",
	bgcolor: "primary.main",
	boxShadow: (theme: Theme) => `0 0 10px ${theme.palette.primary.main}`,
	position: "absolute",
	zIndex: 1,
} as const satisfies SxProps<Theme>;

const FLOW_DOT_H1_SX = {
	animation: "dotFlowX 1.8s ease-in-out infinite",
	animationDelay: "0s",
	"@keyframes dotFlowX": {
		"0%": { left: "0%", opacity: 0 },
		"20%": { opacity: 1 },
		"80%": { opacity: 1 },
		"100%": { left: "100%", opacity: 0 },
	},
} as const satisfies SxProps<Theme>;

const FLOW_DOT_H2_SX = {
	animation: "dotFlowX 1.8s ease-in-out infinite",
	animationDelay: "0.9s",
} as const satisfies SxProps<Theme>;

const FLOW_DOT_V1_SX = {
	animation: "dotFlowY 1.8s ease-in-out infinite",
	animationDelay: "0s",
	"@keyframes dotFlowY": {
		"0%": { top: "0%", opacity: 0 },
		"20%": { opacity: 1 },
		"80%": { opacity: 1 },
		"100%": { top: "100%", opacity: 0 },
	},
} as const satisfies SxProps<Theme>;

const FLOW_DOT_V2_SX = {
	animation: "dotFlowY 1.8s ease-in-out infinite",
	animationDelay: "0.9s",
} as const satisfies SxProps<Theme>;

function getIconByName(iconName?: string, defaultIcon?: React.ReactNode): React.ReactNode {
	switch (iconName) {
		case "StorageOutlined":
			return <StorageOutlined fontSize="small" color="action" />;
		case "SettingsOutlined":
			return <SettingsOutlined fontSize="small" color="action" />;
		case "RssFeedOutlined":
			return <RssFeedOutlined fontSize="small" color="action" />;
		case "VisibilityOutlined":
			return <VisibilityOutlined fontSize="small" color="primary" />;
		case "AltRouteOutlined":
			return <AltRouteOutlined fontSize="small" color="primary" />;
		case "PlayCircleOutlineOutlined":
			return <PlayCircleOutlineOutlined fontSize="small" color="primary" />;
		case "ConfirmationNumberOutlined":
			return <ConfirmationNumberOutlined color="action" sx={TOOL_ICON_SX} />;
		case "MarkEmailUnreadOutlined":
			return <MarkEmailUnreadOutlined color="action" sx={TOOL_ICON_SX} />;
		case "ComputerOutlined":
			return <ComputerOutlined fontSize="small" color="primary" />;
		default:
			return defaultIcon;
	}
}

export default function KetrikAgentDiagram({ data }: KetrikAgentProps) {
	const inputChipLabel = data?.inputSection?.chipLabel ?? DEFAULT_DATA.inputSection?.chipLabel;
	const inputTitle = data?.inputSection?.title ?? DEFAULT_DATA.inputSection?.title;
	const inputSubtitle = data?.inputSection?.subtitle ?? DEFAULT_DATA.inputSection?.subtitle;
	const inputItems = data?.inputSection?.items ?? DEFAULT_DATA.inputSection?.items ?? [];

	const transition1Label = data?.transition1Label ?? DEFAULT_DATA.transition1Label ?? "";

	const coreChipLabel = data?.coreSection?.chipLabel ?? DEFAULT_DATA.coreSection?.chipLabel;
	const coreTitle = data?.coreSection?.title ?? DEFAULT_DATA.coreSection?.title;
	const coreSubtitle = data?.coreSection?.subtitle ?? DEFAULT_DATA.coreSection?.subtitle;
	const coreItems = data?.coreSection?.items ?? DEFAULT_DATA.coreSection?.items ?? [];

	const transition2Label = data?.transition2Label ?? DEFAULT_DATA.transition2Label ?? "";

	const humanSurfaceChipLabel =
		data?.impactSection?.humanSurfaceChipLabel ??
		DEFAULT_DATA.impactSection?.humanSurfaceChipLabel;
	const shellTitle = data?.impactSection?.shellTitle ?? DEFAULT_DATA.impactSection?.shellTitle;
	const notifications =
		data?.impactSection?.notifications ?? DEFAULT_DATA.impactSection?.notifications ?? [];
	const automatedOutputsChipLabel =
		data?.impactSection?.automatedOutputsChipLabel ??
		DEFAULT_DATA.impactSection?.automatedOutputsChipLabel;
	const toolsTitle = data?.impactSection?.toolsTitle ?? DEFAULT_DATA.impactSection?.toolsTitle;
	const tools = data?.impactSection?.tools ?? DEFAULT_DATA.impactSection?.tools ?? [];

	return (
		<Paper elevation={0} sx={CONTAINER_PAPER_SX}>
			<Box sx={sx.compose(sx.flexCol, sx.gapMd, MAIN_LAYOUT_SX)}>
				{/* 1. LEFT: INPUT DATA & WORKFLOWS */}
				<Box sx={SECTION_INPUT_SX}>
					<Box sx={sx.compose(sx.flexCol, sx.gapMd, SECTION_STACK_SX)}>
						<Box>
							{inputChipLabel && (
								<Chip label={inputChipLabel} size="small" sx={CHIP_HEADER_SX} />
							)}
							{inputTitle && (
								<Typography variant="subtitle1" sx={TITLE_SX}>
									{inputTitle}
								</Typography>
							)}
							{inputSubtitle && (
								<Typography variant="caption" sx={SUBTITLE_SECONDARY_SX}>
									{inputSubtitle}
								</Typography>
							)}
						</Box>

						<Box sx={sx.compose(sx.flexCol, sx.gapSm, CARD_STACK_SX)}>
							{inputItems.map((item, idx) => (
								<InputCard key={item.id || item.title || idx} {...item} />
							))}
						</Box>
					</Box>
				</Box>

				{/* CONNECTION LINE 1 */}
				<ConnectionDivider label={transition1Label} />

				{/* 2. MIDDLE: KETRIK AI AGENTS (AGENTIC CORE) */}
				<Box sx={SECTION_CORE_SX}>
					<Box sx={sx.compose(sx.flexCol, sx.gapMd, SECTION_STACK_SX)}>
						<Paper variant="outlined" sx={CORE_CONTAINER_PAPER_SX}>
							<Box sx={sx.compose(sx.flexCol, sx.gapMd, SECTION_STACK_SX)}>
								<Box>
									{coreChipLabel && (
										<Chip
											icon={<SmartToyOutlined sx={CHIP_CORE_ICON_SX} />}
											label={coreChipLabel}
											size="small"
											color="primary"
											sx={CHIP_CORE_HEADER_SX}
										/>
									)}
									{coreTitle && (
										<Typography variant="subtitle1" sx={TITLE_SX}>
											{coreTitle}
										</Typography>
									)}
									{coreSubtitle && (
										<Typography variant="caption" sx={SUBTITLE_SECONDARY_SX}>
											{coreSubtitle}
										</Typography>
									)}
								</Box>

								<Box sx={sx.compose(sx.flexCol, sx.gapSm, CARD_STACK_SX)}>
									{coreItems.map((item, idx) => (
										<AgentCard key={item.id || item.title || idx} {...item} />
									))}
								</Box>
							</Box>
						</Paper>
					</Box>
				</Box>

				{/* CONNECTION LINE 2 */}
				<ConnectionDivider label={transition2Label} />

				{/* 3. RIGHT: OUTCOMES (SPLIT HUMAN SURFACE / AUTOMATED OUTPUTS) */}
				<Box sx={SECTION_IMPACT_SX}>
					<Box sx={sx.compose(sx.flexCol, sx.gapMd, SECTION_STACK_SX)}>
						{/* Top: Human Surface */}
						<Box>
							{humanSurfaceChipLabel && (
								<Chip
									label={humanSurfaceChipLabel}
									size="small"
									sx={CHIP_HEADER_SX}
								/>
							)}
							<Paper variant="outlined" sx={SHELL_SURFACE_PAPER_SX}>
								<Box sx={sx.compose(sx.flexRow, sx.gapXs, { mb: 1 })}>
									<ComputerOutlined fontSize="small" color="primary" />
									{shellTitle && (
										<Typography variant="subtitle2" sx={CARD_TITLE_SX}>
											{shellTitle}
										</Typography>
									)}
								</Box>
								<Box sx={sx.compose(sx.flexCol, sx.gapXs)}>
									{notifications.map((notif, idx) => {
										const notifStyle =
											notif.type === "success"
												? NOTIFICATION_TEXT_SUCCESS_SX
												: notif.type === "warning"
													? NOTIFICATION_TEXT_WARNING_SX
													: notif.type === "error"
														? NOTIFICATION_TEXT_ERROR_SX
														: NOTIFICATION_TEXT_INFO_SX;
										return (
											<Box key={notif.id || idx} sx={NOTIFICATION_ITEM_SX}>
												<Typography variant="caption" sx={notifStyle}>
													{notif.text}
												</Typography>
											</Box>
										);
									})}
								</Box>
							</Paper>
						</Box>

						{/* Bottom: Automated Outputs */}
						<Box>
							{automatedOutputsChipLabel && (
								<Chip
									label={automatedOutputsChipLabel}
									size="small"
									sx={CHIP_HEADER_SX}
								/>
							)}
							<Paper
								variant="outlined"
								sx={P_1_5_BORDER_RADIUS_1_5_BGCOLOR_BACKGROU_SX}
							>
								{toolsTitle && (
									<Typography
										variant="subtitle2"
										sx={sx.compose(CARD_TITLE_SX, { mb: 1 })}
									>
										{toolsTitle}
									</Typography>
								)}
								<Box sx={sx.compose(sx.gapXs, TOOLS_GRID_SX)}>
									{tools.map((tool, idx) => (
										<Box key={tool.id || tool.label || idx} sx={sx.compose(sx.gapXxs, TOOL_ITEM_SX)}>
											{getIconByName(
												tool.iconName,
												<StorageOutlined
													color="action"
													sx={TOOL_ICON_SX}
												/>,
											)}
											<Typography variant="caption" sx={TOOL_TEXT_SX}>
												{tool.label}
											</Typography>
										</Box>
									))}
								</Box>
							</Paper>
						</Box>
					</Box>
				</Box>
			</Box>
		</Paper>
	);
}

// Helper: Input Cards (Left Side)
function InputCard({ icon, iconName, title, subtitle }: AgentInputCardData) {
	const resolvedIcon =
		icon ?? getIconByName(iconName, <StorageOutlined fontSize="small" color="action" />);
	return (
		<Paper variant="outlined" sx={sx.compose(sx.gapSm, INPUT_CARD_PAPER_SX)}>
			{resolvedIcon}
			<Box>
				<Typography variant="body2" sx={CARD_TITLE_SX}>
					{title}
				</Typography>
				<Typography variant="caption" sx={CARD_SUBTITLE_SX}>
					{subtitle}
				</Typography>
			</Box>
		</Paper>
	);
}

// Helper: Agent Cards (Middle Core)
function AgentCard({ icon, iconName, title, subtitle }: AgentCoreCardData) {
	const resolvedIcon =
		icon ?? getIconByName(iconName, <VisibilityOutlined fontSize="small" color="primary" />);
	return (
		<Paper variant="outlined" sx={sx.compose(sx.gapSm, AGENT_CARD_PAPER_SX)}>
			{resolvedIcon}
			<Box>
				<Typography variant="body2" sx={CARD_TITLE_SX}>
					{title}
				</Typography>
				<Typography variant="caption" sx={CARD_SUBTITLE_SX}>
					{subtitle}
				</Typography>
			</Box>
		</Paper>
	);
}

// Helper: Pure Line Connections with Continuous Traveling Dots (No Arrowhead Icons)
function ConnectionDivider({ label }: { label: string }) {
	return (
		<Box sx={sx.compose(sx.flexCenter, sx.gapXxs, CONNECTION_DIVIDER_SX)}>
			<Typography variant="caption" sx={CONNECTION_LABEL_SX}>
				{label}
			</Typography>

			{/* Horizontal Connection Track (lg+) */}
			<Box sx={FLOW_TRACK_HORIZONTAL_SX}>
				<Box sx={LINE_CONNECT_HORIZONTAL_SX} />
				<Box sx={sx.compose(FLOW_DOT_SX, FLOW_DOT_H1_SX)} />
				<Box sx={sx.compose(FLOW_DOT_SX, FLOW_DOT_H2_SX)} />
			</Box>

			{/* Vertical Connection Track (xs..md) */}
			<Box sx={FLOW_TRACK_VERTICAL_SX}>
				<Box sx={LINE_CONNECT_VERTICAL_SX} />
				<Box sx={sx.compose(FLOW_DOT_SX, FLOW_DOT_V1_SX)} />
				<Box sx={sx.compose(FLOW_DOT_SX, FLOW_DOT_V2_SX)} />
			</Box>
		</Box>
	);
}
