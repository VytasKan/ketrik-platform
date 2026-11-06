"use client";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	alpha,
	Box,
	Chip,
	InputAdornment,
	Paper,
	TextField,
	Typography,
	type SxProps,
	type Theme,
} from "@repo/ui/mui";
import {
	ExpandMore,
	HelpOutlineOutlined,
	SearchOutlined,
	SupportAgentOutlined,
} from "@repo/ui/icons";
import React, { useState } from "react";
import { sx } from "@repo/ui/helpers/sx";
import { Button, IconButton } from "@repo/ui/mui/@extended";
import { DynamicIcon } from "@repo/ui/elements/dynamic-icon";
import type { ComponentType } from "@repo/shared/types/index";
import { isArray } from "@repo/shared/utils/is-array";

export interface KetrikFaqItem {
	id?: string;
	question: string;
	answer: string;
	category?: string;
	iconName?: string;
	icon?: React.ReactNode;
	badge?: string;
}

export interface KetrikFaqCategory {
	id: string;
	title: string;
	iconName?: string;
	icon?: React.ReactNode;
}

export interface KetrikFaqContactBox {
	title?: string;
	subtitle?: string;
	buttonLabel?: string;
	buttonHref?: string;
	onContactClick?: () => void;
}

export interface KetrikFaqData {
	chipLabel?: string;
	title?: string;
	subtitle?: string;
	searchPlaceholder?: string;
	categories?: KetrikFaqCategory[];
	items?: KetrikFaqItem[];
	contactBox?: KetrikFaqContactBox;
}

const DEFAULT_CATEGORIES: KetrikFaqCategory[] = [
	{ id: "all", title: "All Questions", iconName: "QuizOutlined" },
	{ id: "general", title: "General & Platform", iconName: "HelpOutlineOutlined" },
	{ id: "integration", title: "Integrations & APIs", iconName: "LayersOutlined" },
	{ id: "performance", title: "Performance & AI", iconName: "SpeedOutlined" },
	{ id: "security", title: "Security & Privacy", iconName: "ShieldOutlined" },
];

