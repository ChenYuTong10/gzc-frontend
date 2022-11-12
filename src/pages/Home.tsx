import "./Home.less";
import {
    RadioOptions,
    SelectOptions
} from "./data";
import {createSearchParams, useNavigate} from "react-router-dom";
import { Input, Select } from 'antd';
const { Search } = Input;

function Home() {
    const TargetDefault = RadioOptions.find(o => o.field === "target")?.default;
    const LimitDefault = RadioOptions.find(o => o.field === "limit")?.default;

    const data: {[index: string]: any} = { keyword: "",  target: TargetDefault,  limit: LimitDefault,  tags: [],  grades: [],  genres: [] };

    const navigate = useNavigate();

    // the callback function when the search button is clicked or Enter is tapped.
    const onSearch = (keyword: string) => {
        if (keyword.length === 0) {
            return;
        }
        data["keyword"] = keyword;
        navigate({
            pathname: "/show",
            search: createSearchParams(data).toString()
        });
    };

    // the callback function when the select value is change.
    const onChange = (field: string) => {
        return (optionValue: string) => {
            Array.isArray(data[field])
                ? data[field].push(optionValue)
                :data[field] = optionValue;
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
