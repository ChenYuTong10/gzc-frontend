export interface RadioGroup {
    field: string
    label: string
    default: any,
    options: RadioOption[]
}

export interface RadioOption {
    label: string
    value: any
    disabled: boolean
}

export const RadioOptions: RadioGroup[] = [
    {
        // The field here will be as the field in request body.
        // Such as, {"target": "qianziwen"}
        field: "target",
        // The label here is the hint of the selection.
        // If it is not required, just ignore it.
        label: "查询文本",
        default: "千字文",
        options: [
            {
                label: "千字文",
                value: "qianziwen",
                disabled: false
            },
            {
                label: "学年礼",
                value: "xuenianli",
                disabled: false
            }
        ]
    },
    {
        field: "limit",
        label: "限制字数",
        default: 10,
        options: [
            {
                label: "10字",
                value: 10,
                disabled: false
            },
            {
                label: "15字",
                value: 15,
                disabled: false
            },
            {
                label: "20字",
                value: 20,
                disabled: false
            }
        ]
    },
    {
        field: "show",
        label: "展示内容",
        default: "正文",
        options: [
            {
                label: "标题",
                value: "head",
                disabled: false
            },
            {
                label: "正文",
                value: "body",
                disabled: false
            }
        ]
    }
    ];

export interface SelectGroup {
    field: string
    label: string
    placeholder: string
    default: any,
    options: SelectOption[]
}

export interface SelectOption {
    label: string
    value: any
    disabled: boolean
}

export const SelectOptions: SelectGroup[] = [
    {
        field: "grades",
        label: "查询年级",
        placeholder: "请选择查询年级",
        default: [],
        options: [
            {
                label: "2016",
                value: "2016",
                disabled: false
            },
            {
                label: "2017",
                value: "2017",
                disabled: false
            },
            {
                label: "2018",
                value: "2018",
                disabled: false
            },
            {
                label: "2019",
                value: "2019",
                disabled: false
            },
            {
                label: "2020",
                value: "2020",
                disabled: false
            },
            {
                label: "2021",
                value: "2021",
                disabled: false
            }
        ]
    },
    {
        field: "genres",
        label: "查询体裁",
        placeholder: "请选择查询体裁",
        default: [],
        options: [
            {
                label: "散文",
                value: "S",
                disabled: false
            },
            {
                label: "小说",
                value: "K",
                disabled: false
            },
            {
                label: "诗歌",
                value: "P",
                disabled: false
            },
            {
                label: "剧本",
                value: "J",
                disabled: false
            },
            {
                label: "评论",
                value: "Y",
                disabled: false
            },
            {
                label: "新闻",
                value: "N",
                disabled: false
            },
            {
                label: "论文",
                value: "R",
                disabled: false
            }
        ]
    },
    {
        field: "genres",
        label: "查询标签",
        placeholder: "请选择查询标签",
        default: [],
        options: [
            {
                label: "虚构",
                value: "虚构",
                disabled: false
            },
            {
                label: "校园",
                value: "校园",
                disabled: false
            },
            {
                label: "影评",
                value: "影评",
                disabled: false
            },
            {
                label: "社会",
                value: "社会",
                disabled: false
            },
            {
                label: "自然人文风光",
                value: "自然人文风光",
                disabled: false
            },
            {
                label: "人文自然风光",
                value: "人文自然风光",
                disabled: false
            }
        ]
    }
];
