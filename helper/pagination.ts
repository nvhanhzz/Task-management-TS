interface PaginationQuery {
    page?: string;
    [key: string]: any;
}

interface PaginationResult {
    page: number;
    skip: number;
    limit: number;
    total: number;
    final: number;
}

const pagination = (query: PaginationQuery, limit: number, total: number): PaginationResult => {
    const page = parseInt(query.page || "1", 10);
    const skip = (page - 1) * limit;
    const final = Math.ceil(total / limit);

    const result: PaginationResult = {
        page: page,
        skip: skip,
        limit: limit,
        total: total,
        final: final
    };

    return result;
}

export default pagination;
