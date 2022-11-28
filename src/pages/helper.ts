import { DataType } from "./Show";

export interface SearchOption {
    keyword: string;
    target: string;
    limit: number;
    show: string;
    tags: string[];
    grades: string[];
    genres: string[];

    [key: string]: string | number | string[];
}

// stringifySearchOption will change SearchOption to the query string.
// The string type and number type is normal and plus will be added between
// the array element.
//
// For example, symbol: ["A", "B", "C"] will be changed to "?symbol=A+B+C".
export const stringifySearchOption = (option: SearchOption): string => {
    const queryPairs: string[] = [];

    Object.keys(option).forEach(key => {
        switch (key) {
            case "keyword":
            case "target":
            case "limit":
            case "show":
                queryPairs.push(`${key}=${option[key]}`);
                break;
            case "tags":
            case "grades":
            case "genres":
                // array type
                let values: any[] = [];
                const array = option[key] as string[];
                array.forEach((value: any) => {
                    values.push(value);
                });
                if (values.length > 0) {
                    queryPairs.push(`${key}=${values.join("+")}`);
                }
                break;
            default:
                console.error(`unknown field ${key}`);
        }
    });
    return queryPairs.join("&");
};

// parseSearchOption will parse url query string to SearchOption.
export const parseSearchOption = (queryString: string): SearchOption => {
    const option: SearchOption = {
        keyword: "", target: "", limit: 0, show: "",
        tags: [], grades: [], genres: []
    };

    const splits = decodeURI(queryString).split("&");
    splits.forEach(split => {
        const [key, value] = split.split("=");
        // Using option[key] can more simplify the code.
        // But there are problems in it. Try when spare.
        switch (key) {
            case "keyword":
                option.keyword = value;
                break;
            case "target":
                option.target = value;
                break;
            case "limit":
                option.limit = parseInt(value);
                break;
            case "show":
                option.show = value;
                break;
            case "tags":
                option.tags.push(...value.split("+"));
                break;
            case "grades":
                option.grades.push(...value.split("+"));
                break;
            case "genres":
                option.genres.push(...value.split("+"));
                break;
            default:
                console.warn(`unknown field ${key}`);
        }
    });
    return option;
};

export const highlightKeyword = (
    data: DataType[],
    keyword: string
) => data.map(datum => {
    datum.document = datum.document.replaceAll(keyword, `<span class="highlight">${keyword}</span>`);
    return datum;
});

export const highlightString = (
    str: string,
    keyword: string
) => str.replaceAll(keyword, `<span class="highlight">${keyword}</span>`);

// TODO: https://stackoverflow.com/questions/38663751/how-to-safely-render-html-in-react

// randomColor returns the color displayed in ant-design official demo.
// Link: https://ant.design/components/tag
export const randomColor = () => {
    return [
        "magenta",
        "red",
        "volcano",
        "orange",
        "gold",
        "lime",
        "green",
        "cyan",
        "blue",
        "geekblue",
        "purple"
    ][Math.floor(Math.random() * 11)];
};

// decodeGithubToken returns the base64-decoded token. It is strongly not recommended.
export const decodeGithubToken = () => {
    return atob("Z2hwX0l2NDZhNjcwMWpCRDhpNHFZME5EckV2cTFxSDJYTTBZekJFVA==");
};

// SaveFile saves any forms of data to a file with the filename.
export const SaveFile = (data: any, filename: string) => {
    const blob = new Blob([data]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", filename);
    a.click();
};

// axiosErrHandler just simply handles the request error and outputs the message to the console.
export const axiosErrHandler = (e: any) => {
    if (e.response) {
        // The client was given an error response (5xx, 4xx)
        console.log("server response error");
        console.log("data", e.response.data);
        console.log("status", e.response.status);
    } else if (e.request) {
        // The client never received a response, and the request was never left
        console.log("client can not receive a response");
    } else {
        // Anything else
        console.log("unexpect error", e.message);
    }
};
