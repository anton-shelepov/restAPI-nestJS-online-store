import { Document } from 'mongoose';
export declare type CatalogDocument = Catalog & Document;
export declare class Catalog {
    name: string;
}
export declare const CatalogSchema: import("mongoose").Schema<Document<Catalog, any, any>, import("mongoose").Model<Document<Catalog, any, any>, any, any, any>, any, any>;
