"use client";
import React from "react";
import type { SxProps, Theme } from "@repo/ui/mui";
import {
	Box,
	Typography,
	Grid,
	Paper,
	Button,
	Chip,
	Avatar,
	Divider,
	LinearProgress,
} from "@repo/ui/mui";
import { ActionButton, IconButton } from "@repo/ui/mui/@extended";
import { DynamicIcon } from "@repo/ui/elements/dynamic-icon";
import { sx } from "@repo/ui/helpers/sx";


const FLEX_GROW_1_SX = { flexGrow: 1 } as const satisfies SxProps<Theme>;

const FONT_WEIGHT_600_SX = { fontWeight: 600 } as const satisfies SxProps<Theme>;

const FONT_SIZE_14PX_IMPORTANT_SX = { fontSize: "14px !important" } as const satisfies SxProps<Theme>;

const MB_2_SX = { mb: 2 } as const satisfies SxProps<Theme>;
export interface ExecutiveDashboardProps {
	onNavigate?: (route: string) => void;
}

const ROOT_BOX_SX = {
	width: "100%",
	py: 2,
} as const satisfies SxProps<Theme>;

const PAGE_HEADER_CONTAINER_SX = {
	mb: 3,
} as const satisfies SxProps<Theme>;

const PAGE_HEADER_ROW_SX = {
	flexDirection: { xs: "column", sm: "row" },
	justifyContent: "space-between",
	alignItems: { xs: "flex-start", sm: "center" },
} as const satisfies SxProps<Theme>;

const HEADER_TITLE_SX = {
	fontWeight: 700,
	mb: 0.5,
} as const satisfies SxProps<Theme>;

const HEADER_SUBTITLE_SX = {
	color: "text.secondary",
} as const satisfies SxProps<Theme>;

const HEADER_CHIP_ICON_SX = {
	fontSize: "14px !important",
	color: "primary.main",
} as const satisfies SxProps<Theme>;

const HEADER_CHIP_SX = {
	fontWeight: 600,
	fontSize: "0.75rem",
	borderColor: "divider",
} as const satisfies SxProps<Theme>;

const SYNTHESIS_BANNER_PAPER_SX = {
	p: 2.5,
	mb: 3,
	borderRadius: 2,
	bgcolor: "background.paper",
	borderColor: "primary.main",
	borderWidth: "1px",
	position: "relative",
	overflow: "hidden",
} as const satisfies SxProps<Theme>;

const SYNTHESIS_BANNER_AVATAR_SX = {
	bgcolor: "primary.main",
	color: "primary.contrastText",
	width: 36,
	height: 36,
	mt: 0.2,
} as const satisfies SxProps<Theme>;

const SYNTHESIS_TITLE_SX = {
	fontWeight: 700,
} as const satisfies SxProps<Theme>;

const SYNTHESIS_BODY_TEXT_SX = {
	color: "text.secondary",
	lineHeight: 1.6,
} as const satisfies SxProps<Theme>;

const MODULE_PAPER_SX = {
	p: 2.5,
	borderRadius: 2,
	bgcolor: "background.paper",
	borderColor: "divider",
	height: "100%",
	justifyContent: "space-between",
} as const satisfies SxProps<Theme>;

const MODULE_HEADER_ROW_SX = {
	justifyContent: "space-between",
	alignItems: "center",
	mb: 2,
} as const satisfies SxProps<Theme>;

const MODULE_AVATAR_SX = {
	width: 32,
	height: 32,
	bgcolor: "action.focus",
} as const satisfies SxProps<Theme>;

const MODULE_TITLE_SX = {
	fontWeight: 700,
} as const satisfies SxProps<Theme>;

const STATUS_CHIP_SX = {
	fontWeight: 600,
	fontSize: "0.7rem",
} as const satisfies SxProps<Theme>;

const STAT_BLOCK_PAPER_SX = {
	p: 1.5,
	bgcolor: "action.hover",
	borderRadius: 1.5,
} as const satisfies SxProps<Theme>;

const STAT_VALUE_SX = {
	fontWeight: 700,
	mt: 0.2,
} as const satisfies SxProps<Theme>;

const PROGRESS_CONTAINER_SX = {
	mb: 2,
} as const satisfies SxProps<Theme>;

const PROGRESS_ROW_SX = {
	justifyContent: "space-between",
	mb: 0.5,
} as const satisfies SxProps<Theme>;

const LINEAR_PROGRESS_SX = {
	height: 6,
	borderRadius: 1,
} as const satisfies SxProps<Theme>;