const DEFAULT_ITEMS: KetrikFaqItem[] = [
	{
		id: "q1",
		question: "What is Ketrik and how does it integrate with existing workflows?",
		answer: "Ketrik is a live, AI-powered command surface that connects directly to your databases, APIs, spreadsheets, and custom logic without requiring a full rebuild of your underlying tech stack. It aggregates data into dynamic dashboards, automated alerts, and executable action flows.",
		category: "general",
		iconName: "HelpOutlineOutlined",
		badge: "Platform",
	},
	{
		id: "q2",
		question: "How does Ketrik handle real-time data ingestion and processing?",
		answer: "Ketrik uses an event-driven streaming architecture and WebSocket connections to map live feeds in real time. Incoming data is immediately evaluated against custom trigger rules and AI anomaly detection models.",
		category: "performance",
		iconName: "SpeedOutlined",
		badge: "Real-Time",
	},
	{
		id: "q3",
		question: "Can I connect custom third-party APIs or internal databases?",
		answer: "Yes, Ketrik provides pre-built connectors for major CRMs, SQL/NoSQL databases, cloud warehouses, and REST/GraphQL APIs. You can also define custom OpenAPI schemas for proprietary endpoints.",
		category: "integration",
		iconName: "LayersOutlined",
		badge: "Connectors",
	},
	{
		id: "q4",
		question:
			"Is data sent to Ketrik encrypted and compliant with enterprise security standards?",
		answer: "All data in transit is protected using TLS 1.3 encryption, and data at rest is encrypted with AES-256. Ketrik supports SOC2 Type II compliance, enterprise SSO (SAML/OIDC), and granular role-based access control (RBAC).",
		category: "security",
		iconName: "ShieldOutlined",
		badge: "Security",
	},
	{
		id: "q5",
		question: "How do AI-guided actions work within the Ketrik Shell?",
		answer: "The Ketrik AI engine continuously analyzes operational health metrics and suggests actionable steps. Operators can execute multi-step workflows, dispatch team notifications, or trigger external API payloads directly from single-click action buttons.",
		category: "general",
		iconName: "AutoAwesomeOutlined",
		badge: "AI Engine",
	},
	{
		id: "q6",
		question: "Can I customize the visual interface and white-label the surface for clients?",
		answer: "Yes! Ketrik is built with customizable theme primitives. Tech leads and consultants can brand the command surface with custom color schemes, typography, layout bounds, and logo assets for bespoke client delivery.",
		category: "general",
		iconName: "TuneOutlined",
		badge: "Customization",
	},

	{
		id: "q7",
		question: "What are Ketrik Agents actually doing behind the scenes?",
		answer: "They watch your entire business in real time. Ketrik Agents constantly monitor the live metrics, customer events, and operational signals flowing into your shell—spotting patterns, shifts, and risks the moment they happen without requiring you to manually scan multiple screens.",
		category: "agents",
		iconName: "VisibilityOutlined",
		badge: "Monitoring",
	},

	{
		id: "q8",
		question: "How do agents know what needs my attention versus routine tasks?",
		answer: "They prioritize and filter before disturbing you. Rather than flooding your phone with endless raw alerts, agents evaluate urgency, impact, and business context—automatically handling routine updates on their own and only escalating critical issues directly to your main command surface.",
		category: "agents",
		iconName: "PsychologyOutlined",
		badge: "Prioritization",
	},
	{
		id: "q9",
		question: "Do agents replace my current tools, or do they work through them?",
		answer: "They work directly through the tools you already use. When an action is required, Ketrik Agents trigger your existing workflows, update your connected databases, and send notifications to your team, executing necessary steps across your stack and reporting results back into your shell.",
		category: "agents",
		iconName: "AutoModeOutlined",
		badge: "Execution",
	},
];

const DEFAULT_DATA: KetrikFaqData = {
	chipLabel: "HELP & FAQ",
	title: "Frequently Asked Questions",
	subtitle:
		"Everything you need to know about the Ketrik Shell, data integrations, security, and live command surface.",
	searchPlaceholder: "Search questions, integrations, keywords...",
	categories: DEFAULT_CATEGORIES,
	items: DEFAULT_ITEMS,
	contactBox: {
		title: "Still have questions?",
		subtitle: "Try exploring our interactive shell instead.",
		buttonLabel: "Explore interactive shell",
	},
};

const CONTAINER_PAPER_SX = {
	borderRadius: 3,
	bgcolor: "transparent",
	//border: "1px solid",
	borderColor: "divider",

	maxWidth: { xs: "100%", md: 920 },
	mx: "auto",
	position: "relative",
	zIndex: 10,
} as const satisfies SxProps<Theme>;

const HEADER_CHIP_SX = {
	fontSize: "0.65rem",
	fontWeight: 700,
	height: 22,
	bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.1),
	color: "primary.main",
	borderRadius: 1,
	border: "1px solid",
	borderColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.2),
} as const satisfies SxProps<Theme>;

const HEADER_BOX_SX = {
	textAlign: "center",
	alignItems: "center",
} as const satisfies SxProps<Theme>;

const MAIN_TITLE_SX = {
	fontWeight: 800,
	letterSpacing: "-0.02em",
} as const satisfies SxProps<Theme>;

const SUBTITLE_SX = {
	maxWidth: 620,
	mx: "auto",
	textAlign: "center",
	color: "text.secondary",
} as const satisfies SxProps<Theme>;

const SEARCH_FIELD_SX = {
	width: "100%",
	maxWidth: 540,
	mx: "auto",
	"& .MuiOutlinedInput-root": {
		borderRadius: 2.5,
		bgcolor: "action.hover",
		transition: "all 0.2s ease-in-out",
		"&:hover": {
			bgcolor: "action.selected",
		},
		"&.Mui-focused": {
			bgcolor: "background.paper",
			boxShadow: (theme: Theme) => `0 0 14px ${alpha(theme.palette.primary.main, 0.25)}`,
		},
	},
} as const satisfies SxProps<Theme>;

