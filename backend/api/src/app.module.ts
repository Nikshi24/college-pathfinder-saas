import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollegesModule } from './colleges/colleges.module';
import { AuthModule } from './auth/auth.module';
import { SavedCollegesModule } from './saved-colleges/saved-colleges.module';

@Module({
  imports: [CollegesModule, AuthModule, SavedCollegesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
