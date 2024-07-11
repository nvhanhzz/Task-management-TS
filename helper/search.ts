interface SearchQuery {
    keyword?: string;
    [key: string]: any;
}

interface SearchResult {
    regex?: RegExp;
}

const search = (query: SearchQuery): SearchResult => {
    const keyword = query.keyword;
    const regex = keyword ? new RegExp(keyword, "i") : undefined;

    const res: SearchResult = {};
    if (regex) {
        res.regex = regex;
    }

    return res;
}

export default search;