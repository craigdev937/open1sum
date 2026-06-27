export interface IRev {
    id: number,
    author: string,
    content: string,
    rating: number,
    created_at: string,
    updated_at: string,
    product_id: number
};

export interface IAll {
    summary: string,
    reviews: IRev[]
};

export interface ISum {
    summary: string
};



