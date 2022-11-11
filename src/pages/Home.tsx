import "./Home.less";
import {
    RadioOptions,
    SelectOptions
} from "./data";
import { Input, Select } from 'antd';
const { Search } = Input;

function Home() {
    const TargetDefault = RadioOptions.find(o => o.field === "target")?.default;
    const LimitDefault = RadioOptions.find(o => o.field === "limit")?.default;

    const data: {[index: string]: any} = { keyword: "",  target: TargetDefault,  limit: LimitDefault,  tags: [],  grades: [],  genres: [] };

    // the callback function when the search button is clicked or Enter is tapped.
    const onSearch = (keyword: string) => {
        if (keyword.length === 0) {
            return;
        }
        data["keyword"] = keyword;
    };

    // the callback function when the select value is change.
    const onChange = (field: string) => {
        return (optionValue: string) => {
            data[field] = optionValue;
        };
    };

    return (
        <div className={"container"}>
            <main>
                <div className={"left"}>
                    <div className={"logo"}></div>
                    <div className={"search"}>
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
                    <div className={"advance"}>
                        {
                            RadioOptions.map((option, index) => (
                                <div className={"option"} key={index}>
                                    <div className={"label"}>{option.label}</div>
                                    <div className={"select-group"}>
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
                                <div className={"option"} key={index}>
                                    <div className={"label"}>{option.label}</div>
                                    <div className={"select-group"}>
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
                <div className={"right"}>
                    <div className={"background"}></div>
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
