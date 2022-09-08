import * as mongoose from 'mongoose';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    const providers = [
      {
        inject: [ConfigService],
        provide: 'DATABASE_CONNECTION',
        useFactory: (configService: ConfigService): Promise<typeof mongoose> => {
          const url = configService.get('DB_URL')
          return mongoose.connect(url)
        }
      }
    ]
    return {
      providers: [...providers],
      exports: [...providers],
      module: DatabaseModule,
    };
  }
}
