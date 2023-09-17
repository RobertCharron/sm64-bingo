import { Module } from '@nestjs/common';
import { LevelsController } from './levels/levels.controller';
import { LevelService } from './levels/levels.service';

@Module({
  controllers: [LevelsController],
  providers: [LevelService],
  exports: [],
})
export class Sm64BingoModule {}