const ALERT_BLOCK_WARNING_SX = {
	p: 1.5,
	bgcolor: "action.hover",
	borderRadius: 1.5,
	borderLeft: 3,
	borderColor: "warning.main",
} as const satisfies SxProps<Theme>;

const ALERT_BLOCK_INFO_SX = {
	p: 1.5,
	bgcolor: "action.hover",
	borderRadius: 1.5,
	borderLeft: 3,
	borderColor: "info.main",
} as const satisfies SxProps<Theme>;

const ALERT_LABEL_WARNING_SX = {
	color: "warning.main",
	fontWeight: 700,
	display: "block",
} as const satisfies SxProps<Theme>;

const ALERT_LABEL_INFO_SX = {
	color: "info.main",
	fontWeight: 700,
	display: "block",
} as const satisfies SxProps<Theme>;

const ALERT_TITLE_SX = {
	fontWeight: 600,
	mt: 0.2,
} as const satisfies SxProps<Theme>;

const ROW_BETWEEN_SX = {
	justifyContent: "space-between",
	alignItems: "center",
} as const satisfies SxProps<Theme>;

const ACTION_BUTTON_SX = {
	textTransform: "none",
	fontWeight: 600,
	alignSelf: "flex-start",
	p: 0,
} as const satisfies SxProps<Theme>;

