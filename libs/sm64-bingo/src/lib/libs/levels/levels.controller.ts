import { Controller, Get } from "@nestjs/common";
import { Level } from "@sm64-bingo/libs/shared/interface";
import { LevelService } from "./levels.service";

@Controller('levels')
export class LevelsController {
    constructor(private readonly levelService: LevelService) {}
    @Get()
    async getLevels(): Promise<Level[]> {
        return this.levelService.getLevels();
    }
}