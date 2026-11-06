"use client";
import type { SxProps, Theme } from "@repo/ui/mui";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Chip,
	Paper,
	Typography,
} from "@repo/ui/mui";
import { isArray } from "@repo/shared/utils/is-array";
import { DynamicIcon } from "@repo/ui/elements/dynamic-icon";
import { ExpandMore } from "@repo/ui/icons";
import React, { useState } from "react";
import { sx } from "@repo/ui/helpers/sx";

export interface MiniFaqItem {
	id?: string;
	question: string;
	answer: string;
	category?: string;
	iconName?: string;
	icon?: React.ReactNode;
	badge?: string;
}

export interface MiniFaqData {
	title?: string;
	items?: MiniFaqItem[];
}

export interface KetrikMiniFaqProps {
	data?:
		| {
				miniFaq?: MiniFaqData;
		  }
		| MiniFaqData
		| MiniFaqItem[];
	metadata?: Record<string, unknown>;
}

const CONTAINER_BOX_SX = {
	position: "relative",
	zIndex: 10,
} as const satisfies SxProps<Theme>;

const PAPER_SX = {
	borderRadius: 3,
	overflow: "hidden",
	borderColor: "divider",
	bgcolor: "background.paper",
} as const satisfies SxProps<Theme>;

const ACCORDION_SX = {
	"&:before": { display: "none" },
	bgcolor: "transparent",
} as const satisfies SxProps<Theme>;

const ACCORDION_BORDER_SX = {
	borderBottom: "1px solid",
	borderColor: "divider",
} as const satisfies SxProps<Theme>;

const ACCORDION_SUMMARY_SX = {
	px: 3,
	py: 1,
} as const satisfies SxProps<Theme>;

const ACCORDION_DETAILS_SX = {
	px: 3,
	pb: 2.5,
	pt: 0,
} as const satisfies SxProps<Theme>;

const ITEM_HEADER_ROW_SX = {
	width: "100%",
	justifyContent: "space-between",
	pr: 1,
} as const satisfies SxProps<Theme>;

const QUESTION_TEXT_SX = {
	fontWeight: 700,
	lineHeight: 1.4,
} as const satisfies SxProps<Theme>;

const ITEM_BADGE_SX = {
	fontSize: "0.65rem",
	fontWeight: 600,
	height: 20,
	borderRadius: 1,
	display: { xs: "none", md: "inline-flex" },
} as const satisfies SxProps<Theme>;

const ANSWER_TEXT_SX = {
	lineHeight: 1.6,
	color: "text.secondary",
} as const satisfies SxProps<Theme>;

export default function MiniFaqSection({ data }: KetrikMiniFaqProps) {
	const rawItems = isArray(data)
		? data
		: isArray(data?.items)
			? data.items
			: isArray(data?.miniFaq?.items)
				? data.miniFaq.items
				: [];

	const items: MiniFaqItem[] = rawItems;
	const [expanded, setExpanded] = useState<string | false>(items[0]?.id ?? "panel1");

	const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false);
	};

	if (!items || items.length === 0) return null;

	return (
		<Box sx={CONTAINER_BOX_SX}>
			<Paper elevation={0} variant="outlined" sx={PAPER_SX}>
				{items?.map((item, index) => {
					const panelId = item.id || `panel-${index + 1}`;
					const isLast = index === items.length - 1;

					return (
						<Accordion
							key={panelId}
							expanded={expanded === panelId}
							onChange={handleChange(panelId)}
							disableGutters
							elevation={0}
							sx={sx.compose(ACCORDION_SX, !isLast && ACCORDION_BORDER_SX)}
						>
							<AccordionSummary
								expandIcon={<ExpandMore color="action" />}
								sx={ACCORDION_SUMMARY_SX}
							>
								<Box sx={sx.compose(sx.flexRow, sx.gapSm, ITEM_HEADER_ROW_SX)}>
									<Box sx={sx.compose(sx.flexRow, sx.gapSm, sx.flexCenter)}>
										<DynamicIcon
											name={item.iconName}
											fallbackIcon={item.icon}
											fontSize="small"
											color="primary"
										/>
										<Typography
											variant="subtitle2"
											sx={QUESTION_TEXT_SX}
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
				})}
			</Paper>
		</Box>
	);
}
