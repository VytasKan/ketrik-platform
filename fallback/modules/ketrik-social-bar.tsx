"use client";
import type { SxProps, Theme } from "@repo/ui/mui";
import { Avatar, Box, Divider, Paper, Typography } from "@repo/ui/mui";
import { isArray } from "@repo/shared/utils/is-array";
import { FormatQuoteOutlined, VerifiedOutlined } from "@repo/ui/icons";
import { Link } from "@repo/ui/mui/@extended";
import Image from "next/image";
import React from "react";
import { sx } from "@repo/ui/helpers/sx";

export interface SocialLogoItem {
	id?: string;
	name: string;
	logoUrl?: string;
	svgIcon?: React.ReactNode;
	invertInLightMode?: boolean;
	href?: string;
	target?: string;
}

export interface TestimonialData {
	quote?: string;
	authorName?: string;
	authorRole?: string;
	authorCompany?: string;
	avatarInitials?: string;
	avatarUrl?: string;
}

export interface SocialProofData {
	headline?: string;
	logos?: SocialLogoItem[];
	testimonial?: TestimonialData;
}

export interface KetrikSocialBarProps {
	data?: SocialProofData;
	metadata?: Record<string, unknown>;
	mode?: string;
}

const DEFAULT_LOGOS: SocialLogoItem[] = [];

const DEFAULT_TESTIMONIAL: TestimonialData = {
	quote: "“Ketrik let us stand up a live broker dashboard with alerts in days, not months of custom dev. Our client felt like they got a $100k custom software build overnight.”",
	authorName: "DC",
	authorRole: "Lead Data Architect",
	authorCompany: "Enterprise Analytics & Brokerage Consulting",
	avatarInitials: "DC",
};

const DEFAULT_DATA: SocialProofData = {
	headline: "Trusted by operators, agencies & SaaS teams",
	logos: DEFAULT_LOGOS,
	testimonial: DEFAULT_TESTIMONIAL,
};

const CONTAINER_BOX_SX = {
	py: 4,
	px: 2,
	borderTop: "1px solid",
	borderBottom: "1px solid",
	borderColor: "divider",
	//mb: 30
} as const satisfies SxProps<Theme>;

const CONTENT_STACK_SX = {
	maxWidth: 960,
	mx: "auto",
	alignItems: "center",
} as const satisfies SxProps<Theme>;

const HEADLINE_TEXT_SX = {
	fontSize: "0.7rem",
	fontWeight: 700,
	letterSpacing: 1.2,
	textTransform: "uppercase",
	color: "text.secondary",
	textAlign: "center",
} as const satisfies SxProps<Theme>;

const LOGOS_ROW_SX = {
	display: "flex",
	flexDirection: "row",
	flexWrap: "wrap",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
} as const satisfies SxProps<Theme>;

const LOGO_ITEM_SX = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	color: "text.secondary",
	opacity: (theme: Theme) => (theme.palette.mode === "dark" ? 0.85 : 0.7),
	transition: "all 0.25s ease-in-out",
	py: 1,
	px: 2,
	cursor: "pointer",
	"&:hover": {
		opacity: 1,
		transform: "scale(1.05)",
	},
} as const satisfies SxProps<Theme>;

const LOGO_IMG_SX = {
	height: { xs: 26, sm: 30, md: 34 },
	maxWidth: { xs: 150, sm: 180, md: 220 },
	width: "auto",
	objectFit: "contain",
	display: "block",
} as const satisfies SxProps<Theme>;

const LOGO_TEXT_SX = {
	fontWeight: 800,
	letterSpacing: 1,
	fontSize: "0.8rem",
	whiteSpace: "nowrap",
} as const satisfies SxProps<Theme>;

const DIVIDER_SX = {
	width: 60,
} as const satisfies SxProps<Theme>;

const TESTIMONIAL_PAPER_SX = {
	p: { xs: 2.5, md: 3 },
	maxWidth: 720,
	width: "100%",
	borderRadius: 3,
	bgcolor: "background.paper",
	boxShadow: (theme: Theme) =>
		theme.palette.mode === "dark"
			? "0 4px 20px rgba(0,0,0,0.2)"
			: "0 4px 20px rgba(0,0,0,0.03)",
	transition: "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
} as const satisfies SxProps<Theme>;

const QUOTE_ICON_SX = {
	fontSize: 32,
	opacity: 0.7,
	mt: -0.5,
	display: { xs: "none", sm: "block" },
	color: "primary.main",
} as const satisfies SxProps<Theme>;

const QUOTE_TEXT_SX = {
	fontSize: { xs: "0.875rem", sm: "0.95rem" },
	lineHeight: 1.65,
	fontWeight: 500,
	fontStyle: "italic",
} as const satisfies SxProps<Theme>;

const AVATAR_SX = {
	width: 36,
	height: 36,
	bgcolor: "primary.main",
	color: "primary.contrastText",
	fontSize: "0.85rem",
	fontWeight: 700,
} as const satisfies SxProps<Theme>;