const CATEGORY_CHIP_ROW_SX = {
	flexWrap: "wrap",
	justifyContent: "center",
} as const satisfies SxProps<Theme>;

const CATEGORY_CHIP_SX = {
	fontSize: "0.75rem",
	fontWeight: 600,
	height: 30,
	borderRadius: 1.5,
	transition: "all 0.2s ease-in-out",
	"&:hover": {
		transform: "translateY(-1px)",
	},
} as const satisfies SxProps<Theme>;

interface CategoryChipItemProps {
	readonly id: string;
	readonly title: string;
	readonly iconName?: string;
	readonly icon?: React.ReactNode;
	readonly isSelected: boolean;
	readonly onSelect: (id: string) => void;
}

function CategoryChipItem({
	id,
	title,
	iconName,
	icon,
	isSelected,
	onSelect,
}: CategoryChipItemProps) {
	const handleClick = () => onSelect(id);
	const catIcon = icon ?? (iconName ? <DynamicIcon name={iconName} fontSize="small" color="primary" /> : undefined);

	return (
		<Chip
			icon={React.isValidElement(catIcon) ? catIcon : undefined}
			label={title}
			clickable
			variant={isSelected ? "filled" : "outlined"}
			color={isSelected ? "primary" : "default"}
			onClick={handleClick}
			sx={CATEGORY_CHIP_SX}
		/>
	);
}

const ACCORDION_CONTAINER_SX = {
	mt: 0.5,
} as const satisfies SxProps<Theme>;

const ACCORDION_ITEM_SX = {
	bgcolor: "background.paper",
	borderRadius: "12px !important",
	border: "1px solid",
	borderColor: "divider",
	boxShadow: "none",
	transition: "all 0.2s ease-in-out",
	"&:before": {
		display: "none",
	},
	"&:hover": {
		borderColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.4),
	},
	"&.Mui-expanded": {
		borderColor: "primary.main",
		boxShadow: (theme: Theme) => `0 4px 16px ${alpha(theme.palette.primary.main, 0.12)}`,
		my: "0px !important",
	},
} as const satisfies SxProps<Theme>;

const ACCORDION_SUMMARY_SX = {
	px: 2.5,
	py: 1,
	borderRadius: 2,
	"& .MuiAccordionSummary-content": {
		my: 1.25,
	},
} as const satisfies SxProps<Theme>;

const ACCORDION_DETAILS_SX = {
	px: 2.5,
	pb: 2.5,
	pt: 0,
	borderTop: "1px dashed",
	borderColor: "divider",
} as const satisfies SxProps<Theme>;

const ITEM_HEADER_ROW_SX = {
	width: "100%",
	justifyContent: "space-between",
	pr: 1,
} as const satisfies SxProps<Theme>;

const ITEM_TITLE_SX = {
	fontWeight: 600,
	lineHeight: 1.4,
} as const satisfies SxProps<Theme>;

const ITEM_BADGE_SX = {
	fontSize: "0.65rem",
	fontWeight: 600,
	height: 20,
	borderRadius: 1,
} as const satisfies SxProps<Theme>;

const ANSWER_TEXT_SX = {
	lineHeight: 1.65,
	pt: 1.5,
	color: "text.secondary",
} as const satisfies SxProps<Theme>;

const EMPTY_SUBTITLE_SX = {
	display: "block",
	mt: 0.5,
	color: "text.secondary",
} as const satisfies SxProps<Theme>;

const CONTACT_TITLE_SX = {
	fontWeight: 700,
} as const satisfies SxProps<Theme>;

const CONTACT_SUBTITLE_SX = {
	display: "block",
	mt: 0.25,
	color: "text.secondary",
} as const satisfies SxProps<Theme>;

