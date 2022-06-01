import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
export declare class CatalogController {
    private readonly catalogService;
    constructor(catalogService: CatalogService);
    create(createCatalogDto: CreateCatalogDto): Promise<string>;
    findAll(): Promise<string>;
    findOne(id: string): Promise<string>;
    update(id: string, updateCatalogDto: UpdateCatalogDto): Promise<string>;
    remove(id: string): Promise<string>;
}
