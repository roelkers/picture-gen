import { Connection } from 'mongoose';
import { PictureSchema } from './picture.schema';

export const PictureModel = 
  {
    provide: 'PICTURE_MODEL',
    useFactory: (connection: Connection) => connection.model('Picture', PictureSchema),
    inject: ['DATABASE_CONNECTION'],
  }