const EMPTY_STATE_SX = {
	py: 5,
	px: 2,
	textAlign: "center",
	borderRadius: 2,
	bgcolor: "action.hover",
	border: "1px dashed",
	borderColor: "divider",
} as const satisfies SxProps<Theme>;

const SUPPORT_CARD_SX = {
	p: { xs: 2.5, sm: 3 },
	mt: 1,
	borderRadius: 2.5,
	bgcolor: (theme: Theme) =>
		alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.08 : 0.04),
	border: "1px solid",
	borderColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.2),
	justifyContent: "space-between",
	alignItems: { xs: "stretch", md: "center" },
	flexDirection: { xs: "column", md: "row" },
} as const satisfies SxProps<Theme>;

const SUPPORT_TEXT_BOX_SX = {
	flex: 1,
	alignItems: "center",
} as const satisfies SxProps<Theme>;

const SUPPORT_BUTTON_SX = {
	mt: { xs: 2, sm: 0 },
	alignSelf: { xs: "stretch", md: "center" },
	fontWeight: 600,
	whiteSpace: "nowrap",
	flexShrink: 0,
} as const satisfies SxProps<Theme>;

const SUPPORT_ICON_BOX_SX = {
	width: 44,
	height: 44,
	borderRadius: 2,
	bgcolor: "primary.main",
	color: "primary.contrastText",
	flexShrink: 0,
} as const satisfies SxProps<Theme>;

