import { Document } from 'mongoose';
export declare type ProductDocument = Product & Document;
export declare class Product {
    name: string;
}
export declare const ProductSchema: import("mongoose").Schema<Document<Product, any, any>, import("mongoose").Model<Document<Product, any, any>, any, any, any>, any, any>;
