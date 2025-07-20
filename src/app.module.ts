import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb+srv://koyeb:bTrn3aDteNEGTK5T@nest.dwygdyt.mongodb.net/?retryWrites=true&w=majority&appName=Nest';

// const mongoOptions = {
//   tlsCertificateKeyFile: './certs/X509-cert-7432028479507048774.pem',
//   serverApi: "1" as const,
//   dbName: 'pokemon',
// };

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    // MongooseModule.forRoot(DATABASE_URL, mongoOptions),
    MongooseModule.forRoot(DATABASE_URL),
    PokemonModule,
    CommonModule,
    SeedModule
  ]
})
export class AppModule { 
  constructor() {}
}