const AUTHOR_NAME_SX = {
	fontSize: "0.85rem",
	fontWeight: 700,
	lineHeight: 1.2,
} as const satisfies SxProps<Theme>;

const ROLE_TEXT_SX = {
	display: "block",
	color: "text.secondary",
} as const satisfies SxProps<Theme>;

const ALIGN_START_SX = {
	alignItems: "flex-start",
} as const satisfies SxProps<Theme>;

const VERIFIED_ICON_SX = {
	fontSize: 15,
	color: "primary.main",
} as const satisfies SxProps<Theme>;

function SocialLogosList({
	logos,
	isDark,
}: {
	logos: SocialLogoItem[] | unknown[];
	isDark: boolean;
}) {
	if (!isArray(logos)) return null;

	return (
		<Box sx={sx.compose(sx.flexRow, sx.gapMd, LOGOS_ROW_SX)}>
			{logos.map((logo, idx) => {
				const isSvg = logo.logoUrl?.endsWith(".svg") || logo.logoUrl?.includes("svg");
				const logoContent = logo.logoUrl ? (
					<Image
						src={logo.logoUrl}
						alt={logo.name}
						width={128}
						height={28}
						unoptimized={isSvg}
						style={{
							height: "28px",
							width: "auto",
							objectFit: "contain",
							filter: isDark ? "brightness(0) invert(1)" : "brightness(0)",
						}}
					/>
				) : (
					<Typography variant="subtitle2" sx={LOGO_TEXT_SX}>
						{logo.name}
					</Typography>
				);

				const itemKey = logo.id ?? `${logo.name}-${idx}`;

				if (logo.href) {
					return (
						<Box
							key={itemKey}
							component="a"
							href={logo.href}
							target={logo.target}
							rel={logo.target === "_blank" ? "noopener noreferrer" : undefined}
							sx={sx.compose(sx.flexRow, sx.gapXs, LOGO_ITEM_SX)}
						>
							{logoContent}
						</Box>
					);
				}

				return (
					<Box key={itemKey} sx={sx.compose(sx.flexRow, sx.gapXs, LOGO_ITEM_SX)}>
						{logoContent}
					</Box>
				);
			})}
		</Box>
	);
}

export default function SocialProofBar({ data, mode }: KetrikSocialBarProps) {

	const headline = data?.headline;
	const logos = data?.logos;
	const testimonial = data?.testimonial;

	const isDark = mode === "dark";

	return (
		isArray(logos) && (
			<Box component="section" sx={CONTAINER_BOX_SX}>
				<Box sx={sx.compose(sx.flexCol, sx.gapMd, CONTENT_STACK_SX)}>
					{/* 1. LOGO / INDUSTRY STRIP */}
					<Box sx={sx.compose(sx.flexCol, sx.gapSm, { width: "100%" })}>
						{headline && (
							<Typography variant="caption" sx={HEADLINE_TEXT_SX}>
								{headline}
							</Typography>
						)}

						<SocialLogosList logos={logos} isDark={isDark} />
					</Box>

					{testimonial && <Divider sx={DIVIDER_SX} />}

					{/* 2. CORE TESTIMONIAL */}
					{testimonial && (
						<Paper elevation={0} variant="outlined" sx={TESTIMONIAL_PAPER_SX}>
							<Box
								sx={sx.compose(sx.flexRow, sx.gapSm, ALIGN_START_SX)}
							>
								<FormatQuoteOutlined sx={QUOTE_ICON_SX} />

								<Box sx={sx.compose(sx.flexCol, sx.gapSm, sx.flex1)}>
									{testimonial.quote && (
										<Typography
											variant="body2"
											sx={QUOTE_TEXT_SX}
										>
											{testimonial.quote}
										</Typography>
									)}

									<Box sx={sx.compose(sx.flexRow, sx.gapSm)}>
										<Avatar src={testimonial.avatarUrl} sx={AVATAR_SX}>
											{testimonial.avatarInitials ||
												(testimonial.authorName
													? testimonial.authorName.charAt(0)
													: "D")}
										</Avatar>
										<Box>
											<Box sx={sx.compose(sx.flexRow, sx.gapXs)}>
												{testimonial.authorName && (
													<Typography
														variant="subtitle2"
														sx={AUTHOR_NAME_SX}
													>
														{testimonial.authorName}
													</Typography>
												)}
												<VerifiedOutlined sx={VERIFIED_ICON_SX} />
											</Box>
											{(testimonial.authorRole ||
												testimonial.authorCompany) && (
												<Typography
													variant="caption"
													sx={ROLE_TEXT_SX}
												>
													{[
														testimonial.authorRole,
														testimonial.authorCompany,
													]
														.filter(Boolean)
														.join(" • ")}
												</Typography>
											)}
										</Box>
									</Box>
								</Box>
							</Box>
						</Paper>
					)}
				</Box>
			</Box>
		)
	);
}
