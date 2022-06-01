import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
export declare class CatalogService {
    create(createCatalogDto: CreateCatalogDto): Promise<string>;
    getAll(): Promise<string>;
    getOne(id: number): Promise<string>;
    update(id: number, updateCatalogDto: UpdateCatalogDto): Promise<string>;
    delete(id: number): Promise<string>;
}
