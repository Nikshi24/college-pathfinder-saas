import { Module } from '@nestjs/common';
import { SavedCollegesService } from './saved-colleges.service';
import { SavedCollegesController } from './saved-colleges.controller';

@Module({
  providers: [SavedCollegesService],
  controllers: [SavedCollegesController]
})
export class SavedCollegesModule {}
