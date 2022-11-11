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
                        enterButton="搜索"
                    />
                </div>
                <div className={"show__advance"}>
                    <Button size={"large"} shape={"circle"}><SettingOutlined /></Button>
                </div>
            </header>
            <main>
                <div className={"show__console"}>
                    <div className={"show__total"}>
                        满足条件的文档共有<span className={"show__num"}>{12304}</span>个
                    </div>
                    <div className={"show__pagination"}>
                        <Pagination
                            total={12304}
                            defaultPageSize={20}
                            defaultCurrent={1}
                        />
                    </div>
                </div>
                <div className={"show__result"}>
                    {/* The reason why here needs a wrapper is that */}
                    {/* making the all outside element width 100% and */}
                    {/* using justify-content to control the center. */}
                    <div className={"show__list"}>
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
                                            <div className={"show__text"}>{datum.text}</div>
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
