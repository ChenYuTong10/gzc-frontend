import "./Show.less";
import {SettingOutlined} from "@ant-design/icons";
import {
    Tag,
    Input,
    Button,
    List,
    Table,
    Modal,
    Drawer,
    Col, Row,
    Pagination, Select, message
} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import axios from "axios";
import {highlightKeyword, highlightString, parseSearchOption, randomColor} from "./helper";
import {useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {RadioOptions, SelectOptions} from "./data";

const {Search} = Input;

export interface DataType {
    id: string;
    author: string;
    document: string;
}

export interface TotalType {
    relation: string;
    value: number;
}

export interface SearchResult {
    total: TotalType;
    docs: DataType[];
}

interface FreqTable {
    word: string;
    freq: number;
}

interface SearchDetails {
    document: {
        head: string;
        body: string;
        tags: string[];
    };
    analyzed: {
        CTT: FreqTable[];
        CTC: number;
        TTT: FreqTable[];
        TTC: number;
        BL: number;
        ASL: number;
        APL: number;
    }
}

const charColumns: ColumnsType<FreqTable> = [
    {
        key: "word",
        dataIndex: "word",
        title: "字"
    },
    {
        key: "freq",
        dataIndex: "freq",
        title: "频率"
    }
];

const termColumns: ColumnsType<FreqTable> = [
    {
        key: "word",
        dataIndex: "word",
        title: "词"
    },
    {
        key: "freq",
        dataIndex: "freq",
        title: "频率"
    }
];

function Show() {
    document.title = "查询 - 大学生写作语料库";

    const [searchParams] = useSearchParams();
    // Here params is temporary to store the parameters from the home page.
    // The new parameters will be collected before sending the request.
    const params = parseSearchOption(searchParams.toString());

    // -------------------- SEARCH --------------------

    const [keyword, setKeyword] = useState(params.keyword);

    const inputOnChange = (e: any) => {
        setKeyword(e.target.value);
    };

    // the callback function when the search button is clicked or Enter is tapped.
    const onSearch = async (input: string) => {
        if (input.length !== 0) {
            setKeyword(input);
            const res = await fetchDocs();
            setData(highlightKeyword(res.docs, keyword));
            setTotal(res.total.value);
        }
    };

    // -------------------- DRAWER --------------------

    const [drawerOpen, setDrawerOpen] = useState(false);
    const openDrawer = () => {
        setDrawerOpen(true);
    };
    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const [target, setTarget] = useState(params.target);
    const [limit, setLimit] = useState(`${params.limit}`);
    const [show, setShow] = useState(params.show);
    const [grades, setGrades] = useState(params.grades);
    const [genres, setGenres] = useState(params.genres);
    const [tags, setTags] = useState(params.tags);

    // getXXXState returns the reactive variable according to the field name;
    // getXXXStateSetter returns the reactive variable setter according to the field name;

    const getRadioState = (field: string): string | null => {
        switch (field) {
            case "target":
                return target;
            case "limit":
                return limit;
            case "show":
                return show;
            default:
                return null;
        }
    };

    const getRadioStateSetter = (field: string) => {
        switch (field) {
            case "target":
                return setTarget;
            case "limit":
                return setLimit;
            case "show":
                return setShow;
            default:
                return null;
        }
    };

    const getMultipleState = (field: string): string[] | null => {
        switch (field) {
            case "grades":
                return grades;
            case "genres":
                return genres;
            case "tags":
                return tags;
            default:
                return null;
        }
    };

    const getMultipleStatusSetter = (field: string) => {
        switch (field) {
            case "grades":
                return setGrades;
            case "genres":
                return setGenres;
            case "tags":
                return setTags;
            default:
                return null;
        }
    };

    // the callback function when the select value is change.
    const radioOnChange = (field: string) => {
        return (optionValue: string) => {
            console.log(optionValue);
            const setter = getRadioStateSetter(field);
            if (setter) {
                setter(optionValue);
            }
        };
    };
    const multipleOnChange = (field: string) => {
        return (optionValues: string[]) => {
            const setter = getMultipleStatusSetter(field);
            if (setter) {
                setter(optionValues);
            }
        };
    };

    // -------------------- PAGINATION --------------------

    const [total, setTotal] = useState(1);

    let page = 1;
    let size = 100;
    const pageSizeOptions = ["50", "100"];
    const pageOnChange = async (pageNum: number, pageSize: number) => {
        page = pageNum;
        size = pageSize;
        const res = await fetchDocs();
        setData(highlightKeyword(res.docs, keyword));
        setTotal(res.total.value);
    };

    // -------------------- DOCUMENTS LIST --------------------

    const [data, setData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const openModal = (id: string) => {
        return async () => {
            const res = await fetchDetails(id);
            res.document.body = highlightString(res.document.body, keyword);
            // @ts-ignore
            setDetails(res);
            setModalOpen(true);
        };
    };
    const closeModal = () => setModalOpen(false);

    // -------------------- DOCUMENTS DETAILS --------------------

    const [modalOpen, setModalOpen] = useState(false);
    const [details, setDetails] = useState<SearchDetails>({
        analyzed: {
            APL: 0.0, ASL: 0.0, BL: 0, CTC: 0, CTT: [], TTC: 0, TTT: []
        },
        document: {
            body: "", head: "", tags: []
        }
    });


    const fetchDocs = async (): Promise<SearchResult> => {
        const newParams = {
            keyword, target, limit, show, grades, genres, tags, page, size
        };

        setLoading(true);
        try {
            // more request configuration to see https://axios-http.com/docs/req_config
            const res = await axios({
                url: "/api/search",
                method: "post",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                data: JSON.stringify(newParams),
                timeout: 3000
            });
            return res.data;
        } catch (e: any) {
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
            message.error("服务器繁忙，请稍后再试！");
            return Promise.reject(e);
        } finally {
            setLoading(false);
        }
    }

    // Notice fetchDetails will store the data to the localStorage after fetching every document details.
    // It will query the localStorage first before sending request.
    const fetchDetails = async (id: string): Promise<SearchDetails> => {
        const hint = messageApi.open({
            type: "loading",
            content: "正在查询中，请稍等..."
        });
        const storage = window.localStorage.getItem(id);
        if (storage) {
            hint.then(() => message.info("查询成功！"));
            return JSON.parse(storage);
        }
        try {
            // more request configuration to see https://axios-http.com/docs/req_config
            const res = await axios({
                url: "/api/details",
                method: "get",
                params: {id},
                timeout: 3000
            });
            hint.then(() => message.info("查询成功！"));
            window.localStorage.setItem(id, JSON.stringify(res.data));
            return res.data;
        } catch (e: any) {
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
            hint.then(() => message.error("服务器繁忙，请稍后重试！"));
            return Promise.reject(e);
        }
    };

    useEffect(() => {
        (async function () {
            const res = await fetchDocs();
            setTotal(res.total.value);
            setData(highlightKeyword(res.docs, keyword));
        }())
    }, []);

    // @ts-ignore
    // @ts-ignore
    return (
        <div className={"show__container"}>
            <header>
                <div className={"show__logo"}></div>
                <div className={"show__search"}>
                    <Search
                        placeholder="输入关键字..."
                        allowClear
                        size="large"
                        showCount
                        maxLength={50}
                        value={keyword}
                        onChange={inputOnChange}
                        onSearch={onSearch}
                        enterButton="搜索"
                    />
                </div>
                <div className={"show__advance"}>
                    <Button
                        size={"large"}
                        shape={"circle"}
                        onClick={openDrawer}
                    ><SettingOutlined/></Button>
                    <Drawer
                        className={"show_drawer"}
                        title="高级检索"
                        placement="right"
                        open={drawerOpen}
                        onClose={closeDrawer}
                    >
                        {/* The wrapper 'show__options' is used to fill the whole container.*/}
                        <div className={"show__options"}>
                            {
                                RadioOptions.map((option, index) => (
                                    <div className={"show__option"} key={index}>
                                        <div className={"show__label"}>{option.label}</div>
                                        <div className={"show__select-group"}>
                                            <Select
                                                style={{
                                                    width: "100%"
                                                }}
                                                size={"large"}
                                                value={getRadioState(option.field)}
                                                options={option.options}
                                                onChange={radioOnChange(option.field)}
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                            {
                                SelectOptions.map((option, index) => (
                                    <div className={"show__option"} key={index}>
                                        <div className={"show__label"}>{option.label}</div>
                                        <div className={"show__select-group"}>
                                            <Select
                                                style={{
                                                    width: "100%"
                                                }}
                                                size={"large"}
                                                mode="multiple"
                                                // @ts-ignore: type string[] is right
                                                // More to see https://ant.design/components/select-cn/#API
                                                value={getMultipleState(option.field)}
                                                options={option.options}
                                                placeholder={option.placeholder}
                                                onChange={multipleOnChange(option.field)}
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </Drawer>
                </div>
            </header>
            <main>
                <div className={"show__console"}>
                    <div className={"show__total"}>
                        满足条件的文档共有<span className={"show__num"}>{total}</span>个
                    </div>
                    <div className={"show__pagination"}>
                        <Pagination
                            total={total}
                            defaultPageSize={size}
                            defaultCurrent={page}
                            pageSizeOptions={pageSizeOptions}
                            onChange={pageOnChange}
                        />
                    </div>
                </div>
                <div className={"show__result"}>
                    {/* The reason why here needs a wrapper is that */}
                    {/* making the all outside element width 100% and */}
                    {/* using justify-content to control the center. */}
                    <div className={"show__list"}>
                        {contextHolder}
                        <List
                            bordered
                            loading={loading}
                            dataSource={data}
                            renderItem={(datum, index) => (
                                <List.Item key={datum.id}>
                                    <Row
                                        style={{
                                            width: "100%"
                                        }}
                                        align="middle">
                                        <Col flex={"5%"}>
                                            <div>{index + 1}</div>
                                        </Col>
                                        <Col flex={"auto"}>
                                            <div
                                                className={"show__text"}
                                                dangerouslySetInnerHTML={{__html: datum.document}}
                                            ></div>
                                        </Col>
                                        <Col flex={"5%"}>
                                            <Button
                                                type="link"
                                                onClick={openModal(datum.id)}>
                                                详情
                                            </Button>
                                        </Col>
                                    </Row>
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
                <div className={"show_details"}>
                    <Modal
                        centered
                        width={"100%"}
                        bodyStyle={{
                            height: "90vh"
                        }}
                        title="语料详情"
                        footer={null}
                        open={modalOpen}
                        onCancel={closeModal}
                    >
                        <div className={"show__model"}>
                            <div className={"show__document"}>
                                <div className={"show__document-head"}><h3>{details.document.head}</h3></div>
                                <div className={"show__document-tags"}>
                                    {
                                        details.document.tags.map(tag => (
                                            <Tag color={randomColor()}>{tag}</Tag>
                                        ))
                                    }
                                </div>
                                <div className={"show__document-body"}
                                     dangerouslySetInnerHTML={{__html: details.document.body}}></div>
                                <div className={"show__document-analyzed"}>
                                    <Tag>字种数: {details.analyzed.CTC}</Tag>
                                    <Tag>词种数: {details.analyzed.TTC}</Tag>
                                    <Tag>正文长度: {details.analyzed.BL}</Tag>
                                    <Tag>平均句长: {details.analyzed.ASL}</Tag>
                                    <Tag>平均段长: {details.analyzed.APL}</Tag>
                                </div>
                            </div>
                            <div className={"show__table"}>
                                <div className={"show__table-word"}>
                                    <div className={"show__table-head"}><h4>字频表</h4></div>
                                    <Table
                                        pagination={false}
                                        columns={charColumns}
                                        dataSource={details.analyzed.CTT}
                                    />
                                </div>
                                <div className={"show__table-term"}>
                                    <div className={"show__table-head"}><h4>词频表</h4></div>
                                    <Table
                                        pagination={false}
                                        columns={termColumns}
                                        dataSource={details.analyzed.TTT}
                                    />
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </main>
        </div>
    );
}

export default Show;
