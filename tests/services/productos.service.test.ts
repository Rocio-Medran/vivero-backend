import { ProductoService } from "../../src/domain/services/ProductoService";
import { ProductoRepository } from "../../src/domain/repositories/ProductoRepository";
import { CategoriaRepository } from "../../src/domain/repositories/CategoriaRepository";
import { BaseRepository } from "../../src/domain/repositories/BaseRepository";
import { NotFoundError } from "../../src/app/errors/CustomErrors";


jest.mock("../../src/domain/repositories/ProductoRepository");
jest.mock("../../src/domain/repositories/CategoriaRepository");
jest.mock("../../src/domain/repositories/BaseRepository");

class Temporada { }

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


describe("ProductoService - createProductoAsync", () => {


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


describe("ProductoService - updateProductoCompletoAsync", () => {

    const existing = {
        id: 1,
        nombre: "Planta Original",
        descripcion: "Descripcion original larga",
        informacion_extra: "Info extra original",
        esta_activo: true,
        categoria: { id: 1, nombre: "Cat 1", tipo: "Tipo A" },
        temporada: { id: 1, nombre: "Verano", fecha_desde: 12, fecha_hasta: 2 }
    };

    const dtoUpdate = {
        nombre: "Planta Actualizada",
        descripcion: "Descripcion actualizada larga",
        informacion_extra: "Info extra actualizada",
        esta_activo: true,
        categoria_id: 1,
        temporada_id: 2
    };

    it("Actualiza producto correctamente", async () => {
        productoRepo.getById.mockResolvedValue({ id: 1, nombre: "Viejo", descripcion: "Descripcion de 10 caracteres", informacion_extra: "Info", esta_activo: true, categoria: { id: 1, nombre: "Categoria 1", tipo: "Tipo A" }, temporada: { id: 2, nombre: "Temporada 2", fecha_desde: 5, fecha_hasta: 10 } });
        categoriaRepo.findOneBy.mockResolvedValue({ id: 1, nombre: "Categoria 1", tipo: "Tipo A" });
        temporadaRepo.findOneBy.mockResolvedValue({ id: 2, nombre: "Temporada 2", fecha_desde: 5, fecha_hasta: 10 });

        productoRepo.update.mockResolvedValue({} as any);

        const result = await service.updateProductoCompletoAsync(1, {
            nombre: "Nuevo nombre",
            descripcion: "Descripción válida",
            informacion_extra: "info",
            categoria_id: 1,
            temporada_id: 2
        });

        expect(result).toBe(true);
    });

    test("Error si el nombre está duplicado", async () => {
        productoRepo.getById.mockResolvedValue(existing);
        productoRepo.findByNombre.mockResolvedValue({ id: 99, nombre: "Planta Actualizada", descripcion: "Otra descripción", informacion_extra: "Otra info", esta_activo: true, categoria: { id: 2, nombre: "Categoria 2", tipo: "Tipo B" }, temporada: { id: 3, nombre: "Temporada 3", fecha_desde: 1, fecha_hasta: 5 } });

        await expect(service.updateProductoCompletoAsync(1, dtoUpdate))
            .rejects
            .toThrow("Ya existe un producto con ese nombre");
    });

    test("Error si la categoría no existe", async () => {
        productoRepo.getById.mockResolvedValue(existing);
        productoRepo.findByNombre.mockResolvedValue(null);
        categoriaRepo.findOneBy.mockResolvedValue(null);

        await expect(service.updateProductoCompletoAsync(1, dtoUpdate))
            .rejects
            .toThrow("La categoría especificada no existe");
    });

    test("Error si la temporada no existe", async () => {
        productoRepo.getById.mockResolvedValue(existing);
        productoRepo.findByNombre.mockResolvedValue(null);
        categoriaRepo.findOneBy.mockResolvedValue({ id: 1, nombre: "Categoria 1", tipo: "Tipo A" });
        temporadaRepo.findOneBy.mockResolvedValue(null);

        await expect(service.updateProductoCompletoAsync(1, dtoUpdate))
            .rejects
            .toThrow("La temporada especificada no existe");
    });

    test("Error si el producto no existe", async () => {
        productoRepo.getById.mockResolvedValue(null);

        await expect(service.updateProductoCompletoAsync(1, dtoUpdate))
            .rejects
            .toThrow("Producto no existente");
    });

});

describe("ProductoService - deleteProductoAsync", () => {

    it("debería eliminar un producto y devolver true", async () => {
        jest.spyOn(productoRepo, "getById")
            .mockResolvedValue({ id: 1, imagenes: [], nombre: "Producto 1", descripcion: "Descripcion", informacion_extra: "Info extra", esta_activo: true, categoria: { id: 1, nombre: "Cat 1", tipo: "Tipo A" }, temporada: { id: 1, nombre: "Temporada 1", fecha_desde: 1, fecha_hasta: 5 } });

        const result = await service.removeProductoAsync(1);

        expect(result).toBe(true);
    });

    it("debería lanzar NotFoundError si el producto no existe", async () => {
        jest.spyOn(productoRepo, "getById")
            .mockResolvedValue(null);

        await expect(service.removeProductoAsync(999))
            .rejects
            .toThrow("Producto no existente");
    });

    it("debería lanzar un error si ocurre un problema en el repositorio", async () => {
        jest
            .spyOn(productoRepo, "delete")
            .mockRejectedValue(new NotFoundError("Producto no existente"));

        await expect(service.removeProductoAsync(1))
            .rejects
            .toThrow("Producto no existente");
    });

});