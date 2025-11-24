import { ProductoService } from "../../src/domain/services/ProductoService";
import { ProductoRepository } from "../../src/domain/repositories/ProductoRepository";
import { CategoriaRepository } from "../../src/domain/repositories/CategoriaRepository";
import { BaseRepository } from "../../src/domain/repositories/BaseRepository";


jest.mock("../../src/domain/repositories/ProductoRepository");
jest.mock("../../src/domain/repositories/CategoriaRepository");
jest.mock("../../src/domain/repositories/BaseRepository");

class Temporada {}

describe("ProductoService - createProductoAsync", () => {

    let productoRepo: jest.Mocked<ProductoRepository>;
    let categoriaRepo: jest.Mocked<CategoriaRepository>;
    let temporadaRepo: jest.Mocked<BaseRepository<any>>;
    let imagenProductoService: any;
    let service: ProductoService;

    beforeEach(() => {
        productoRepo = new ProductoRepository() as jest.Mocked<ProductoRepository>;
        categoriaRepo = new CategoriaRepository() as jest.Mocked<CategoriaRepository>;
        temporadaRepo = new BaseRepository(Temporada) as jest.Mocked<BaseRepository<any>>;

        imagenProductoService = {
            removeImagenProducto: jest.fn()
        };

        service = new ProductoService(productoRepo, imagenProductoService);
        service.categoriaRepo = categoriaRepo;
        service.temporadaRepo = temporadaRepo;
        
        jest.clearAllMocks();
    });

    // ---------------------------------------------------------
    // CASO FELIZ
    // ---------------------------------------------------------
    test("Crea producto correctamente (caso feliz)", async () => {

        const dto = {
            nombre: "Rosa",
            descripcion: "undefined 10",
            informacion_extra: "Flor ornamental",
            categoria_id: 10,
            temporada_id: 20
        };

        // Simula que la categoría existe
        categoriaRepo.findOneBy.mockResolvedValue({ id: 10, nombre: "Flores", tipo: "Plantas" });

        // Simula que la temporada existe
        temporadaRepo.findOneBy.mockResolvedValue({ id: 20, nombre: "Verano", fecha_desde: 10, fecha_hasta: 12 });

        // Simula que no existe producto con ese nombre
        productoRepo.findByNombre.mockResolvedValue(null);

        // Simula guardado con categoría y temporada cargadas
        productoRepo.add.mockResolvedValue({
            id: 1,
            nombre: "Rosa",
            descripcion: "undefined 10",
            informacion_extra: "Flor ornamental",
            esta_activo: true,
            categoria: { id: 10, nombre: "Flores", tipo: "Plantas" },
            temporada: { id: 20, nombre: "Verano", fecha_desde: 10, fecha_hasta: 12 }
        });

        // Simula que luego de guardar lo obtiene correctamente
        productoRepo.getById.mockResolvedValue({
            id: 1,
            nombre: "Rosa",
            descripcion: "undefined 10",
            informacion_extra: "Flor ornamental",
            esta_activo: true,
            categoria: { id: 10, nombre: "Flores", tipo: "Plantas" },
            temporada: { id: 20, nombre: "Verano", fecha_desde: 10, fecha_hasta: 12 }
        });

        const result = await service.createProductoAsync(dto);

        expect(result).toEqual({
            id: 1,
            nombre: "Rosa",
            descripcion: "undefined 10",
            informacion_extra: "Flor ornamental",
            esta_activo: true,
            categoria_id: 10,
            temporada_id: 20
        });
    });

    // ---------------------------------------------------------
    // ERROR: YA EXISTE
    // ---------------------------------------------------------
    test("Error si ya existe producto con ese nombre", async () => {

        const dto = {
            nombre: "Rosa",
            descripcion: "undefined 10",
            informacion_extra: "Flor ornamental",
            categoria_id: 10,
            temporada_id: 20
        };

        productoRepo.findByNombre.mockResolvedValue({ id: 99, nombre: "Rosa", descripcion: "Otra rosa 10", informacion_extra: "Otra rosa", esta_activo: true, categoria: { id: 1, nombre: "Flores", tipo: "Plantas" }, temporada: { id: 1, nombre: "Verano", fecha_desde: 10, fecha_hasta: 12 } });

        await expect(service.createProductoAsync(dto))
            .rejects
            .toThrow("Ya existe un producto con ese nombre");
    });

    // ---------------------------------------------------------
    // ERROR: CATEGORÍA NO EXISTE
    // ---------------------------------------------------------
    test("Error si la categoría no existe", async () => {

        const dto = {
            nombre: "Rosa",
            descripcion: "undefined 10",
            informacion_extra: "Flor ornamental",
            categoria_id: 10,
            temporada_id: 20
        };

        categoriaRepo.findOneBy.mockResolvedValue(null);

        await expect(service.createProductoAsync(dto))
            .rejects
            .toThrow("La categoría especificada no existe");
    });

    // ---------------------------------------------------------
    // ERROR: TEMPORADA NO EXISTE
    // ---------------------------------------------------------
    test("Error si la temporada no existe", async () => {

        const dto = {
            nombre: "Rosa",
            descripcion: "undefined 10",
            informacion_extra: "Flor ornamental",
            categoria_id: 10,
            temporada_id: 20
        };

        categoriaRepo.findOneBy.mockResolvedValue({ id: 10, nombre: "Flores", tipo: "Plantas" });
        temporadaRepo.findOneBy.mockResolvedValue(null);

        await expect(service.createProductoAsync(dto))
            .rejects
            .toThrow("La temporada especificada no existe");
    });

    // ---------------------------------------------------------
    // ERROR: NO SE PUEDE OBTENER LUEGO DE GUARDAR
    // ---------------------------------------------------------
    test("Error si después de guardar no se puede obtener el producto", async () => {

        const dto = {
            nombre: "Rosa",
            descripcion: "undefined 10",
            informacion_extra: "Flor ornamental",
            categoria_id: 10,
            temporada_id: 20
        };

        categoriaRepo.findOneBy.mockResolvedValue({ id: 10, nombre: "Flores", tipo: "Plantas" });
        temporadaRepo.findOneBy.mockResolvedValue({ id: 20, nombre: "Verano", fecha_desde: 10, fecha_hasta: 12 });
        productoRepo.findByNombre.mockResolvedValue(null);

        productoRepo.add.mockResolvedValue({
            id: 1,
            nombre: "Rosa",
            descripcion: "undefined 10",
            informacion_extra: "Flor ornamental",
            esta_activo: true,
            categoria: { id: 10, nombre: "Flores", tipo: "Plantas" },
            temporada: { id: 20, nombre: "Verano", fecha_desde: 10, fecha_hasta: 12 }
        });

        productoRepo.findOneBy.mockResolvedValue(null);

        await expect(service.createProductoAsync(dto))
            .rejects
            .toThrow("No se pudo obtener el producto luego de crearlo");
    });
});
