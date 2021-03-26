import Language from '../@types/language';
import {useState} from 'react';

export const Languages: Language[] = [
    {
        option: "HTML",
        language: "xml",
        selected: false,
        key: "langauge",
    },
    {
        option: "JS",
        language: "javascript",
        selected: false,
        key: "langauge",
    },
];

const [code, setCode] = useState({
    javascript: "",
    xml: "",
});

export {code,setCode};