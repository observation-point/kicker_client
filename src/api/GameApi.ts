import axios from 'axios';
import { GameState } from '../app/game/types';
import config from './config';
import { Role, Team } from '../types/game';

export class GameApi {
    public static async getState(): Promise<GameState> {
        const res = await axios.get(`${config.api_url}/game`);
        return res.data;
    }

    public static async join(data: { role: Role, team: Team }): Promise<GameState> {
        const res = await axios.post(`${config.api_url}/game`, data);

        return res.data;
    }
}
