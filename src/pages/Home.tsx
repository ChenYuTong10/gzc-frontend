import "./Home.less";
import {
    RadioOptions,
    SelectOptions
} from "./data";
import { useNavigate } from "react-router-dom";
import { Input, Select } from 'antd';
const { Search } = Input;

function Home() {
    const TargetDefault = RadioOptions.find(o => o.field === "target")?.default;
    const LimitDefault = RadioOptions.find(o => o.field === "limit")?.default;

    const params: {[index: string]: any} = { keyword: "",  target: TargetDefault,  limit: LimitDefault,  tags: [],  grades: [],  genres: [] };

    const navigate = useNavigate();

    const stringifyParams = (params: any): string => {
        if (typeof params !== "object") {
            throw new Error("params need to be an object");
        }
        const keyPairs: string[] = [];
        Object.keys(params).forEach((key) => {
            switch (typeof params[key]) {
                case "bigint":
                case "string":
                case "number":
                case "boolean":
                    keyPairs.push(`${key}=${params[key]}`);
                    break;
                case "undefined":
                    console.warn(`value is undefined in ${key} field`);
                    break;
                case "object":
                case "function":
                    console.warn(`object and function is unsupported now`);
                    break;
                default:
                    // array type
                    let values: any[] = [];
                    params[key].forEach((value: any)=> {
                        values.push(value);
                    });
                    keyPairs.push(`${key}=${values.join("+")}`);
            }
        });
        return keyPairs.join("&");
    };

    // the callback function when the search button is clicked or Enter is tapped.
    const onSearch = (keyword: string) => {
        if (keyword.length === 0) {
            return;
        }
        params["keyword"] = keyword;
        navigate({
            pathname: "/show",
            search: `?${stringifyParams(params)}`
        });
    };

    // the callback function when the select value is change.
    const onChange = (field: string) => {
        return (optionValue: string | string[]) => {
            if (Array.isArray(params[field])) {
                // multiple select mode
                params[field].push(...optionValue as string[]);
            }
            else {
                // single select mode
                params[field] = optionValue as string;
            }
        };
    };

    return (
        <div className={"home__container"}>
            <main>
                <div className={"home__left"}>
                    <div className={"home__logo"}></div>
                    <div className={"home__search"}>
                        <Search
                            placeholder="输入关键字..."
                            allowClear
                            size="large"
                            showCount
                            maxLength={50}
                            enterButton="搜索"
                            onSearch={onSearch}
                        />
                    </div>
                    <div className={"home__advance"}>
                        {
                            RadioOptions.map((option, index) => (
                                <div className={"home__option"} key={index}>
                                    <div className={"home__label"}>{option.label}</div>
                                    <div className={"home__select-group"}>
                                        <Select
                                            style={{
                                                width: "100%"
                                            }}
                                            size={"large"}
                                            defaultValue={option.default}
                                            options={option.options}
                                            onChange={onChange(option.field)}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                        {
                            SelectOptions.map((option, index) => (
                                <div className={"home__option"} key={index}>
                                    <div className={"home__label"}>{option.label}</div>
                                    <div className={"home__select-group"}>
                                        <Select
                                            style={{
                                                width: "100%"
                                            }}
                                            size={"large"}
                                            mode="multiple"
                                            maxTagCount={"responsive"}
                                            defaultValue={option.default}
                                            options={option.options}
                                            placeholder={option.placeholder}
                                            onChange={onChange(option.field)}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={"home__right"}>
                    <div className={"home__background"}></div>
                </div>
            </main>
            <footer>
                <ul>
                    <li><span>相关介绍</span></li>
                    <li><span>关于我们</span></li>
                    <li>
                        <span
                            style={{
                                fontFamily: "Poppins, sans-serif"
                            }}
                        >
                            Github
                        </span>
                    </li>
                </ul>
            </footer>
        </div>
    );
}

export default Home;
