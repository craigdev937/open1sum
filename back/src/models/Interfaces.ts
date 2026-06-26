export interface IRev {
    id: number,
    author: string,
    rating: number,
    content: string,
    created_at: string,
    updated_at: string,
    product_id: number
};

export interface ISum {
    id: number,
    product_id: number,
    content: string,
    generated_at: string,
    expires_at: string
};

export interface IProd {
    id: number,
    description: string,
    price: number,
    created_at: string,
    updated_at: string,
};


