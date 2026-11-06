"use client";
import type { SxProps, Theme } from "@repo/ui/mui";
import { alpha, Box, Button, Chip, Paper, Typography } from "@repo/ui/mui";
import {
	AccessTimeOutlined,
	AnalyticsOutlined,
	ArrowDownward,
	ArrowForward,
	AutoAwesomeOutlined,
	BuildOutlined,
	CheckCircleOutlineOutlined,
	LightbulbOutlined,
	PsychologyOutlined,
	SmartToyOutlined,
	StorageOutlined,
} from "@repo/ui/icons";
import React from "react";
import { sx } from "@repo/ui/helpers/sx";

export interface AgentInputCardData {
	id?: string;
	icon?: React.ReactNode;
	iconName?: string;
	title: string;
	subtitle: string;
}

export interface AgentOutputCardData {
	id?: string;
	icon?: React.ReactNode;
	iconName?: string;
	title: string;
	subtitle: string;
}

export interface AgentModuleChip {
	label: string;
	color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
	variant?: "outlined" | "filled";
}

export interface AgentModuleButton {
	label: string;
	variant?: "text" | "outlined" | "contained";
	color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
}

export interface AgentModule {
	category: string;
	chips?: AgentModuleChip[];
	buttons?: AgentModuleButton[];
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
		controlCenterTitle?: string;
		modules?: AgentModule[];
	};
	transition2Label?: string;
	impactSection?: {
		chipLabel?: string;
		title?: string;
		subtitle?: string;
		items?: AgentOutputCardData[];
	};
}

export interface KetrikAgentProps {
	data?: KetrikAgentData;
	metadata?: Record<string, unknown>;
}

