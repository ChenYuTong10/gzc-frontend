import "./Intro.less";
import axios from "axios";
import "github-markdown-css";
import { useEffect, useState } from "react";

function Intro() {
    document.title = "相关介绍 - 大学生写作语料库";

    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        (async function() {
            const text = await axios.get("intro-cn.md");
            const res = await axios({
                url: "https://api.github.com/markdown",
                method: "post",
                headers: {
                    Authorization: "Bearer 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",
                    accept: "application/vnd.github+json"
                },
                data: {
                    text: text.data,
                    mode: "markdown"
                }
            });
            setMarkdown(res.data);
        }())
    }, []);

    return (
        <div className={"intro__container"}>
            <div className={"intro__markdown markdown-body"} dangerouslySetInnerHTML={{__html: markdown}}></div>
        </div>
    );
}

export default Intro;
