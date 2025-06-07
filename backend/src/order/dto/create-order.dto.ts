import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({ example: 'John', description: 'Customer first name' })
    @IsString()
    first_name: string;

    @ApiProperty({ example: 'Doe', description: 'Customer last name' })
    @IsString()
    last_name: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'Customer email address' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'photo123', description: 'Photo identifier' })
    @IsString()
    photo_id: string;

    @ApiProperty({ example: '123 Main St, City, Country', description: 'Shipping address' })
    @IsString()
    shipping_address: string;
}
