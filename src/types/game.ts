import { UserAttributes } from "./user";

export interface GameState {
	id: string;
	players: Player[];
	goals: Goal[];
	status: GameStatus;
	startGame: Date;
}

export enum GameStatus {
	READY = "ready",
	INPROCESS = "inprocess",
	PAUSED = "paused",
	FINISHED = "finished"
}

export enum Role {
	Defense = "defense",
	Attack = "attack"
}

export enum Team {
	RED = "RED",
	BLACK = "BLACK"
}

export interface Player {
    role: Role,
    team: Team,
    user: UserAttributes
}

export interface Goal {
	team: Team,
	time: Date
}