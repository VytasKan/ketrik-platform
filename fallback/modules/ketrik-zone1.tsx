"use client";
import React from "react";
import type { SxProps, Theme } from "@repo/ui/mui";
import {
	Box,
	Typography,
	Chip,
	Button,
	Grid,
	Paper,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@repo/ui/mui";
import { ActionButton } from "@repo/ui/mui/@extended";
import { DynamicIcon } from "@repo/ui/elements/dynamic-icon";
import { sx } from "@repo/ui/helpers/sx";


const FONT_SIZE_16_COLOR_60A5FA_IMPORTANT_SX = { fontSize: 16, color: "#60A5FA !important" } as const satisfies SxProps<Theme>;

const FONT_SIZE_16_COLOR_A78BFA_IMPORTANT_SX = { fontSize: 16, color: "#A78BFA !important" } as const satisfies SxProps<Theme>;

const FONT_SIZE_18_COLOR_34D399_SX = { fontSize: 18, color: "#34D399" } as const satisfies SxProps<Theme>;

const FONT_SIZE_18_SX = { fontSize: 18 } as const satisfies SxProps<Theme>;

const FONT_WEIGHT_700_SX = { fontWeight: 700 } as const satisfies SxProps<Theme>;

const TEXT_ALIGN_CENTER_SX = { textAlign: "center" } as const satisfies SxProps<Theme>;
// Hoisted static SX constants
const CONTAINER_PAPER_SX = {
	width: "100%",
	background: "linear-gradient(180deg, #0B0F17 0%, #131B2A 100%)",
	border: "1px solid #1E293B",
	borderRadius: 3,
	p: { xs: 3, lg: 4 },
	color: "#F8FAFC",
	overflow: "hidden",
} as const satisfies SxProps<Theme>;

const WRAP_ROW_SX = {
	flexWrap: "wrap",
} as const satisfies SxProps<Theme>;

const TELEMETRY_BAR_SX = {
	justifyContent: "space-between",
	alignItems: { xs: "flex-start", sm: "center" },
	pb: 3,
	borderBottom: "1px solid #1E293B",
} as const satisfies SxProps<Theme>;

const HUB_CHIP_SX = {
	backgroundColor: "rgba(30, 41, 59, 0.8)",
	border: "1px solid #334155",
	color: "#CBD5E1",
	fontWeight: 500,
	fontSize: "0.75rem",
} as const satisfies SxProps<Theme>;

const RUNTIME_CHIP_SX = {
	backgroundColor: "#0F172A",
	border: "1px solid #1E293B",
	color: "#94A3B8",
	fontSize: "0.75rem",
} as const satisfies SxProps<Theme>;

const OPS_CHIP_SX = {
	backgroundColor: "rgba(6, 78, 59, 0.3)",
	border: "1px solid rgba(16, 185, 129, 0.3)",
	color: "#6EE7B7",
	fontFamily: "monospace",
	fontWeight: 600,
	fontSize: "0.75rem",
} as const satisfies SxProps<Theme>;

const OBSERVER_CHIP_SX = {
	backgroundColor: "rgba(76, 29, 149, 0.3)",
	border: "1px solid rgba(139, 92, 246, 0.3)",
	color: "#C4B5FD",
	fontSize: "0.75rem",
} as const satisfies SxProps<Theme>;

const DOT_ICON_SX = {
	fontSize: 12,
	color: "#34D399 !important",
	animation: "pulse 1.5s infinite",
	"@keyframes pulse": {
		"0%": { opacity: 0.4 },
		"50%": { opacity: 1 },
		"100%": { opacity: 0.4 },
	},
} as const satisfies SxProps<Theme>;

const HEADLINE_CONTAINER_SX = {
	py: 4,
	maxWidth: 900,
} as const satisfies SxProps<Theme>;

const HEADLINE_TYPOGRAPHY_SX = {
	fontSize: { xs: "1.75rem", md: "2.25rem" },
	fontWeight: 700,
	letterSpacing: "-0.025em",
	color: "#FFFFFF",
	mb: 1.5,
} as const satisfies SxProps<Theme>;

const HEADLINE_GRADIENT_SX = {
	background: "linear-gradient(90deg, #60A5FA 0%, #6EE7B7 50%, #C084FC 100%)",
	WebkitBackgroundClip: "text",
	WebkitTextFillColor: "transparent",
} as const satisfies SxProps<Theme>;

const SUBTEXT_TYPOGRAPHY_SX = {
	color: "#94A3B8",
	lineHeight: 1.65,
	fontSize: "0.95rem",
} as const satisfies SxProps<Theme>;

const CANVAS_PAPER_SX = {
	backgroundColor: "rgba(8, 12, 20, 0.9)",
	border: "1px solid rgba(30, 41, 59, 0.9)",
	borderRadius: 2,
	p: { xs: 2.5, md: 3 },
} as const satisfies SxProps<Theme>;

const CANVAS_HEADER_SX = {
	mb: 3,
} as const satisfies SxProps<Theme>;

const CANVAS_TITLE_SX = {
	fontFamily: "monospace",
	letterSpacing: "0.08em",
	textTransform: "uppercase",
	color: "#94A3B8",
	fontWeight: 600,
} as const satisfies SxProps<Theme>;

const COLUMN_DEV_SX = {
	height: "100%",
	p: 2.5,
	borderRadius: 1.5,
	backgroundColor: "rgba(15, 23, 42, 0.6)",
	border: "1px solid rgba(0, 127, 255, 0.3)",
} as const satisfies SxProps<Theme>;

const COLUMN_DEV_HEADER_SX = {
	mb: 1,
	color: "#007FFF",
} as const satisfies SxProps<Theme>;

const COLUMN_DEV_SUBTITLE_SX = {
	color: "#64748B",
	fontFamily: "monospace",
	display: "block",
	mb: 1.5,
} as const satisfies SxProps<Theme>;

const COLUMN_SPEC_SX = {
	height: "100%",
	p: 2.5,
	borderRadius: 1.5,
	backgroundColor: "rgba(6, 78, 59, 0.15)",
	border: "1px solid rgba(16, 185, 129, 0.35)",
} as const satisfies SxProps<Theme>;

const COLUMN_SPEC_HEADER_SX = {
	mb: 1,
	color: "#34D399",
} as const satisfies SxProps<Theme>;

const COLUMN_SPEC_SUBTITLE_SX = {
	color: "rgba(52, 211, 153, 0.8)",
	fontFamily: "monospace",
	display: "block",
	mb: 1.5,
} as const satisfies SxProps<Theme>;

const COLUMN_AGENT_SX = {
	height: "100%",
	p: 2.5,
	borderRadius: 1.5,
	backgroundColor: "rgba(15, 23, 42, 0.6)",
	border: "1px solid rgba(139, 92, 246, 0.3)",
} as const satisfies SxProps<Theme>;

const COLUMN_AGENT_HEADER_SX = {
	mb: 1,
	color: "#A78BFA",
} as const satisfies SxProps<Theme>;

const COLUMN_AGENT_SUBTITLE_SX = {
	color: "rgba(167, 139, 250, 0.8)",
	fontFamily: "monospace",
	display: "block",
	mb: 1.5,
} as const satisfies SxProps<Theme>;

const LIST_ITEM_SX = {
	alignItems: "flex-start",
	py: 0.5,
} as const satisfies SxProps<Theme>;

const LIST_ICON_DEV_SX = {
	minWidth: 16,
	mt: 0.5,
	color: "#007FFF",
	fontSize: "0.8rem",
} as const satisfies SxProps<Theme>;

const LIST_ICON_SPEC_SX = {
	minWidth: 16,
	mt: 0.5,
	color: "#34D399",
	fontSize: "0.8rem",
} as const satisfies SxProps<Theme>;

const LIST_ICON_AGENT_SX = {
	minWidth: 16,
	mt: 0.5,
	color: "#A78BFA",
	fontSize: "0.8rem",
} as const satisfies SxProps<Theme>;

const LIST_TEXT_SX = {
	fontSize: "0.775rem",
	color: "#CBD5E1",
	lineHeight: 1.4,
} as const satisfies SxProps<Theme>;

const DIVIDER_SX = {
	my: 3,
	borderColor: "#1E293B",
} as const satisfies SxProps<Theme>;

const RUNTIME_BADGE_CONTAINER_SX = {
	justifyContent: "center",
	alignItems: "center",
	mb: 0.75,
} as const satisfies SxProps<Theme>;

const RUNTIME_BADGE_TEXT_SX = {
	fontFamily: "monospace",
	textTransform: "uppercase",
	letterSpacing: "0.08em",
	color: "#34D399",
	fontWeight: 700,
} as const satisfies SxProps<Theme>;

const RUNTIME_DESCRIPTION_SX = {
	color: "#94A3B8",
	fontSize: "0.8rem",
	maxWidth: 640,
	mx: "auto",
} as const satisfies SxProps<Theme>;

const ACTION_ROW_SX = {
	justifyContent: "space-between",
	alignItems: { xs: "stretch", sm: "center" },
	mt: 3,
} as const satisfies SxProps<Theme>;

const PRIMARY_BTN_SX = {
	backgroundColor: "#7C3AED",
	"&:hover": { backgroundColor: "#6D28D9" },
	textTransform: "none",
	fontWeight: 600,
	fontSize: "0.825rem",
	borderRadius: 1.5,
	px: 2,
	py: 1,
} as const satisfies SxProps<Theme>;

const KEYBOARD_HINT_SX = {
	ml: 1,
	px: 0.75,
	py: 0.2,
	fontSize: "0.675rem",
	backgroundColor: "#5B21B6",
	border: "1px solid #6D28D9",
	borderRadius: 0.75,
	color: "#DDD6FE",
	fontFamily: "monospace",
} as const satisfies SxProps<Theme>;

const SECONDARY_BTN_SX = {
	color: "#E2E8F0",
	borderColor: "#334155",
	backgroundColor: "rgba(30, 41, 59, 0.4)",
	"&:hover": {
		borderColor: "#475569",
		backgroundColor: "rgba(30, 41, 59, 0.8)",
	},
	textTransform: "none",
	fontWeight: 500,
	fontSize: "0.825rem",
	borderRadius: 1.5,
	px: 2,
	py: 1,
} as const satisfies SxProps<Theme>;

const STATELSS_CHIP_SX = {
	fontFamily: "monospace",
	fontSize: "0.75rem",
	color: "#94A3B8",
	backgroundColor: "rgba(15, 23, 42, 0.8)",
	border: "1px solid #1E293B",
	borderRadius: 1.5,
	py: 1.75,
} as const satisfies SxProps<Theme>;

const DEV_ITEMS = [
	"Programmatic TypeScript/script layout composition",
	"Explicit WebSocket & telemetry pipe binding",
	"Reusable component templates & typed schemas",
	"Full git versioning and CI/CD automation",
] as const;

const SPEC_ITEMS = [
	"Clean, serializable data contract",
	"Container-responsive slot coordinates",
	"Pluggable engine definitions (WebGL, Grids)",
	"Zero compiled markup / zero DOM bloat",
] as const;

const AGENT_ITEMS = [
	"Prompt-to-view layout generation",
	"Sub-second anomaly & variance monitoring",
	"Dynamic layout triage mutations",
	"Programmatic action & runbook triggering",
] as const;

export default function HeroZone1MUI() {
	return (
		<Paper elevation={0} sx={CONTAINER_PAPER_SX}>
			{/* Telemetry Bar & Status Cluster */}
			<Box
				sx={sx.compose(
					{ display: "flex", flexDirection: { xs: "column", sm: "row" } },
					sx.gapMd,
					TELEMETRY_BAR_SX,
				)}
			>
				<Box sx={sx.compose(sx.flexRow, sx.gapXs, WRAP_ROW_SX)}>
					<Chip
						icon={<DynamicIcon name="Layers" sx={FONT_SIZE_16_COLOR_60A5FA_IMPORTANT_SX} />}
						label="Operational Architecture Hub"
						size="small"
						sx={HUB_CHIP_SX}
					/>
					<Chip label="Runtime v1.0 Ready" size="small" sx={RUNTIME_CHIP_SX} />
				</Box>

				<Box sx={sx.compose(sx.flexRow, sx.gapSm, WRAP_ROW_SX)}>
					<Chip
						icon={<DynamicIcon name="FiberManualRecord" sx={DOT_ICON_SX} />}
						label="14.2k ops/s"
						size="small"
						sx={OPS_CHIP_SX}
					/>
					<Chip
						icon={<DynamicIcon name="Timeline" sx={FONT_SIZE_16_COLOR_A78BFA_IMPORTANT_SX} />}
						label="Agent: Active Observer"
						size="small"
						sx={OBSERVER_CHIP_SX}
					/>
				</Box>
			</Box>

			{/* Core Headline & Manifesto */}
			<Box sx={HEADLINE_CONTAINER_SX}>
				<Typography variant="h1" sx={HEADLINE_TYPOGRAPHY_SX}>
					Ketrik Shell:{" "}
					<Box component="span" sx={HEADLINE_GRADIENT_SX}>
						The Code-First & Agentic-First Operational Hub
					</Box>
				</Typography>
				<Typography variant="body1" sx={SUBTEXT_TYPOGRAPHY_SX}>
					Operational views in Ketrik are declared as structured, serializable layout
					data. This architecture gives developers full programmatic control to script,
					version, and orchestrate views in code, while enabling autonomous agents to
					generate layouts from natural language, detect anomalies, and dynamically adapt
					UI surfaces during live operations.
				</Typography>
			</Box>

			{/* Dual-Runtime Visual Canvas */}
			<Paper elevation={0} sx={CANVAS_PAPER_SX}>
				<Box
					sx={sx.compose(
						sx.flexRow,
						sx.gapXs,
						{ alignItems: "center" },
						CANVAS_HEADER_SX,
					)}
				>
					<DynamicIcon name="Memory" sx={FONT_SIZE_18_COLOR_34D399_SX} />
					<Typography variant="caption" sx={CANVAS_TITLE_SX}>
						Dual-Runtime Visual Canvas: How the System Operates
					</Typography>
				</Box>

				{/* 3-Column Architecture Flow */}
				<Grid container spacing={2.5}>
					{/* Left: Developer */}
					<Grid size={{ xs: 12, md: 4 }}>
						<Box sx={COLUMN_DEV_SX}>
							<Box
								sx={sx.compose(
									sx.flexRow,
									sx.gapXs,
									{ alignItems: "center" },
									COLUMN_DEV_HEADER_SX,
								)}
							>
								<DynamicIcon name="Terminal" sx={FONT_SIZE_18_SX} />
								<Typography variant="subtitle2" sx={FONT_WEIGHT_700_SX}>
									DEVELOPER (Code-First)
								</Typography>
							</Box>
							<Typography variant="caption" sx={COLUMN_DEV_SUBTITLE_SX}>
								Deterministic Control
							</Typography>
							<List dense disablePadding>
								{DEV_ITEMS.map((item, idx) => (
									<ListItem key={idx} disableGutters sx={LIST_ITEM_SX}>
										<ListItemIcon sx={LIST_ICON_DEV_SX}>•</ListItemIcon>
										<ListItemText
											primary={item}
											slotProps={{ primary: { sx: LIST_TEXT_SX } }}
										/>
									</ListItem>
								))}
							</List>
						</Box>
					</Grid>

					{/* Center: Specification Bridge */}
					<Grid size={{ xs: 12, md: 4 }}>
						<Box sx={COLUMN_SPEC_SX}>
							<Box
								sx={sx.compose(
									sx.flexRow,
									sx.gapXs,
									{ alignItems: "center" },
									COLUMN_SPEC_HEADER_SX,
								)}
							>
								<DynamicIcon name="Code" sx={FONT_SIZE_18_SX} />
								<Typography variant="subtitle2" sx={FONT_WEIGHT_700_SX}>
									THE SPECIFICATION
								</Typography>
							</Box>
							<Typography variant="caption" sx={COLUMN_SPEC_SUBTITLE_SX}>
								The Universal Contract
							</Typography>
							<List dense disablePadding>
								{SPEC_ITEMS.map((item, idx) => (
									<ListItem key={idx} disableGutters sx={LIST_ITEM_SX}>
										<ListItemIcon sx={LIST_ICON_SPEC_SX}>•</ListItemIcon>
										<ListItemText
											primary={item}
											slotProps={{ primary: { sx: LIST_TEXT_SX } }}
										/>
									</ListItem>
								))}
							</List>
						</Box>
					</Grid>

					{/* Right: Agent */}
					<Grid size={{ xs: 12, md: 4 }}>
						<Box sx={COLUMN_AGENT_SX}>
							<Box
								sx={sx.compose(
									sx.flexRow,
									sx.gapXs,
									{ alignItems: "center" },
									COLUMN_AGENT_HEADER_SX,
								)}
							>
								<DynamicIcon name="SmartToy" sx={FONT_SIZE_18_SX} />
								<Typography variant="subtitle2" sx={FONT_WEIGHT_700_SX}>
									AGENT (Agentic-First)
								</Typography>
							</Box>
							<Typography variant="caption" sx={COLUMN_AGENT_SUBTITLE_SX}>
								Autonomous Intelligence
							</Typography>
							<List dense disablePadding>
								{AGENT_ITEMS.map((item, idx) => (
									<ListItem key={idx} disableGutters sx={LIST_ITEM_SX}>
										<ListItemIcon sx={LIST_ICON_AGENT_SX}>•</ListItemIcon>
										<ListItemText
											primary={item}
											slotProps={{ primary: { sx: LIST_TEXT_SX } }}
										/>
									</ListItem>
								))}
							</List>
						</Box>
					</Grid>
				</Grid>

				{/* Runtime Execution Host Convergence Bar */}
				<Divider sx={DIVIDER_SX} />
				<Box sx={TEXT_ALIGN_CENTER_SX}>
					<Box sx={sx.compose(sx.flexRow, sx.gapXs, RUNTIME_BADGE_CONTAINER_SX)}>
						<DynamicIcon name="VerifiedUser" sx={FONT_SIZE_18_COLOR_34D399_SX} />
						<Typography variant="caption" sx={RUNTIME_BADGE_TEXT_SX}>
							Ketrik Runtime Shell
						</Typography>
					</Box>
					<Typography variant="body2" sx={RUNTIME_DESCRIPTION_SX}>
						Interprets the layout specification, connects data pipes, and mounts WebGL
						charts, virtual grids, and metric ribbons dynamically.
					</Typography>
				</Box>
			</Paper>

			{/* Action Launchers & Architecture Tag */}
			<Box
				sx={sx.compose(
					{ display: "flex", flexDirection: { xs: "column", sm: "row" } },
					sx.gapMd,
					ACTION_ROW_SX,
				)}
			>
				<Box sx={sx.compose(sx.flexRow, sx.gapSm, WRAP_ROW_SX)}>
					<ActionButton
						variant="contained"
						startIcon="AutoAwesome"
						sx={PRIMARY_BTN_SX}
					>
						Prompt Agent to Generate View
						<Box component="span" sx={KEYBOARD_HINT_SX}>
							⌘K
						</Box>
					</ActionButton>

					<ActionButton
						variant="outlined"
						endIcon="OpenInNew"
						sx={SECONDARY_BTN_SX}
					>
						Open Specification Editor
					</ActionButton>
				</Box>

				<Chip
					label="Declarative & Stateless UI Engine"
					size="small"
					sx={STATELSS_CHIP_SX}
				/>
			</Box>
		</Paper>
	);
}
