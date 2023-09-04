import { Expose } from 'class-transformer';

export class DocDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  like: number;

  @Expose()
  userId: string;
}
