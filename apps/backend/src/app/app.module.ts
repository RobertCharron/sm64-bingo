import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Sm64BingoModule } from '@sm64-bingo/libs/sm64-bingo';

@Module({
  imports: [Sm64BingoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