const DEFAULT_DATA: KetrikAgentData = {
	inputSection: {
		chipLabel: "AGENT INPUT",
		title: "Intent & Triggers",
		subtitle: "Prompts, scheduled tasks, and live event signals.",
		items: [
			{
				iconName: "PsychologyOutlined",
				title: "User Prompts & Goals",
				subtitle: "Natural language directives & instructions",
			},
			{
				iconName: "AccessTimeOutlined",
				title: "Scheduled Triggers",
				subtitle: "Automated cron jobs & webhook events",
			},
			{
				iconName: "StorageOutlined",
				title: "Context & RAG Memory",
				subtitle: "Vector embeddings, docs & database state",
			},
		],
	},
	transition1Label: "Reason & Plan",
	coreSection: {
		chipLabel: "AUTONOMOUS CORE",
		title: "Ketrik Agent Shell",
		subtitle: "Self-directing reasoning loop and tool execution engine.",
		controlCenterTitle: "Ketrik Agent Workspace",
		modules: [
			{
				category: "AGENT STATUS & MEMORY",
				chips: [
					{ label: "Reasoning: Active", color: "primary" },
					{ label: "Context: Synced", color: "success" },
					{ label: "Safety Guard: Enforced", variant: "outlined" },
				],
			},
			{
				category: "REASONING PIPELINE",
				chips: [
					{ label: "1. Parse Intent", variant: "outlined" },
					{ label: "2. Select Tool", variant: "outlined" },
					{ label: "3. Validate Action", variant: "outlined" },
				],
			},
			{
				category: "ACTION & TOOL REGISTRY",
				buttons: [
					{ label: "Execute Tool", variant: "contained" },
					{ label: "Verify Result", variant: "outlined" },
				],
			},
		],
	},
	transition2Label: "Act & Deliver",
	impactSection: {
		chipLabel: "AGENT OUTPUT",
		title: "Autonomous Results",
		subtitle: "Closed-loop execution with real-time feedback.",
		items: [
			{
				iconName: "CheckCircleOutlineOutlined",
				title: "Automated Execution",
				subtitle: "APIs invoked, workflows triggered, tasks closed.",
			},
			{
				iconName: "SmartToyOutlined",
				title: "Self-Correction & Logs",
				subtitle: "Audit trail created and memory store updated.",
			},
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
	height: 20,
	borderRadius: 1,
} as const satisfies SxProps<Theme>;

const TITLE_SX = {
	mt: 0.5,
	fontWeight: 700,
} as const satisfies SxProps<Theme>;

const CARD_STACK_SX = {
	flexGrow: 1,
} as const satisfies SxProps<Theme>;

const APP_SCREEN_CONTAINER_SX = {
	p: 0,
	borderRadius: 2,
	borderColor: "primary.main",
	bgcolor: "background.default",
	boxShadow: (theme: Theme) => `0 0 20px ${theme.palette.primary.main}22`,
	overflow: "hidden",
	flexGrow: 1,
} as const satisfies SxProps<Theme>;

const TOP_BAR_SX = {
	px: 1.5,
	py: 1,
	bgcolor: "action.hover",
	borderBottom: "1px solid",
	borderColor: "divider",
	display: "flex",
	alignItems: "center",
} as const satisfies SxProps<Theme>;

const DOT_RED_SX = {
	width: 6,
	height: 6,
	borderRadius: "50%",
	bgcolor: "error.main",
} as const satisfies SxProps<Theme>;

const DOT_YELLOW_SX = {
	width: 6,
	height: 6,
	borderRadius: "50%",
	bgcolor: "warning.main",
} as const satisfies SxProps<Theme>;

const DOT_GREEN_SX = {
	width: 6,
	height: 6,
	borderRadius: "50%",
	bgcolor: "success.main",
} as const satisfies SxProps<Theme>;

const TOP_BAR_TITLE_SX = {
	ml: 1,
	fontSize: "0.65rem",
	color: "text.secondary",
	fontWeight: 600,
} as const satisfies SxProps<Theme>;

const SCREEN_MODULES_SX = {
	p: 2,
} as const satisfies SxProps<Theme>;

const MODULE_LABEL_SX = {
	fontSize: "0.6rem",
	fontWeight: 700,
	color: "text.secondary",
	letterSpacing: 0.5,
	display: "block",
	mb: 0.75,
} as const satisfies SxProps<Theme>;

const CHIP_ROW_SX = {
	display: "flex",
	flexDirection: "row",
	flexWrap: "wrap",
} as const satisfies SxProps<Theme>;

const CHIP_MODULE_SX = {
	fontSize: "0.7rem",
	height: 22,
} as const satisfies SxProps<Theme>;

const BUTTON_ACTION_SX = {
	fontSize: "0.65rem",
	py: 0.5,
	px: 1.2,
} as const satisfies SxProps<Theme>;

const INPUT_CARD_PAPER_SX = {
	p: 1.5,
	borderRadius: 1.5,
	display: "flex",
	alignItems: "center",
	bgcolor: "background.paper",
} as const satisfies SxProps<Theme>;

const OUTPUT_CARD_PAPER_SX = {
	p: 1.5,
	borderRadius: 1.5,
	display: "flex",
	alignItems: "flex-start",
	bgcolor: "background.paper",
} as const satisfies SxProps<Theme>;

const ICON_WRAPPER_SX = {
	mt: 0.25,
} as const satisfies SxProps<Theme>;

const CARD_TITLE_SX = {
	lineHeight: 1.2,
	fontWeight: 600,
} as const satisfies SxProps<Theme>;

const SUBTITLE_SECONDARY_SX = {
	color: "text.secondary",
} as const satisfies SxProps<Theme>;

const INPUT_CARD_SUBTITLE_SX = {
	display: "block",
	mt: 0.25,
	color: "text.secondary",
} as const satisfies SxProps<Theme>;

const OUTPUT_CARD_SUBTITLE_SX = {
	display: "block",
	mt: 0.5,
	lineHeight: 1.3,
	color: "text.secondary",
} as const satisfies SxProps<Theme>;

const ARROW_DIVIDER_SX = {
	flexDirection: "column",
	py: { xs: 1.5, lg: 0 },
	px: { xs: 0, lg: 1 },
	minWidth: { xs: "auto", lg: 90 },
	alignSelf: "center",
	transition: "transform 0.2s ease-in-out",
	"&:hover": {
		transform: "scale(1.05)",
	},
} as const satisfies SxProps<Theme>;

const ARROW_LABEL_SX = {
	color: "primary.main",
	fontSize: "0.65rem",
	textAlign: "center",
	whiteSpace: "nowrap",
	fontWeight: 700,
} as const satisfies SxProps<Theme>;

const ARROW_DOWN_SX = {
	opacity: 0.9,
} as const satisfies SxProps<Theme>;

const ARROW_FORWARD_SX = {
	opacity: 0.9,
} as const satisfies SxProps<Theme>;

const FLOW_TRACK_HORIZONTAL_SX = {
	display: { xs: "none", lg: "flex" },
	alignItems: "center",
	position: "relative",
} as const satisfies SxProps<Theme>;

const FLOW_TRACK_VERTICAL_SX = {
	display: { xs: "flex", lg: "none" },
	flexDirection: "column",
	alignItems: "center",
	position: "relative",
} as const satisfies SxProps<Theme>;

const FLOW_DOT_SX = {
	width: 5,
	height: 5,
	borderRadius: "50%",
	bgcolor: "primary.main",
	boxShadow: (theme: Theme) => `0 0 6px ${theme.palette.primary.main}`,
} as const satisfies SxProps<Theme>;

const FLOW_DOT_H1_SX = {
	animation: "dotFlowX 1.5s linear infinite",
	animationDelay: "0s",
	"@keyframes dotFlowX": {
		"0%": { transform: "translateX(-10px)", opacity: 0 },
		"20%": { opacity: 0.8 },
		"80%": { opacity: 0.8 },
		"100%": { transform: "translateX(10px)", opacity: 0 },
	},
} as const satisfies SxProps<Theme>;

const FLOW_DOT_H2_SX = {
	animation: "dotFlowX 1.5s linear infinite",
	animationDelay: "0.75s",
} as const satisfies SxProps<Theme>;

const FLOW_DOT_V1_SX = {
	animation: "dotFlowY 1.5s linear infinite",
	animationDelay: "0s",
	"@keyframes dotFlowY": {
		"0%": { transform: "translateY(-10px)", opacity: 0 },
		"20%": { opacity: 0.8 },
		"80%": { opacity: 0.8 },
		"100%": { transform: "translateY(10px)", opacity: 0 },
	},
} as const satisfies SxProps<Theme>;

const FLOW_DOT_V2_SX = {
	animation: "dotFlowY 1.5s linear infinite",
	animationDelay: "0.75s",
} as const satisfies SxProps<Theme>;

function getIconByName(iconName?: string, defaultIcon?: React.ReactNode): React.ReactNode {
	switch (iconName) {
		case "PsychologyOutlined":
			return <PsychologyOutlined fontSize="small" color="primary" />;
		case "AccessTimeOutlined":
			return <AccessTimeOutlined fontSize="small" color="primary" />;
		case "StorageOutlined":
			return <StorageOutlined fontSize="small" color="primary" />;
		case "CheckCircleOutlineOutlined":
			return <CheckCircleOutlineOutlined color="primary" />;
		case "SmartToyOutlined":
			return <SmartToyOutlined color="primary" />;
		case "AutoAwesomeOutlined":
			return <AutoAwesomeOutlined fontSize="small" color="primary" />;
		case "BuildOutlined":
			return <BuildOutlined fontSize="small" color="primary" />;
		case "AnalyticsOutlined":
			return <AnalyticsOutlined color="primary" />;
		case "LightbulbOutlined":
			return <LightbulbOutlined fontSize="small" color="primary" />;
		default:
			return defaultIcon;
	}
}

export default function KetrikAgent({ data }: KetrikAgentProps) {

	const inputChipLabel = data?.inputSection?.chipLabel ?? DEFAULT_DATA.inputSection?.chipLabel;
	const inputTitle = data?.inputSection?.title ?? DEFAULT_DATA.inputSection?.title;
	const inputSubtitle = data?.inputSection?.subtitle ?? DEFAULT_DATA.inputSection?.subtitle;
	const inputItems = data?.inputSection?.items ?? DEFAULT_DATA.inputSection?.items ?? [];

	const transition1Label = data?.transition1Label ?? DEFAULT_DATA.transition1Label ?? "";

	const coreChipLabel = data?.coreSection?.chipLabel ?? DEFAULT_DATA.coreSection?.chipLabel;
	const coreTitle = data?.coreSection?.title ?? DEFAULT_DATA.coreSection?.title;
	const coreSubtitle = data?.coreSection?.subtitle ?? DEFAULT_DATA.coreSection?.subtitle;
	const controlCenterTitle =
		data?.coreSection?.controlCenterTitle ?? DEFAULT_DATA.coreSection?.controlCenterTitle;
	const coreModules = data?.coreSection?.modules ?? DEFAULT_DATA.coreSection?.modules ?? [];

	const transition2Label = data?.transition2Label ?? DEFAULT_DATA.transition2Label ?? "";

	const impactChipLabel = data?.impactSection?.chipLabel ?? DEFAULT_DATA.impactSection?.chipLabel;
	const impactTitle = data?.impactSection?.title ?? DEFAULT_DATA.impactSection?.title;
	const impactSubtitle = data?.impactSection?.subtitle ?? DEFAULT_DATA.impactSection?.subtitle;
	const impactItems = data?.impactSection?.items ?? DEFAULT_DATA.impactSection?.items ?? [];

	return (
		<Paper elevation={0} sx={CONTAINER_PAPER_SX}>
			<Box sx={sx.compose(sx.flexCol, sx.gapMd, MAIN_LAYOUT_SX)}>
				{/* 1. INPUT SECTION */}
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

				{/* TRANSITION ARROW 1 */}
				<ArrowDivider label={transition1Label} />

				{/* 2. CORE ENGINE: KETRIK AGENT SHELL */}
				<Box sx={SECTION_CORE_SX}>
					<Box sx={sx.compose(sx.flexCol, sx.gapMd, SECTION_STACK_SX)}>
						<Box>
							{coreChipLabel && (
								<Chip
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

						{/* Simulated App Screen Container */}
						<Paper variant="outlined" sx={APP_SCREEN_CONTAINER_SX}>
							{/* Screen Top Bar */}
							<Box sx={sx.compose(sx.gapXxs, TOP_BAR_SX)}>
								<Box sx={DOT_RED_SX} />
								<Box sx={DOT_YELLOW_SX} />
								<Box sx={DOT_GREEN_SX} />
								{controlCenterTitle && (
									<Typography variant="caption" sx={TOP_BAR_TITLE_SX}>
										{controlCenterTitle}
									</Typography>
								)}
							</Box>

							{/* Screen Modules */}
							<Box sx={sx.compose(sx.flexCol, sx.gapMd, SCREEN_MODULES_SX)}>
								{coreModules.map((mod, idx) => (
									<Box key={mod.category || idx}>
										<Typography variant="caption" sx={MODULE_LABEL_SX}>
											{mod.category}
										</Typography>

										{mod.chips && mod.chips.length > 0 && (
											<Box sx={sx.compose(sx.gapXxs, CHIP_ROW_SX)}>
												{mod.chips.map((chip, cIdx) => (
													<Chip
														key={chip.label || cIdx}
														label={chip.label}
														size="small"
														variant={chip.variant ?? "outlined"}
														color={chip.color}
														sx={CHIP_MODULE_SX}
													/>
												))}
											</Box>
										)}

										{mod.buttons && mod.buttons.length > 0 && (
											<Box sx={sx.compose(sx.flexRow, sx.gapXs)}>
												{mod.buttons.map((btn, bIdx) => (
													<Button
														key={btn.label || bIdx}
														variant={btn.variant ?? "contained"}
														color={btn.color}
														size="small"
														sx={BUTTON_ACTION_SX}
													>
														{btn.label}
													</Button>
												))}
											</Box>
										)}
									</Box>
								))}
							</Box>
						</Paper>
					</Box>
				</Box>

				{/* TRANSITION ARROW 2 */}
				<ArrowDivider label={transition2Label} />

				{/* 3. IMPACT / OUTPUT SECTION */}
				<Box sx={SECTION_IMPACT_SX}>
					<Box sx={sx.compose(sx.flexCol, sx.gapMd, SECTION_STACK_SX)}>
						<Box>
							{impactChipLabel && (
								<Chip label={impactChipLabel} size="small" sx={CHIP_HEADER_SX} />
							)}
							{impactTitle && (
								<Typography variant="subtitle1" sx={TITLE_SX}>
									{impactTitle}
								</Typography>
							)}
							{impactSubtitle && (
								<Typography variant="caption" sx={SUBTITLE_SECONDARY_SX}>
									{impactSubtitle}
								</Typography>
							)}
						</Box>

						<Box sx={sx.compose(sx.flexCol, sx.gapSm, CARD_STACK_SX)}>
							{impactItems.map((item, idx) => (
								<OutputCard key={item.id || item.title || idx} {...item} />
							))}
						</Box>
					</Box>
				</Box>
			</Box>
		</Paper>
	);
}

// Helper: Node Cards (Input Side)
function InputCard({ icon, iconName, title, subtitle }: AgentInputCardData) {
	const resolvedIcon =
		icon ?? getIconByName(iconName, <PsychologyOutlined fontSize="small" color="primary" />);
	return (
		<Paper variant="outlined" sx={sx.compose(sx.gapSm, INPUT_CARD_PAPER_SX)}>
			{resolvedIcon}
			<Box>
				<Typography variant="body2" sx={CARD_TITLE_SX}>
					{title}
				</Typography>
				<Typography variant="caption" sx={INPUT_CARD_SUBTITLE_SX}>
					{subtitle}
				</Typography>
			</Box>
		</Paper>
	);
}

// Helper: Output Cards (Right Side)
function OutputCard({ icon, iconName, title, subtitle }: AgentOutputCardData) {
	const resolvedIcon =
		icon ?? getIconByName(iconName, <CheckCircleOutlineOutlined color="primary" />);
	return (
		<Paper variant="outlined" sx={sx.compose(sx.gapSm, OUTPUT_CARD_PAPER_SX)}>
			<Box sx={ICON_WRAPPER_SX}>{resolvedIcon}</Box>
			<Box>
				<Typography variant="body2" sx={CARD_TITLE_SX}>
					{title}
				</Typography>
				<Typography variant="caption" sx={OUTPUT_CARD_SUBTITLE_SX}>
					{subtitle}
				</Typography>
			</Box>
		</Paper>
	);
}

// Helper: Dynamic Directional Arrows with Flowing Data Particles
function ArrowDivider({ label }: { label: string }) {
	return (
		<Box sx={sx.compose(sx.flexCenter, sx.gapXxs, ARROW_DIVIDER_SX)}>
			<Typography variant="caption" sx={ARROW_LABEL_SX}>
				{label}
			</Typography>

			{/* Horizontal Flowing Track (lg+) */}
			<Box sx={sx.compose(sx.gapXxs, FLOW_TRACK_HORIZONTAL_SX)}>
				<Box sx={sx.compose(FLOW_DOT_SX, FLOW_DOT_H1_SX)} />
				<Box sx={sx.compose(FLOW_DOT_SX, FLOW_DOT_H2_SX)} />
				<ArrowForward color="primary" fontSize="small" sx={ARROW_FORWARD_SX} />
			</Box>

			{/* Vertical Flowing Track (xs..md) */}
			<Box sx={sx.compose(sx.gapXxs, FLOW_TRACK_VERTICAL_SX)}>
				<Box sx={sx.compose(FLOW_DOT_SX, FLOW_DOT_V1_SX)} />
				<Box sx={sx.compose(FLOW_DOT_SX, FLOW_DOT_V2_SX)} />
				<ArrowDownward color="primary" fontSize="small" sx={ARROW_DOWN_SX} />
			</Box>
		</Box>
	);
}
