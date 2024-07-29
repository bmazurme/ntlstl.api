import { IsOptional, IsString, Length, ValidateIf } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsOptional()
  @ValidateIf((dto) => dto.name !== '')
  @Length(2, 200)
  name: string;

  @IsString()
  @IsOptional()
  @ValidateIf((dto) => dto.name !== '')
  body: string;
}
