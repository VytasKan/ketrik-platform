"use client";
import React, { useState, useEffect, useRef } from "react";
import type { SxProps, Theme } from "@repo/ui/mui";
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Typography,
	Slider,
	Switch,
	FormControlLabel,
	Button,
	Chip,
	LinearProgress,
	Divider,
	Paper,
	Tooltip,
	Grid,
} from "@repo/ui/mui";
import { ActionButton, IconButton } from "@repo/ui/mui/@extended";
import { DynamicIcon } from "@repo/ui/elements/dynamic-icon";
import { sx } from "@repo/ui/helpers/sx";


const MB_3_SX = { mb: 3 } as const satisfies SxProps<Theme>;

const MB_2_SX = { mb: 2 } as const satisfies SxProps<Theme>;

const MY_1_5_SX = { my: 1.5 } as const satisfies SxProps<Theme>;

const TEXT_ALIGN_CENTER_SX = { textAlign: "center" } as const satisfies SxProps<Theme>;
// --- Types ---
export interface SyntheticEvent {
	id: string;
	timestamp: number;
	type: "telemetry" | "order" | "auth" | "heartbeat";
	status: "delivered" | "dropped" | "corrupted";
	latencyMs: number;
	payload: Record<string, unknown> | string;
}

export interface ChaosConfig {
	errorRate: number; // 0 - 100%
	corruptionRate: number; // 0 - 100%
	baseLatencyMs: number; // 0 - 2000ms
	jitterMs: number; // 0 - 500ms
	networkBlackhole: boolean; // 100% packet loss
}

export interface StreamStats {
	totalGenerated: number;
	delivered: number;
	dropped: number;
	corrupted: number;
	currentEps: number;
}

export interface StreamChaosSimulatorProps {
	onEmit?: (event: SyntheticEvent) => void;
	maxBufferDisplay?: number;
}

// --- Static Sx Constants ---
const CARD_CONTAINER_SX = {
	maxWidth: 900,
	mx: "auto",
	p: 1,
} as const satisfies SxProps<Theme>;

const PROGRESS_BAR_SX = {
	mb: 3,
	borderRadius: 1,
} as const satisfies SxProps<Theme>;

const CONTROL_PAPER_SX = {
	p: 2,
	height: "100%",
} as const satisfies SxProps<Theme>;

const ROW_SPACE_BETWEEN_SX = {
	justifyContent: "space-between",
} as const satisfies SxProps<Theme>;

const BOLD_TEXT_SX = {
	fontWeight: 700,
} as const satisfies SxProps<Theme>;

const SEMIBOLD_TEXT_SX = {
	fontWeight: 600,
} as const satisfies SxProps<Theme>;

const ERROR_BOLD_TEXT_SX = {
	fontWeight: 700,
	color: "error.main",
} as const satisfies SxProps<Theme>;

const ERROR_SEMIBOLD_TEXT_SX = {
	fontWeight: 600,
	color: "error.main",
} as const satisfies SxProps<Theme>;

const WARNING_BOLD_TEXT_SX = {
	fontWeight: 700,
	color: "warning.main",
} as const satisfies SxProps<Theme>;

const SUCCESS_BOLD_TEXT_SX = {
	fontWeight: 700,
	color: "success.main",
} as const satisfies SxProps<Theme>;

const TEXT_SECONDARY_SX = {
	color: "text.secondary",
} as const satisfies SxProps<Theme>;

const SUCCESS_TEXT_SX = {
	color: "success.main",
} as const satisfies SxProps<Theme>;

const ERROR_TEXT_SX = {
	color: "error.main",
} as const satisfies SxProps<Theme>;

const WARNING_TEXT_SX = {
	color: "warning.main",
} as const satisfies SxProps<Theme>;

const SUMMARY_PAPER_SX = {
	p: 2,
	bgcolor: "action.hover",
} as const satisfies SxProps<Theme>;

