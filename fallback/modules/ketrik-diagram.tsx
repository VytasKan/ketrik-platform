"use client";
import type { SxProps, Theme } from "@repo/ui/mui";
import { alpha, Box, Button, Chip, Paper, Typography } from "@repo/ui/mui";
import {
	AnalyticsOutlined,
	InsertDriveFileOutlined,
	PersonOutlineOutlined,
	PowerOutlined,
	SettingsOutlined,
} from "@repo/ui/icons";
import React from "react";
import { sx } from "@repo/ui/helpers/sx";

export interface InputCardData {
	id?: string;
	icon?: React.ReactNode;
	iconName?: string;
	title: string;
	subtitle: string;
}

export interface UserCardData {
	id?: string;
	icon?: React.ReactNode;
	iconName?: string;
	title: string;
	subtitle: string;
}

export interface ControlCenterChip {
	label: string;
	color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
	variant?: "outlined" | "filled";
}

export interface ControlCenterButton {
	label: string;
	variant?: "text" | "outlined" | "contained";
	color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
}

export interface ControlCenterModule {
	category: string;
	chips?: ControlCenterChip[];
	buttons?: ControlCenterButton[];
}

export interface KetrikDiagramData {
	inputSection?: {
		chipLabel?: string;
		title?: string;
		subtitle?: string;
		items?: InputCardData[];
	};
	transition1Label?: string;
	coreSection?: {
		chipLabel?: string;
		title?: string;
		subtitle?: string;
		controlCenterTitle?: string;
		modules?: ControlCenterModule[];
	};
	transition2Label?: string;
	impactSection?: {
		chipLabel?: string;
		title?: string;
		subtitle?: string;
		items?: UserCardData[];
	};
}

export interface KetrikFlowDiagramProps {
	data?: KetrikDiagramData;
	metadata?: Record<string, unknown>;
}

const DEFAULT_DATA: KetrikDiagramData = {
	inputSection: {
		chipLabel: "INPUT",
		title: "Your Data & Workflows",
		subtitle: "Connect what you already have—no rebuild required.",
		items: [
			{
				iconName: "InsertDriveFileOutlined",
				title: "Files & Databases",
				subtitle: "Spreadsheets, CRMs, Warehouses",
			},
			{
				iconName: "SettingsOutlined",
				title: "Internal Logic",
				subtitle: "Scripts, Custom Models, Rules",
			},
			{
				iconName: "PowerOutlined",
				title: "Live Feeds",
				subtitle: "Third-Party Platforms, APIs",
			},
		],
	},
	transition1Label: "Ingest & Map",
	coreSection: {
		chipLabel: "CORE ENGINE",
		title: "Ketrik Shell",
		subtitle: "Your live, AI-powered command surface.",
		controlCenterTitle: "Ketrik Control Center",
		modules: [
			{
				category: "DASHBOARDS & VIEWS",
				chips: [
					{ label: "Live KPIs", variant: "outlined" },
					{ label: "Operations Health", variant: "outlined" },
					{ label: "Market Status", variant: "outlined" },
				],
			},
			{
				category: "SMART ALERTS",
				chips: [
					{ label: "Risk Triggered", color: "error" },
					{ label: "Anomaly Detected", color: "warning" },
				],
			},
			{
				category: "GUIDED ACTIONS",
				buttons: [
					{ label: "Execute Workflow", variant: "contained" },
					{ label: "Notify Team", variant: "outlined" },
				],
			},
		],
	},
	transition2Label: "See, React & Execute",
	impactSection: {
		chipLabel: "IMPACT",
		title: "Your Teams & Clients",
		subtitle: "One unified interface for all stakeholders.",
		items: [
			{
				iconName: "PersonOutlineOutlined",
				title: "Business Leaders & Operators",
				subtitle: "Direct operations and act in real time from one live screen.",
			},
			{
				iconName: "AnalyticsOutlined",
				title: "Consultants & Tech Leads",
				subtitle:
					"Deliver bespoke, branded command centers without building UI from scratch.",
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
		alpha(theme.palette.success.main, theme.palette.mode === "dark" ? 0.8 : 0.7),
	boxShadow: (theme: Theme) =>
		`0 0 24px ${alpha(theme.palette.success.main, theme.palette.mode === "dark" ? 0.35 : 0.25)}`,
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

const USER_CARD_PAPER_SX = {
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

const USER_CARD_SUBTITLE_SX = {
	display: "block",
	mt: 0.5,
	lineHeight: 1.3,
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
		case "InsertDriveFileOutlined":
			return <InsertDriveFileOutlined fontSize="small" color="primary" />;
		case "SettingsOutlined":
			return <SettingsOutlined fontSize="small" color="primary" />;
		case "PowerOutlined":
			return <PowerOutlined fontSize="small" color="primary" />;
		case "PersonOutlineOutlined":
			return <PersonOutlineOutlined color="primary" />;
		case "AnalyticsOutlined":
			return <AnalyticsOutlined color="primary" />;
		default:
			return defaultIcon;
	}
}

export default function KetrikFlowDiagram({ data, metadata }: KetrikFlowDiagramProps) {

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

				{/* CONNECTION LINE 1 */}
				<ConnectionDivider label={transition1Label} />

				{/* 2. CORE ENGINE: KETRIK SHELL */}
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

				{/* CONNECTION LINE 2 */}
				<ConnectionDivider label={transition2Label} />

				{/* 3. IMPACT SECTION */}
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
								<UserCard key={item.id || item.title || idx} {...item} />
							))}
						</Box>
					</Box>
				</Box>
			</Box>
		</Paper>
	);
}

// Helper: Node Cards (Input Side)
function InputCard({ icon, iconName, title, subtitle }: InputCardData) {
	const resolvedIcon =
		icon ??
		getIconByName(iconName, <InsertDriveFileOutlined fontSize="small" color="primary" />);
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

// Helper: Audience Cards (Right Side)
function UserCard({ icon, iconName, title, subtitle }: UserCardData) {
	const resolvedIcon = icon ?? getIconByName(iconName, <PersonOutlineOutlined color="primary" />);
	return (
		<Paper variant="outlined" sx={sx.compose(sx.gapSm, USER_CARD_PAPER_SX)}>
			<Box sx={ICON_WRAPPER_SX}>{resolvedIcon}</Box>
			<Box>
				<Typography variant="body2" sx={CARD_TITLE_SX}>
					{title}
				</Typography>
				<Typography variant="caption" sx={USER_CARD_SUBTITLE_SX}>
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
