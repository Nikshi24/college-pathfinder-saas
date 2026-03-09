import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollegesModule } from './colleges/colleges.module';
import { AuthModule } from './auth/auth.module';
import { SavedCollegesModule } from './saved-colleges/saved-colleges.module';
import { UsersModule } from './users/users.module';
import { RecommendationsModule } from './recommendations/recommendations.module';

@Module({
  imports: [CollegesModule, AuthModule, SavedCollegesModule, UsersModule, RecommendationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