const BUFFER_CONTAINER_SX = {
	p: 1,
	maxHeight: 220,
	overflowY: "auto",
	bgcolor: "background.default",
} as const satisfies SxProps<Theme>;

const EMPTY_BUFFER_TEXT_SX = {
	p: 1,
	display: "block",
	color: "text.secondary",
} as const satisfies SxProps<Theme>;

const BUFFER_PAYLOAD_TEXT_SX = {
	maxWidth: 300,
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	color: "text.secondary",
} as const satisfies SxProps<Theme>;

const EVENT_ROW_BASE_SX = {
	p: 0.75,
	px: 1.5,
	borderRadius: 1,
	bgcolor: "background.paper",
	justifyContent: "space-between",
	borderLeft: 4,
} as const satisfies SxProps<Theme>;

const PRESET_EPS_VALUES = [10, 50, 100, 250, 500] as const;
const EVENT_TYPES: readonly SyntheticEvent["type"][] = [
	"telemetry",
	"order",
	"auth",
	"heartbeat",
] as const;

export const StreamChaosSimulator: React.FC<StreamChaosSimulatorProps> = ({
	onEmit,
	maxBufferDisplay = 10,
}) => {
	// --- Stream Controls ---
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [targetEps, setTargetEps] = useState<number>(50); // Events per second

	// --- Chaos Controls ---
	const [chaos, setChaos] = useState<ChaosConfig>({
		errorRate: 5,
		corruptionRate: 2,
		baseLatencyMs: 40,
		jitterMs: 15,
		networkBlackhole: false,
	});

	// --- Real-time Stats & Feed ---
	const [stats, setStats] = useState<StreamStats>({
		totalGenerated: 0,
		delivered: 0,
		dropped: 0,
		corrupted: 0,
		currentEps: 0,
	});
	const [recentEvents, setRecentEvents] = useState<SyntheticEvent[]>([]);

	// --- High-Performance Refs ---
	const statsRef = useRef<StreamStats>({
		totalGenerated: 0,
		delivered: 0,
		dropped: 0,
		corrupted: 0,
		currentEps: 0,
	});
	const configRef = useRef({ targetEps, chaos, isRunning, onEmit });
	configRef.current = { targetEps, chaos, isRunning, onEmit };

	// --- Event Generator Logic ---
	const produceEvent = (): SyntheticEvent => {
		const { chaos: currentChaos } = configRef.current;
		const id = `evt_${Math.random().toString(36).substring(2, 9)}`;
		const type = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];

		// Calculate Latency Jitter
		const jitter = (Math.random() * 2 - 1) * currentChaos.jitterMs;
		const latency = Math.max(1, Math.round(currentChaos.baseLatencyMs + jitter));

		// Evaluate Chaos Injections
		const isDropped =
			currentChaos.networkBlackhole || Math.random() * 100 < currentChaos.errorRate;
		const isCorrupted = !isDropped && Math.random() * 100 < currentChaos.corruptionRate;

		let status: SyntheticEvent["status"] = "delivered";
		let payload: Record<string, unknown> | string = {
			sensorId: `node-${Math.floor(Math.random() * 16)}`,
			metricValue: +(Math.random() * 100).toFixed(2),
			ackRequired: true,
		};

		if (isDropped) {
			status = "dropped";
			payload = "[STREAM_DROP: 504 Gateway Timeout]";
			statsRef.current.dropped += 1;
		} else if (isCorrupted) {
			status = "corrupted";
			payload = "<<0xDEADBEEF:MALFORMED_BINARY_PAYLOAD>>";
			statsRef.current.corrupted += 1;
		} else {
			statsRef.current.delivered += 1;
		}

		statsRef.current.totalGenerated += 1;

		return {
			id,
			timestamp: Date.now(),
			type,
			status,
			latencyMs: latency,
			payload,
		};
	};

	// --- Engine Loop ---
	useEffect(() => {
		if (!isRunning) return;

		let lastTime = performance.now();
		let accumulatedTime = 0;
		let epsSampleCounter = 0;
		let lastEpsReset = performance.now();

		const intervalId = setInterval(() => {
			const now = performance.now();
			const delta = now - lastTime;
			lastTime = now;
			accumulatedTime += delta;

			const { targetEps: currentTargetEps, onEmit: emitCallback } = configRef.current;
			const intervalBetweenEvents = 1000 / Math.max(1, currentTargetEps);

			const newBatch: SyntheticEvent[] = [];

			while (accumulatedTime >= intervalBetweenEvents) {
				accumulatedTime -= intervalBetweenEvents;
				const event = produceEvent();
				newBatch.push(event);
				epsSampleCounter += 1;
				emitCallback?.(event);
			}

			// Update recent display buffer
			if (newBatch.length > 0) {
				setRecentEvents((prev) =>
					[...newBatch.slice(-maxBufferDisplay), ...prev].slice(0, maxBufferDisplay),
				);
			}

			// Sample EPS every 500ms
			if (now - lastEpsReset >= 500) {
				const actualEps = Math.round((epsSampleCounter / (now - lastEpsReset)) * 1000);
				statsRef.current.currentEps = actualEps;
				epsSampleCounter = 0;
				lastEpsReset = now;
				setStats({ ...statsRef.current });
			}
		}, 20); // 50 Hz tick frequency

		return () => clearInterval(intervalId);
	}, [isRunning, maxBufferDisplay]);

	const handleReset = () => {
		statsRef.current = {
			totalGenerated: 0,
			delivered: 0,
			dropped: 0,
			corrupted: 0,
			currentEps: 0,
		};
		setStats({ ...statsRef.current });
		setRecentEvents([]);
	};

	const getStatusColor = (status: SyntheticEvent["status"]) => {
		switch (status) {
			case "delivered":
				return "success";
			case "dropped":
				return "error";
			case "corrupted":
				return "warning";
		}
	};

	return (
		<Card sx={CARD_CONTAINER_SX}>
			<CardHeader
				title={
					<Box sx={sx.compose(sx.flexRow, sx.gapXs)}>
						<DynamicIcon name="Speed" color="primary" />
						<Typography variant="h6" sx={BOLD_TEXT_SX}>
							Stream Throughput & Chaos Injector
						</Typography>
					</Box>
				}
				subheader="Synthetic operational load workbench and stream fault injector"
				action={
					<Box sx={sx.compose(sx.flexRow, sx.gapXs)}>
						<Tooltip title={isRunning ? "Pause Stream" : "Start Stream"}>
							<ActionButton
								variant="contained"
								color={isRunning ? "warning" : "primary"}
								startIcon={isRunning ? "Pause" : "PlayArrow"}
								onClick={() => setIsRunning((prev) => !prev)}
							>
								{isRunning ? "Pause" : "Start"}
							</ActionButton>
						</Tooltip>
						<IconButton icon="RestartAlt" onClick={handleReset} size="small" />
					</Box>
				}
			/>

			<CardContent>
				{isRunning && <LinearProgress color="primary" sx={PROGRESS_BAR_SX} />}

				<Grid container spacing={3}>
					{/* Dial Throughput Controls */}
					<Grid size={{ xs: 12, md: 6 }}>
						<Paper variant="outlined" sx={CONTROL_PAPER_SX}>
							<Box sx={sx.compose(sx.flexRow, sx.gapXs, { mb: 2 })}>
								<DynamicIcon name="Bolt" color="warning" />
								<Typography variant="subtitle1" sx={SEMIBOLD_TEXT_SX}>
									Throughput Dial
								</Typography>
							</Box>

							<Box sx={MB_3_SX}>
								<Box sx={sx.compose(sx.flexRow, ROW_SPACE_BETWEEN_SX, { mb: 1 })}>
									<Typography variant="body2" sx={TEXT_SECONDARY_SX}>
										Target Rate:
									</Typography>
									<Typography variant="body2" sx={BOLD_TEXT_SX}>
										{targetEps} EPS (Events/sec)
									</Typography>
								</Box>
								<Slider
									value={targetEps}
									min={1}
									max={500}
									step={5}
									valueLabelDisplay="auto"
									onChange={(_, val) => setTargetEps(val as number)}
								/>
							</Box>

							<Box sx={sx.compose(sx.flexRow, sx.gapXs)}>
								{PRESET_EPS_VALUES.map((preset) => (
									<Chip
										key={preset}
										label={`${preset} EPS`}
										size="small"
										variant={targetEps === preset ? "filled" : "outlined"}
										color="primary"
										onClick={() => setTargetEps(preset)}
										clickable
									/>
								))}
							</Box>
						</Paper>
					</Grid>

					{/* Chaos Injection Controls */}
					<Grid size={{ xs: 12, md: 6 }}>
						<Paper variant="outlined" sx={CONTROL_PAPER_SX}>
							<Box sx={sx.compose(sx.flexRow, sx.gapXs, { mb: 2 })}>
								<DynamicIcon name="BugReport" color="error" />
								<Typography variant="subtitle1" sx={SEMIBOLD_TEXT_SX}>
									Chaos Parameters
								</Typography>
							</Box>

							<Box sx={MB_2_SX}>
								<Box sx={sx.compose(sx.flexRow, ROW_SPACE_BETWEEN_SX)}>
									<Typography variant="caption" sx={TEXT_SECONDARY_SX}>
										Packet Drop Rate:
									</Typography>
									<Typography variant="caption" sx={ERROR_BOLD_TEXT_SX}>
										{chaos.errorRate}%
									</Typography>
								</Box>
								<Slider
									size="small"
									color="error"
									value={chaos.errorRate}
									min={0}
									max={50}
									onChange={(_, val) =>
										setChaos((c) => ({ ...c, errorRate: val as number }))
									}
								/>
							</Box>

							<Box sx={MB_2_SX}>
								<Box sx={sx.compose(sx.flexRow, ROW_SPACE_BETWEEN_SX)}>
									<Typography variant="caption" sx={TEXT_SECONDARY_SX}>
										Schema Corruption:
									</Typography>
									<Typography variant="caption" sx={WARNING_BOLD_TEXT_SX}>
										{chaos.corruptionRate}%
									</Typography>
								</Box>
								<Slider
									size="small"
									color="warning"
									value={chaos.corruptionRate}
									min={0}
									max={30}
									onChange={(_, val) =>
										setChaos((c) => ({ ...c, corruptionRate: val as number }))
									}
								/>
							</Box>

							<Box sx={MB_2_SX}>
								<Box sx={sx.compose(sx.flexRow, ROW_SPACE_BETWEEN_SX)}>
									<Typography variant="caption" sx={TEXT_SECONDARY_SX}>
										Base Latency & Jitter:
									</Typography>
									<Typography variant="caption" sx={BOLD_TEXT_SX}>
										{chaos.baseLatencyMs}ms (±{chaos.jitterMs}ms)
									</Typography>
								</Box>
								<Slider
									size="small"
									value={chaos.baseLatencyMs}
									min={0}
									max={500}
									step={10}
									onChange={(_, val) =>
										setChaos((c) => ({ ...c, baseLatencyMs: val as number }))
									}
								/>
							</Box>

							<Divider sx={MY_1_5_SX} />

							<FormControlLabel
								control={
									<Switch
										color="error"
										checked={chaos.networkBlackhole}
										onChange={(e) =>
											setChaos((c) => ({
												...c,
												networkBlackhole: e.target.checked,
											}))
										}
									/>
								}
								label={
									<Box sx={sx.compose(sx.flexRow, sx.gapXs)}>
										<DynamicIcon name="WarningAmber" fontSize="small" color="error" />
										<Typography variant="body2" sx={ERROR_SEMIBOLD_TEXT_SX}>
											Blackhole Stream (100% Drop)
										</Typography>
									</Box>
								}
							/>
						</Paper>
					</Grid>

					{/* Telemetry Summary Bar */}
					<Grid size={{ xs: 12 }}>
						<Paper sx={SUMMARY_PAPER_SX}>
							<Grid container spacing={2} sx={TEXT_ALIGN_CENTER_SX}>
								<Grid size={{ xs: 2.4 }}>
									<Typography variant="caption" sx={TEXT_SECONDARY_SX}>
										Live Rate
									</Typography>
									<Typography variant="h6" sx={BOLD_TEXT_SX}>
										{stats.currentEps} EPS
									</Typography>
								</Grid>
								<Grid size={{ xs: 2.4 }}>
									<Typography variant="caption" sx={TEXT_SECONDARY_SX}>
										Generated
									</Typography>
									<Typography variant="h6" sx={BOLD_TEXT_SX}>
										{stats.totalGenerated}
									</Typography>
								</Grid>
								<Grid size={{ xs: 2.4 }}>
									<Typography variant="caption" sx={SUCCESS_TEXT_SX}>
										Delivered
									</Typography>
									<Typography variant="h6" sx={SUCCESS_BOLD_TEXT_SX}>
										{stats.delivered}
									</Typography>
								</Grid>
								<Grid size={{ xs: 2.4 }}>
									<Typography variant="caption" sx={ERROR_TEXT_SX}>
										Dropped
									</Typography>
									<Typography variant="h6" sx={ERROR_BOLD_TEXT_SX}>
										{stats.dropped}
									</Typography>
								</Grid>
								<Grid size={{ xs: 2.4 }}>
									<Typography variant="caption" sx={WARNING_TEXT_SX}>
										Corrupted
									</Typography>
									<Typography variant="h6" sx={WARNING_BOLD_TEXT_SX}>
										{stats.corrupted}
									</Typography>
								</Grid>
							</Grid>
						</Paper>
					</Grid>

					{/* Real-time Stream Inspector */}
					<Grid size={{ xs: 12 }}>
						<Typography
							variant="subtitle2"
							sx={sx.compose(SEMIBOLD_TEXT_SX, { mb: 1 })}
						>
							Live Ingest Buffer (Last {maxBufferDisplay} events)
						</Typography>
						<Paper variant="outlined" sx={BUFFER_CONTAINER_SX}>
							{recentEvents.length === 0 ? (
								<Typography
									variant="caption"
									sx={EMPTY_BUFFER_TEXT_SX}
								>
									No active traffic. Click "Start" to generate events.
								</Typography>
							) : (
								<Box sx={sx.compose(sx.flexCol, sx.gapXs)}>
									{recentEvents.map((evt) => (
										<Box
											key={evt.id}
											sx={sx.compose(sx.flexRow, EVENT_ROW_BASE_SX, {
												borderColor: `${getStatusColor(evt.status)}.main`,
											})}
										>
											<Box sx={sx.compose(sx.flexRow, sx.gapSm)}>
												<Chip
													label={evt.status.toUpperCase()}
													size="small"
													color={getStatusColor(evt.status)}
												/>
												<Typography variant="caption" sx={SEMIBOLD_TEXT_SX}>
													{evt.id}
												</Typography>
												<Chip
													label={evt.type}
													size="small"
													variant="outlined"
												/>
												<Typography
													variant="caption"
													sx={BUFFER_PAYLOAD_TEXT_SX}
												>
													{typeof evt.payload === "string"
														? evt.payload
														: JSON.stringify(evt.payload)}
												</Typography>
											</Box>
											<Typography variant="caption" sx={TEXT_SECONDARY_SX}>
												+{evt.latencyMs}ms
											</Typography>
										</Box>
									))}
								</Box>
							)}
						</Paper>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default StreamChaosSimulator;