export default function KetrikFaq({ data }: ComponentType) {
	const {
		chipLabel,
		title,
		subtitle,
		searchPlaceholder,
		items = [],
		contactBox,
		categories = [],
	} = data;

	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [expandedId, setExpandedId] = useState<string | false>("q1");

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleClearSearch = () => {
		setSearchQuery("");
	};

	const handleCategoryClick = (catId: string) => {
		setSelectedCategory(catId);
	};

	const handleAccordionToggle =
		(panelId: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpandedId(isExpanded ? panelId : false);
		};

	const filteredItems = items.filter((item) => {
		const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
		const matchesQuery =
			!searchQuery.trim() ||
			item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
			(item.badge && item.badge.toLowerCase().includes(searchQuery.toLowerCase()));
		return matchesCategory && matchesQuery;
	});

	return (
		<Paper elevation={0} sx={CONTAINER_PAPER_SX}>
			<Box sx={sx.compose(sx.flexCol, sx.gapMd)}>
				{/* 1. HEADER SECTION */}
				<Box sx={sx.compose(sx.flexCol, sx.gapSm, HEADER_BOX_SX)}>
					{chipLabel && <Chip label={chipLabel} size="small" sx={HEADER_CHIP_SX} />}
					{title && (
						<Typography variant="h5" sx={MAIN_TITLE_SX}>
							{title}
						</Typography>
					)}
					{subtitle && (
						<Typography variant="body2" sx={SUBTITLE_SX}>
							{subtitle}
						</Typography>
					)}
				</Box>

				{/* 2. SEARCH BAR */}
				{false && (
					<TextField
						variant="outlined"
						size="small"
						placeholder={searchPlaceholder}
						value={searchQuery}
						onChange={handleSearchChange}
						sx={SEARCH_FIELD_SX}
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<SearchOutlined fontSize="small" color="action" />
									</InputAdornment>
								),
								endAdornment: searchQuery ? (
									<InputAdornment position="end">
										<IconButton
											size="small"
											icon="ClearOutlined"
											onClick={handleClearSearch}
											aria-label="Clear search"
										/>
									</InputAdornment>
								) : null,
							},
						}}
					/>
				)}

				{/* 3. CATEGORY CHIPS */}
				{isArray(categories) && (
					<Box sx={sx.compose(sx.flexRow, sx.gapSm, CATEGORY_CHIP_ROW_SX)}>
						{categories.map((cat) => (
							<CategoryChipItem
								key={cat.id}
								id={cat.id}
								title={cat.title}
								iconName={cat.iconName}
								icon={cat.icon}
								isSelected={selectedCategory === cat.id}
								onSelect={handleCategoryClick}
							/>
						))}
					</Box>
				)}

				{/* 4. ACCORDION LIST */}
				<Box sx={sx.compose(sx.flexCol, sx.gapSm, ACCORDION_CONTAINER_SX)}>
					{filteredItems.length > 0 ? (
						filteredItems.map((item, index) => {
							const itemId = item.id || `faq-${index}`;
							const isExpanded = expandedId === itemId;
							const itemIcon = item.icon ?? (
								<DynamicIcon
									name={item.iconName}
									fontSize="small"
									color="primary"
									fallbackIcon={
										<HelpOutlineOutlined fontSize="small" color="primary" />
									}
								/>
							);

							return (
								<Accordion
									key={itemId}
									expanded={isExpanded}
									onChange={handleAccordionToggle(itemId)}
									disableGutters
									sx={ACCORDION_ITEM_SX}
								>
									<AccordionSummary
										expandIcon={<ExpandMore color="action" />}
										sx={ACCORDION_SUMMARY_SX}
									>
										<Box
											sx={sx.compose(
												sx.flexRow,
												sx.gapSm,
												ITEM_HEADER_ROW_SX,
											)}
										>
											<Box sx={sx.compose(sx.flexRow, sx.gapSm)}>
												{itemIcon}
												<Typography
													variant="subtitle2"
													sx={ITEM_TITLE_SX}
												>
													{item.question}
												</Typography>
											</Box>
											{item.badge && (
												<Chip
													label={item.badge}
													size="small"
													variant="outlined"
													sx={ITEM_BADGE_SX}
												/>
											)}
										</Box>
									</AccordionSummary>
									<AccordionDetails sx={ACCORDION_DETAILS_SX}>
										<Typography
											variant="body2"
											sx={ANSWER_TEXT_SX}
										>
											{item.answer}
										</Typography>
									</AccordionDetails>
								</Accordion>
							);
						})
					) : items.length === 0 ? (
						<Box sx={EMPTY_STATE_SX}>
							<Typography variant="subtitle2">
								No FAQ available
							</Typography>
						</Box>
					) : (
						<Box sx={EMPTY_STATE_SX}>
							<Typography variant="subtitle2">
								No questions found matching "{searchQuery}"
							</Typography>
							<Typography
								variant="caption"
								sx={EMPTY_SUBTITLE_SX}
							>
								Try clearing your search query or selecting a different category.
							</Typography>
						</Box>
					)}
				</Box>

				{/* 5. SUPPORT CTA BOX */}
				{contactBox && (
					<Paper variant="outlined" sx={sx.compose(sx.flexRow, sx.gapMd, SUPPORT_CARD_SX)}>
						<Box sx={sx.compose(sx.flexRow, sx.gapMd, SUPPORT_TEXT_BOX_SX)}>
							<Box sx={sx.compose(sx.flexCenter, SUPPORT_ICON_BOX_SX)}>
								<SupportAgentOutlined />
							</Box>
							<Box>
								{contactBox.title && (
									<Typography
										variant="subtitle2"
										sx={CONTACT_TITLE_SX}
									>
										{contactBox.title}
									</Typography>
								)}
								{contactBox.subtitle && (
									<Typography
										variant="caption"
										sx={CONTACT_SUBTITLE_SX}
									>
										{contactBox.subtitle}
									</Typography>
								)}
							</Box>
						</Box>

						{contactBox.buttonLabel && (
							<Button
								href={contactBox.buttonHref || "/demo"}
								variant="contained"
								color="primary"
								size="small"
								sx={SUPPORT_BUTTON_SX}
							>
								{contactBox.buttonLabel}
							</Button>
						)}
					</Paper>
				)}
			</Box>
		</Paper>
	);
}
