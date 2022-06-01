import { BasketModule } from './basket/basket.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from  '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { ProductsModule } from './product/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ReviewsModule } from './reviews/reviews.module';
import { FavoritesModule } from './favorites/favorites.module';
import { UsersModule } from './users/users.module';


@Module({
    imports: [ 
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule, 
        ProfileModule,
        BasketModule, 
        ProductsModule,
        CategoriesModule,
        ReviewsModule,
        PrismaModule,
        FavoritesModule,
        UsersModule,
    ]
})
export class AppModule { }