export const ExecutiveSynthesisDashboard: React.FC<ExecutiveDashboardProps> = ({
	onNavigate = () => {},
}) => {
	return (
		<Box sx={ROOT_BOX_SX}>
			{/* Page Header */}
			<Box sx={PAGE_HEADER_CONTAINER_SX}>
				<Box sx={sx.compose(sx.flexRow, sx.gapSm, PAGE_HEADER_ROW_SX)}>
					<Box>
						<Typography variant="h5" sx={HEADER_TITLE_SX}>
							Executive Overview
						</Typography>
						<Typography variant="body2" sx={HEADER_SUBTITLE_SX}>
							Synthesized from 4 active background intelligence agents.
						</Typography>
					</Box>
					<Chip
						icon={<DynamicIcon name="AutoAwesome" sx={HEADER_CHIP_ICON_SX} />}
						label="Live Synthesis Active"
						size="small"
						variant="outlined"
						sx={HEADER_CHIP_SX}
					/>
				</Box>
			</Box>

			{/* AI Daily Synthesis Banner */}
			<Paper variant="outlined" sx={SYNTHESIS_BANNER_PAPER_SX}>
				<Box sx={sx.compose(sx.flexRow, sx.gapMd, { alignItems: "flex-start" })}>
					<Avatar variant="rounded" sx={SYNTHESIS_BANNER_AVATAR_SX}>
						<DynamicIcon name="AutoAwesome" fontSize="small" />
					</Avatar>
					<Box sx={FLEX_GROW_1_SX}>
						<Box sx={sx.compose(sx.flexRow, sx.gapSm, { alignItems: "center", mb: 0.5 })}>
							<Typography variant="subtitle2" sx={SYNTHESIS_TITLE_SX}>
								Daily Agent Synthesis
							</Typography>
							<Typography variant="caption" sx={HEADER_SUBTITLE_SX}>
								Updated 12m ago
							</Typography>
						</Box>
						<Typography variant="body2" sx={SYNTHESIS_BODY_TEXT_SX}>
							ARR run-rate is pacing <strong>+8.4%</strong> ahead of quarterly target,
							driven by enterprise renewals. The Industry Sentinel detected a new patent
							filing by <strong>Apex Systems</strong> in EU jurisdiction, which may influence
							your Q4 AI product expansion. 2 new governance docs are pending verification in
							the Knowledge Base.
						</Typography>
					</Box>
				</Box>
			</Paper>

			{/* Cross-Agent Grid Matrix */}
			<Grid container spacing={2.5}>
				{/* Module 1: Corporate Dossier Snapshot */}
				<Grid size={{ xs: 12, md: 6 }}>
					<Paper variant="outlined" sx={sx.compose(sx.flexCol, MODULE_PAPER_SX)}>
						<Box>
							<Box sx={sx.compose(sx.flexRow, MODULE_HEADER_ROW_SX)}>
								<Box sx={sx.compose(sx.flexRow, sx.gapSm)}>
									<Avatar variant="rounded" sx={MODULE_AVATAR_SX}>
										<DynamicIcon name="CorporateFare" fontSize="small" />
									</Avatar>
									<Typography variant="subtitle2" sx={MODULE_TITLE_SX}>
										Company Dossier
									</Typography>
								</Box>
								<Chip label="Verified" size="small" color="success" variant="outlined" sx={STATUS_CHIP_SX} />
							</Box>

							<Box sx={sx.compose(sx.flexCol, sx.gapSm, { mb: 2 })}>
								<Box sx={sx.compose(sx.flexRow, { justifyContent: "space-between" })}>
									<Typography variant="caption" sx={HEADER_SUBTITLE_SX}>
										Entity & Ticker
									</Typography>
									<Typography variant="body2" sx={FONT_WEIGHT_600_SX}>
										Acme Corp (NASDAQ: ACM)
									</Typography>
								</Box>
								<Divider />
								<Box sx={sx.compose(sx.flexRow, { justifyContent: "space-between" })}>
									<Typography variant="caption" sx={HEADER_SUBTITLE_SX}>
										Global Headcount
									</Typography>
									<Typography variant="body2" sx={FONT_WEIGHT_600_SX}>
										1,420 (+4.2% QoQ)
									</Typography>
								</Box>
								<Divider />
								<Box sx={sx.compose(sx.flexRow, { justifyContent: "space-between" })}>
									<Typography variant="caption" sx={HEADER_SUBTITLE_SX}>
										Active Subsidiaries
									</Typography>
									<Typography variant="body2" sx={FONT_WEIGHT_600_SX}>
										18 Operating Entities
									</Typography>
								</Box>
							</Box>
						</Box>

						<ActionButton
							size="small"
							endIcon="ArrowForward"
							onClick={() => onNavigate("/dossier")}
							sx={ACTION_BUTTON_SX}
						>
							Open Full Company Dossier
						</ActionButton>
					</Paper>
				</Grid>

				{/* Module 2: Key Financial & Growth KPIs */}
				<Grid size={{ xs: 12, md: 6 }}>
					<Paper variant="outlined" sx={sx.compose(sx.flexCol, MODULE_PAPER_SX)}>
						<Box>
							<Box sx={sx.compose(sx.flexRow, MODULE_HEADER_ROW_SX)}>
								<Box sx={sx.compose(sx.flexRow, sx.gapSm)}>
									<Avatar variant="rounded" sx={MODULE_AVATAR_SX}>
										<DynamicIcon name="Timeline" fontSize="small" />
									</Avatar>
									<Typography variant="subtitle2" sx={MODULE_TITLE_SX}>
										Financial & Product KPIs
									</Typography>
								</Box>
								<Chip
									icon={<DynamicIcon name="TrendingUp" sx={FONT_SIZE_14PX_IMPORTANT_SX} />}
									label="+18% YoY"
									size="small"
									color="primary"
									variant="outlined"
									sx={STATUS_CHIP_SX}
								/>
							</Box>

							<Grid container spacing={2} sx={MB_2_SX}>
								<Grid size={{ xs: 6 }}>
									<Box sx={STAT_BLOCK_PAPER_SX}>
										<Typography variant="caption" sx={HEADER_SUBTITLE_SX}>
											Current ARR
										</Typography>
										<Typography variant="h6" sx={STAT_VALUE_SX}>
											$42.8M
										</Typography>
									</Box>
								</Grid>
								<Grid size={{ xs: 6 }}>
									<Box sx={STAT_BLOCK_PAPER_SX}>
										<Typography variant="caption" sx={HEADER_SUBTITLE_SX}>
											Net Retention (NRR)
										</Typography>
										<Typography variant="h6" sx={STAT_VALUE_SX}>
											124.5%
										</Typography>
									</Box>
								</Grid>
							</Grid>

							<Box sx={PROGRESS_CONTAINER_SX}>
								<Box sx={sx.compose(sx.flexRow, PROGRESS_ROW_SX)}>
									<Typography variant="caption" sx={HEADER_SUBTITLE_SX}>
										Q3 Target Attainment
									</Typography>
									<Typography variant="caption" sx={FONT_WEIGHT_600_SX}>
										88%
									</Typography>
								</Box>
								<LinearProgress variant="determinate" value={88} sx={LINEAR_PROGRESS_SX} />
							</Box>
						</Box>

						<ActionButton
							size="small"
							endIcon="ArrowForward"
							onClick={() => onNavigate("/kpis")}
							sx={ACTION_BUTTON_SX}
						>
							Explore KPI Command Grid
						</ActionButton>
					</Paper>
				</Grid>

				{/* Module 3: Market & Industry Sentinel */}
				<Grid size={{ xs: 12, md: 6 }}>
					<Paper variant="outlined" sx={sx.compose(sx.flexCol, MODULE_PAPER_SX)}>
						<Box>
							<Box sx={sx.compose(sx.flexRow, MODULE_HEADER_ROW_SX)}>
								<Box sx={sx.compose(sx.flexRow, sx.gapSm)}>
									<Avatar variant="rounded" sx={MODULE_AVATAR_SX}>
										<DynamicIcon name="Public" fontSize="small" />
									</Avatar>
									<Typography variant="subtitle2" sx={MODULE_TITLE_SX}>
										Industry Signals & Alerts
									</Typography>
								</Box>
								<Typography variant="caption" sx={HEADER_SUBTITLE_SX}>
									14 Feeds Active
								</Typography>
							</Box>

							<Box sx={sx.compose(sx.flexCol, sx.gapSm, { mb: 2 })}>
								<Box sx={ALERT_BLOCK_WARNING_SX}>
									<Typography variant="caption" sx={ALERT_LABEL_WARNING_SX}>
										COMPETITOR MOVE
									</Typography>
									<Typography variant="body2" sx={ALERT_TITLE_SX}>
										Apex Systems launched enterprise multi-region billing
									</Typography>
									<Typography variant="caption" sx={HEADER_SUBTITLE_SX}>
										2 hours ago • Reuters Tech
									</Typography>
								</Box>

								<Box sx={ALERT_BLOCK_INFO_SX}>
									<Typography variant="caption" sx={ALERT_LABEL_INFO_SX}>
										REGULATORY PULSE
									</Typography>
									<Typography variant="body2" sx={ALERT_TITLE_SX}>
										EU publishes draft framework for automated data extraction
									</Typography>
									<Typography variant="caption" sx={HEADER_SUBTITLE_SX}>
										5 hours ago • Eur-Lex
									</Typography>
								</Box>
							</Box>
						</Box>

						<ActionButton
							size="small"
							endIcon="ArrowForward"
							onClick={() => onNavigate("/news")}
							sx={ACTION_BUTTON_SX}
						>
							View All Market Signals
						</ActionButton>
					</Paper>
				</Grid>

				{/* Module 4: Knowledge Base & Internal Sync */}
				<Grid size={{ xs: 12, md: 6 }}>
					<Paper variant="outlined" sx={sx.compose(sx.flexCol, MODULE_PAPER_SX)}>
						<Box>
							<Box sx={sx.compose(sx.flexRow, MODULE_HEADER_ROW_SX)}>
								<Box sx={sx.compose(sx.flexRow, sx.gapSm)}>
									<Avatar variant="rounded" sx={MODULE_AVATAR_SX}>
										<DynamicIcon name="MenuBook" fontSize="small" />
									</Avatar>
									<Typography variant="subtitle2" sx={MODULE_TITLE_SX}>
										Knowledge Base & Documents
									</Typography>
								</Box>
								<Chip label="970 Indexed Docs" size="small" variant="outlined" sx={STATUS_CHIP_SX} />
							</Box>

							<Box sx={sx.compose(sx.flexCol, sx.gapSm, { mb: 2 })}>
								<Box sx={sx.compose(sx.flexRow, ROW_BETWEEN_SX)}>
									<Box>
										<Typography variant="body2" sx={FONT_WEIGHT_600_SX}>
											FY26 Compliance Framework SOP
										</Typography>
										<Typography variant="caption" sx={HEADER_SUBTITLE_SX}>
											Updated yesterday by Legal Ops
										</Typography>
									</Box>
									<IconButton size="small" icon="OpenInNew" />
								</Box>
								<Divider />
								<Box sx={sx.compose(sx.flexRow, ROW_BETWEEN_SX)}>
									<Box>
										<Typography variant="body2" sx={FONT_WEIGHT_600_SX}>
											Q3 Board Strategy Slides (Draft)
										</Typography>
										<Typography variant="caption" sx={HEADER_SUBTITLE_SX}>
											Vectorized 3 hours ago
										</Typography>
									</Box>
									<IconButton size="small" icon="OpenInNew" />
								</Box>
							</Box>
						</Box>

						<ActionButton
							size="small"
							endIcon="ArrowForward"
							onClick={() => onNavigate("/knowledge")}
							sx={ACTION_BUTTON_SX}
						>
							Search Semantic Knowledge Base
						</ActionButton>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
};

export default ExecutiveSynthesisDashboard;
