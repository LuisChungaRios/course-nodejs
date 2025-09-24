import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { UploadModule } from './upload/upload.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', process.env.UPLOAD_PATH || 'uploads'),
      serveRoot: `/${process.env.UPLOAD_PATH || 'uploads'}`,
    }),
    DatabaseModule,
    UploadModule,
    UsersModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
