import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollegesModule } from './colleges/colleges.module';

@Module({
  imports: [CollegesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
