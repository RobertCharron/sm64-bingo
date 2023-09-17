import { Injectable } from "@nestjs/common";
import { Level } from '@sm64-bingo/libs/shared/interface';
import { levelsData } from "./levels-data";


@Injectable()
export class LevelService {
    async getLevels(): Promise<Level[]> {
        return levelsData;
    }
}