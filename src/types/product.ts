export interface Product {
    id: string;
    name: string;
    category_ids: number[];
    note_product?: string;
    weight: number;
    custom_id?: string;
    is_published: boolean;
    variations: ProductVariation[];
    stock?: number;
    description?: string;
    images?: string[];
    tags?: string[];
    measure_unit?: string;
    wholesale_price?: number;
    retail_price: number;
    warranty_info?: string;
    specifications?: ProductSpecification[];
}

export interface ProductVariation {
    id?: string;
    fields?: ProductField[];
    images?: string[];
    last_imported_price?: number;
    retail_price: number;
    price_at_counter?: number;
    weight: number;
    barcode?: string;
    custom_id?: string;
    is_hidden?: boolean;
    stock?: number;
    sku?: string;
    wholesale_price?: number;
}

export interface ProductField {
    name: string;
    value: string;
}

export interface ProductSpecification {
    name: string;
    value: string;
}

export interface ProductListParams {
    page_size?: number;
    page_number?: number;
    search?: string;
    category_id?: number[];
    is_published?: boolean;
    has_variations?: boolean;
    in_stock?: boolean;
}

export interface CreateProductRequest {
    name: string;
    category_ids?: number[];
    note_product?: string;
    weight: number;
    custom_id?: string;
    is_published?: boolean;
    variations: ProductVariation[];
    description?: string;
    images?: string[];
    tags?: string[];
    measure_unit?: string;
    specifications?: ProductSpecification[];
}

export interface UpdateStockRequest {
    warehouse_id: string;
    stock: number;
    variation_id?: string;
}

export interface ProductCategory {
    id: number;
    name: string;
    parent_id?: number;
    image_url?: string;
    is_visible: boolean;
    children?: ProductCategory[];
}

export interface CreateCategoryRequest {
    name: string;
    parent_id?: number;
    image_url?: string;
    is_visible?: boolean;
}
