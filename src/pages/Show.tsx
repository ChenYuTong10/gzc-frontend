import "./Show.less";
import { SettingOutlined } from "@ant-design/icons";
import {
    Input,
    Button,
    List,
    Col, Row,
    Pagination
} from 'antd';
const { Search } = Input;

interface DataType {
    id: string
    author: string
    text: string
}

function Show() {
    document.title = "Show - GZC";

    const data: DataType[] = [
        {
            id: "u1",
            author: "123",
            text: "今天明天后天今天明天后天今天明天后天今天"
        },
        {
            id: "u2",
            author: "123",
            text: "今天明天后天今天明天后天今天明天后天今天"
        },
        {
            id: "u3",
            author: "123",
            text: "今天明天后天今天明天后天今天明天后天今天"
        },
        {
            id: "u4",
            author: "123",
            text: "今天明天后天今天明天后天今天明天后天今天"
        },
        {
            id: "u5",
            author: "123",
            text: "今天明天后天今天明天后天今天明天后天今天"
        }
    ];

    return (
        <div className={"container"}>
            <header>
                <div className={"logo"}></div>
                <div className={"search"}>
                    <Search
                        placeholder="输入关键字..."
                        allowClear
                        size="large"
                        showCount
                        maxLength={50}
                        enterButton="搜索"
                    />
                </div>
                <div className={"advance"}>
                    <Button size={"large"} shape={"circle"}><SettingOutlined /></Button>
                </div>
            </header>
            <main>
                <div className={"console"}>
                    <div className={"total"}>
                        满足条件的文档共有<span className={"num"}>{12304}</span>个
                    </div>
                    <div className={"pagination"}>
                        <Pagination
                            total={12304}
                            defaultPageSize={20}
                            defaultCurrent={1}
                        />
                    </div>
                </div>
                <div className={"result"}>
                    {/* The reason why here needs a wrapper is that */}
                    {/* making the all outside element width 100% and */}
                    {/* using justify-content to control the center. */}
                    <div className={"list"}>
                        <List
                            bordered
                            loading={false}
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
                                            <div className={"text"}>{datum.text}</div>
                                        </Col>
                                        <Col flex={"5%"}>
                                            <Button type="link">详情</Button>
                                        </Col>
                                    </Row>
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Show;
